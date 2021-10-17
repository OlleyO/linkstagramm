import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { fetchGetPost, fetchAllUsersProfiles } from "../../core/api/api";
import { ResponseWithUserProfile } from "../../core/api/types";
import { Profile, UserForShare } from "../../types";
import Post, { PostProps } from "../components/Post";
import ShareDrop from "../components/ShareDrop";
import Navbar from "../components/common/Navbar";

import "../style/share-page.scss";

interface ParamTypes {
  postId: string;
  author: string;
}

const Share: React.FunctionComponent = () => {
  const { postId } = useParams<ParamTypes>();

  const [shareWith, setShareWith] = useState<Profile[]>([]);
  const abortCont = new AbortController();

  const [post, setPost] = useState<PostProps>({
    id: 0,
    photos: [],
    description: "",
    commentsCount: 0,
    isLiked: false,
    likesCount: 0,
    createdAt: "",
    author: {
      username: "",
      firstName: "",
      lastName: "",
      profilePhotoUrl: "",
    },
  });

  useEffect(() => {
    fetchGetPost(Number(postId))
      .then((res) => res.json())
      .then((data) => {
        setPost({
          id: data.id,
          author: {
            profilePhotoUrl: data.author.profile_photo_url,
            username: data.author.username,
            firstName: data.author.first_name,
            lastName: data.author.last_name,
          },

          commentsCount: data.comments_count,
          createdAt: data.created_at,
          description: data.description,
          isLiked: data.is_liked,
          likesCount: data.likes_count,
          photos: data.photos,
        });
      })
      .then(() => {
        fetchAllUsersProfiles(abortCont.signal)
          .then((res) => res.json())
          .then((data: ResponseWithUserProfile[]) => {
            setShareWith(
              data.map((user) => ({
                firstName: user.first_name ?? "",
                lastName: user.last_name ?? "",
                profilePhotoUrl: user.profile_photo_url ?? "",
                username: user.username,
                description: user.description ?? "",
                jobTitle: user.job_title ?? "",
              }))
            );
          });
      });

    return () => abortCont.abort();
  }, []);

  return (
    <div className="share-page darken">
      <div className="share-content">
        <Navbar />
        <Post
          id={post.id}
          commentsCount={post.commentsCount}
          author={post.author}
          isLiked={post.isLiked}
          likesCount={post.likesCount}
          createdAt={post.createdAt}
          description={post.description}
          photos={post.photos}
        />
      </div>
      <ShareDrop
        users={shareWith.map<UserForShare>((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          avatarSrc: user.profilePhotoUrl,
        }))}
      />
    </div>
  );
};

export default Share;
