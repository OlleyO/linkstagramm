import "../style/profile-photo.scss";
import "../style/post.scss";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Swiper, { Pagination, Navigation } from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import {
  fetchSetLike,
  fetchRemoveLike,
  fetchGetPost,
} from "../../core/api/api";
import { DataFromPostFetch, IStoreState, ProfileForPost } from "../../types";
import useWindowDimensions from "../hooks/useWindowDimensions";

import AuthorInfo from "./AuthorInfo";
import LikesBtn from "./LikeBtn";
import ModalPost from "./ModalPost";
import Modal from "./common/Modal/Modal";
import ModalCloseButton from "./common/Modal/ModalCloseButton";
import useModal from "./common/Modal/useModal";

Swiper.use([Pagination, Navigation]);

export interface PostProps {
  id: number;
  author: ProfileForPost;
  commentsCount: number;
  createdAt: string;
  description: string;
  isLiked: boolean;
  likesCount: number;
  photos: { id: number; url: string }[];
}

// Post should store author username(uid),
// which can be used to receive data like displayName(Last name first name), timePosted
// Additionally, post stores description, image, likes and comments

const Post: React.FunctionComponent<PostProps> = (props) => {
  const history = useHistory();
  const [post, setPost] = useState<PostProps>({ ...props });
  const { width } = useWindowDimensions();
  const { show, handleModalEvents } = useModal();

  const [wasLiked, setWasLiked] = useState(post.isLiked);
  const authToken = useSelector(
    (state: IStoreState) => state.authorizationToken
  );

  useEffect(() => {
    setPost({
      ...props,
    });
  }, [props]);

  const handleThreeDotsClick = () => {
    history.push("/author/postId");
  };

  const handleLike = () => {
    const prom = wasLiked
      ? fetchRemoveLike(post.id, authToken)
      : fetchSetLike(post.id, authToken);
    prom
      .then(() => {
        setWasLiked(!wasLiked);
      })
      .finally(() =>
        fetchGetPost(post.id)
          .then((res) => res.json())
          .then((data: DataFromPostFetch) => {
            setPost({
              id: data.id,
              author: data.author,
              commentsCount: data.comments_count,
              likesCount: data.likes_count,
              description: data.description,
              isLiked: data.is_liked,
              createdAt: data.created_at,
              photos: data.photos,
            });
          })
      );
  };

  return (
    <section className="post">
      <AuthorInfo
        author={{
          firstName: post.author.firstName,
          lastName: post.author.lastName,
          profilePhotoUrl: post.author.profilePhotoUrl,
        }}
        createdAt={post.createdAt}
      >
        <button
          type="button"
          onClick={handleThreeDotsClick}
          className="three-dots"
        />
      </AuthorInfo>

      <div className="post-main">
        <SwiperComponent freeModeMomentum pagination navigation>
          {post.photos.length !== 0 ? (
            post.photos.map((photo) => (
              <SwiperSlide key={photo.id}>
                <img
                  className="post-image"
                  src={photo.url}
                  alt=""
                  key={photo.id}
                />
              </SwiperSlide>
            ))
          ) : (
            <div className="no-photo">No image</div>
          )}
        </SwiperComponent>
        <article>
          <p className="post-description">{post.description}</p>
        </article>
      </div>
      <div className="post-bottom">
        <LikesBtn
          likes={post.likesCount}
          isLiked={wasLiked}
          onClick={handleLike}
        />

        {width < 1024 ? (
          <Link
            to={`/${post.author.username}/${post.id}/comments`}
            className="comments-icon"
          >
            {post.commentsCount}
          </Link>
        ) : (
          <button
            onClick={() => handleModalEvents.open()}
            type="button"
            className="comments-icon"
          >
            {post.commentsCount}
          </button>
        )}

        <Link
          to={`/${post.author.username}/${post.id}/share`}
          type="button"
          className="share"
        >
          Share
        </Link>
      </div>

      <Modal show={show} onClose={() => handleModalEvents.close()}>
        <ModalPost postId={post.id} />
        <ModalCloseButton
          onClick={() => {
            handleModalEvents.close();
          }}
        />
      </Modal>
    </section>
  );
};

export default Post;
