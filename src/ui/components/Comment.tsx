import { useState } from "react";

import { Comment as CommentProp } from "../../types";

import AuthorInfo from "./AuthorInfo";
import LikesBtn from "./LikeBtn";

import "../style/post.scss";

const Comment: React.FunctionComponent<CommentProp> = ({
  commenter,
  createdAt,
  message,
}) => {
  const [isLiked, setisLiked] = useState<boolean>(false);

  return (
    <div className="comment">
      <AuthorInfo
        author={{
          profilePhotoUrl: commenter.profilePhotoUrl,
          firstName: commenter.firstName,
          lastName: commenter.lastName,
        }}
        createdAt={createdAt}
      >
        <LikesBtn
          isLiked={isLiked}
          onClick={() => {
            setisLiked(!isLiked);
          }}
        />
      </AuthorInfo>
      <p className="comment-text">{message}</p>
    </div>
  );
};

export default Comment;
