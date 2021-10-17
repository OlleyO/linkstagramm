import React from "react";
import Moment from "react-moment";

import ProfilePhoto from "./common/ProfilePhoto";

export interface AuthorInfoProps {
  author: { profilePhotoUrl: string; firstName: string; lastName: string };
  createdAt: string;
}

// contains ProfilePhoto, should receive as props avatar-source, firstname, lastname, timePosted

const AuthorInfo: React.FunctionComponent<
  React.PropsWithChildren<AuthorInfoProps>
> = ({ children, author, createdAt }) => {
  const { profilePhotoUrl, firstName, lastName } = author;

  return (
    <div className="head">
      <div className="post-info">
        <ProfilePhoto avatar={profilePhotoUrl} profileImage />
        <div className="text">
          <span className="username">{`${firstName} ${lastName}`}</span>
          <Moment className="timePosted" fromNow>
            {createdAt}
          </Moment>
        </div>
      </div>

      {children}
    </div>
  );
};

export default AuthorInfo;
