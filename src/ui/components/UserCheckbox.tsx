import { useState } from "react";

import { UserForShare } from "../../types";

import ProfilePhoto from "./common/ProfilePhoto";

export interface UserCheckboxProps {
  user: UserForShare;
}

const UserCheckbox: React.FunctionComponent<UserCheckboxProps> = ({ user }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <label
      htmlFor={user.username}
      className={`user-checkbox-label ${isChecked ? "checked" : ""}`}
    >
      <ProfilePhoto avatar={user.avatarSrc} profileImage />
      {`${user.firstName} ${user.lastName}`}
      <input
        className="user-checkbox"
        type="checkbox"
        id={user.username}
        value={user.username}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
    </label>
  );
};

export default UserCheckbox;
