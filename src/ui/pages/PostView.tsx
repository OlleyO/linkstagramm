import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { fetchGetPost, fetchPostComments } from "../../core/api/api";
import { ResponseWithPost, ResponseWithComments } from "../../core/api/types";
import { Comment } from "../../types";
import CommentsList from "../components/CommentsList";
import Post, { PostProps } from "../components/Post";
import Navbar from "../components/common/Navbar";

interface ParamTypes {
  postId: string;
  author: string;
}

const PostView: React.FunctionComponent = ({ children }) => {
  const { postId } = useParams<ParamTypes>();
  const [comments, setComments] = useState<Comment[]>([]);
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
      .then((postFetched: ResponseWithPost) => {
        setPost({
          description: postFetched.description,
          author: {
            username: postFetched.author.username,
            firstName: postFetched.author.first_name ?? "",
            lastName: postFetched.author.last_name ?? "",
            profilePhotoUrl: postFetched.author.profile_photo_url ?? "",
          },

          id: postFetched.id,
          isLiked: postFetched.is_liked,
          commentsCount: postFetched.comments_count,
          likesCount: postFetched.likes_count,
          createdAt: postFetched.created_at,
          photos: postFetched.photos,
        });
      })
      .then(() => {
        fetchPostComments(Number(postId))
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
      });
  }, []);

  return (
    <div className="post-view">
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
      <CommentsList comments={comments} />
      {children}
    </div>
  );
};

export default PostView;
