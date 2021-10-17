import { useState } from "react";

import { UserForShare } from "../../types";
import "../style/form.scss";

import UsersCheckboxList from "./UsersCheckboxList";

export interface ShareProps {
  users: UserForShare[];
}

const ShareDrop: React.FunctionComponent<ShareProps> = ({ users }) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [lookingForUsers, setLookingForUsers] = useState<UserForShare[]>([]);

  return (
    <div className="share-drop">
      <form>
        <input
          className={`search${isEmpty ? " search-icon" : ""}`}
          onChange={(e) => {
            if (e.currentTarget.value !== "") setIsEmpty(false);
            else setIsEmpty(true);
            setLookingForUsers(
              users.filter(
                (user) =>
                  user.username.includes(e.currentTarget.value) ||
                  `${user.firstName} ${user.lastName}`
                    .toLowerCase()
                    .includes(e.currentTarget.value.toLowerCase())
              )
            );
          }}
          type="text"
          placeholder="Search"
        />
        {lookingForUsers.length === 0 && !isEmpty ? (
          <div style={{ marginBottom: "auto" }}> No such user</div>
        ) : (
          <UsersCheckboxList
            users={lookingForUsers.length === 0 ? users : lookingForUsers}
          />
        )}

        <button type="submit">Share</button>
      </form>
    </div>
  );
};

export default ShareDrop;
