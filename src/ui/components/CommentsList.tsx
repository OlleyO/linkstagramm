import { PropsWithChildren } from "react";
import Swiper, { Scrollbar, Mousewheel } from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";

import { Comment as CommentType } from "../../types";

import Comment from "./Comment";

Swiper.use([Scrollbar, Mousewheel]);

interface CommentsListProps {
  comments: CommentType[];
}

const CommentsList: React.FunctionComponent<
  PropsWithChildren<CommentsListProps>
> = ({ comments }) => {
  return (
    <SwiperComponent
      direction="vertical"
      slidesPerView={1}
      freeMode
      scrollbar
      mousewheel
    >
      {comments.map((comment) => (
        <SwiperSlide key={comment.id}>
          <Comment
            id={comment.id}
            commenter={comment.commenter}
            createdAt={comment.createdAt}
            message={comment.message}
          />
        </SwiperSlide>
      ))}
    </SwiperComponent>
  );
};

export default CommentsList;
