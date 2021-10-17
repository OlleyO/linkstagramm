import "../style/post.scss";

export interface LikesBtnProps {
  onClick: () => void;
  likes?: number;
  isLiked: boolean;
}

// should receive how many likes
const LikesBtn: React.FunctionComponent<LikesBtnProps> = ({
  likes,
  isLiked,
  onClick: handleClick,
}) => {
  return (
    <button
      type="button"
      onClick={() => {
        handleClick();
      }}
      className={`likes ${isLiked ? "active" : ""}`}
    >
      {likes}
    </button>
  );
};

export default LikesBtn;
