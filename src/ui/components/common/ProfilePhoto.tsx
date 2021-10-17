import "../../style/profile-photo.scss";
import noAvatar from "../../../public/images/no-avatar.png";

export interface ProfilePhotoProps {
  avatar: string;
  isRead?: boolean;
  profileImage?: boolean;
}

const ProfilePhoto: React.FunctionComponent<ProfilePhotoProps> = ({
  avatar,
  isRead,
  profileImage,
}) => {
  return (
    <div
      className={`profile-photo-container ${
        !isRead && !profileImage ? "active" : ""
      }`}
    >
      <img
        className="profile-photo"
        src={!avatar || avatar.length === 0 ? noAvatar : avatar}
        alt=""
      />
    </div>
  );
};

export default ProfilePhoto;
