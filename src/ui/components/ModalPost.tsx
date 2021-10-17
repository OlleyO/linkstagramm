import React, { PropsWithChildren, useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import Swiper, { Pagination, Navigation, Scrollbar, Mousewheel } from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import {
  fetchGetPost,
  fetchComment,
  fetchSetLike,
  fetchRemoveLike,
  fetchPostComments,
} from "../../core/api/api";
import { ResponseWithComments, ResponseWithPost } from "../../core/api/types";
import { Comment, IStoreState } from "../../types";

import AuthorInfo from "./AuthorInfo";
import LikesBtn from "./LikeBtn";
import { PostProps } from "./Post";
import ProfilePhoto from "./common/ProfilePhoto";

interface ModalPostProps {
  postId: number;
}

Swiper.use([Pagination, Navigation, Scrollbar, Mousewheel]);

const ModalPost: React.FunctionComponent<PropsWithChildren<ModalPostProps>> = ({
  children,
  postId,
}) => {
  const [postInfo, setPostInfo] = useState<PostProps>({
    id: 0,
    author: {
      profilePhotoUrl: "",
      username: "",
      firstName: "",
      lastName: "",
    },

    commentsCount: 0,
    createdAt: "",
    description: "",
    isLiked: false,
    likesCount: 0,
    photos: [],
  });

  const [comments, setComments] = useState<Comment[]>([]);
  const [wasLiked, setWasLiked] = useState(false);
  const [userComment, setUserComment] = useState("");
  const authToken = useSelector(
    (state: IStoreState) => state.authorizationToken
  );

  useEffect(() => {
    fetchGetPost(postId)
      .then((res) => res.json())
      .then((post: ResponseWithPost) => {
        setPostInfo({
          description: post.description,
          author: {
            username: post.author.username,
            firstName: post.author.first_name ?? "",
            lastName: post.author.last_name ?? "",
            profilePhotoUrl: post.author.profile_photo_url ?? "",
          },

          id: post.id,
          isLiked: post.is_liked,
          commentsCount: post.comments_count,
          likesCount: post.likes_count,
          createdAt: post.created_at,
          photos: post.photos,
        });
      })
      .then(() => setWasLiked(postInfo.isLiked));

    fetchPostComments(postId)
      .then((res) => res.json())
      .then((data: ResponseWithComments) => {
        const camelcased: Comment[] = [];
        data.forEach((comment) => {
          const commenter = { ...comment.commenter };
          camelcased.push({
            commenter: {
              firstName: commenter.first_name ?? "",
              lastName: commenter.last_name ?? "",
              profilePhotoUrl: commenter.profile_photo_url ?? "",
              username: commenter.username ?? "",
            },

            createdAt: comment.created_at,
            message: comment.message,
            id: comment.id,
          });
        });
        setComments(camelcased);
      });
  }, []);

  const handleLike = () => {
    const prom = wasLiked
      ? fetchRemoveLike(postId, authToken)
      : fetchSetLike(postId, authToken);
    prom
      .then(() => {
        setWasLiked(!wasLiked);
      })
      .finally(() =>
        fetchGetPost(postId)
          .then((res) => res.json())
          .then((post: ResponseWithPost) => {
            setPostInfo({
              description: post.description,
              author: {
                username: post.author.username,
                firstName: post.author.first_name ?? "",
                lastName: post.author.last_name ?? "",
                profilePhotoUrl: post.author.profile_photo_url ?? "",
              },

              id: post.id,
              isLiked: post.is_liked,
              commentsCount: post.comments_count,
              likesCount: post.likes_count,
              createdAt: post.created_at,
              photos: post.photos,
            });
          })
      );
  };

  const handlePostComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserComment("");
    fetchComment(authToken, postId, userComment).then(() =>
      fetchPostComments(postId)
        .then((res) => res.json())
        .then((data) => setComments(data))
    );
  };

  return (
    <div className="modal-post">
      <div className="post-left">
        <SwiperComponent pagination navigation slidesPerView={1}>
          {postInfo.photos.length !== 0 ? (
            postInfo.photos.map((photo) => (
              <SwiperSlide key={photo.id}>
                <img src={photo.url} alt="" />
              </SwiperSlide>
            ))
          ) : (
            <div className="no-photo">No image</div>
          )}
        </SwiperComponent>
      </div>

      <div className="post-right">
        <div className="right-top">
          <AuthorInfo
            author={{
              firstName: postInfo.author.firstName,
              lastName: postInfo.author.lastName,
              profilePhotoUrl: postInfo.author.profilePhotoUrl,
            }}
            createdAt={postInfo.createdAt}
          />
        </div>
        <div className="right-middle">
          <SwiperComponent
            slidesPerView={comments.length < 6 ? comments.length : 6}
            direction="vertical"
            freeMode
            scrollbar
            mousewheel
            centeredSlidesBounds
            centeredSlides
            spaceBetween={30}
          >
            {comments.map((comment) => (
              <SwiperSlide key={comment.id}>
                <div className="comment-modal">
                  <ProfilePhoto
                    avatar={comment.commenter.profilePhotoUrl}
                    profileImage
                  />
                  <div className="modal-comment-text">
                    <p className="comment-text">{comment.message}</p>
                    <Moment className="time-posted" fromNow>
                      {comment.createdAt}
                    </Moment>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </SwiperComponent>
        </div>
        <div className="modal-like">
          <LikesBtn
            isLiked={wasLiked}
            likes={postInfo.likesCount}
            onClick={handleLike}
          />
        </div>

        <div className="modal-post-comment">
          <form onSubmit={handlePostComment}>
            <input
              placeholder="Add a comment..."
              type="text"
              onChange={(e) => setUserComment(e.currentTarget.value)}
              value={userComment}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      </div>

      {children}
    </div>
  );
};

export default ModalPost;
