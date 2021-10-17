import Swiper, { Scrollbar } from "swiper";
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";

import { UserForShare } from "../../types";

import UserCheckbox from "./UserCheckbox";

Swiper.use([Scrollbar]);

export interface UsersCheckboxListProps {
  users: UserForShare[];
}

const UsersCheckboxList: React.FunctionComponent<UsersCheckboxListProps> = ({
  users,
}) => {
  return (
    <SwiperComponent
      scrollbar
      direction="vertical"
      className="users-checkbox-list"
      freeMode
      slidesPerView={4}
      mousewheel
    >
      {users.map((user) => (
        <SwiperSlide key={user.username}>
          <UserCheckbox user={user} />
        </SwiperSlide>
      ))}
    </SwiperComponent>
  );
};

export default UsersCheckboxList;
