import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import {
  getTokenFromSessionStorage,
  getUSerAccount,
} from "../../core/features/authSlice";
import { useAppDispatch } from "../../core/store/store";
import { IStoreState } from "../../types";
import useWindowDimensions from "../hooks/useWindowDimensions";

import NewPost from "./NewPost";
import ProfileInformation from "./ProfileInformation";
import Modal from "./common/Modal/Modal";
import useModal from "./common/Modal/useModal";
import ProfilePhoto from "./common/ProfilePhoto";

const AccountInterface: React.FunctionComponent = ({ children }) => {
  const { width } = useWindowDimensions();
  const history = useHistory();
  const {
    firstName,
    lastName,
    jobTitle,
    description,
    followers,
    following,
    profilePhotoUrl,
    isLoggedIn,
  } = useSelector((state: IStoreState) => state);

  const dispatch = useAppDispatch();

  const {
    show: createPostModalShow,
    handleModalEvents: handleCreatePostModal,
  } = useModal();

  const {
    show: editAccountModalShow,
    handleModalEvents: handleEditAccountModal,
  } = useModal();

  const editBtn =
    width >= 1024 ? (
      <button
        type="button"
        className="link-btn edit"
        onClick={() => {
          if (!isLoggedIn) history.push("/logIn");
          handleEditAccountModal.open();
        }}
      >
        Edit profile
      </button>
    ) : (
      <Link className="link-btn edit" to="/profile-edit">
        Edit profile
      </Link>
    );

  useEffect(() => {
    getTokenFromSessionStorage(dispatch);
    if (isLoggedIn) {
      dispatch(getUSerAccount());
    }
  }, [isLoggedIn]);

  const createBtn =
    width >= 1024 ? (
      <button
        type="button"
        className="link-btn create"
        onClick={() => {
          if (!isLoggedIn) history.push("/logIn");
          handleCreatePostModal.open();
        }}
      >
        New post
      </button>
    ) : (
      <Link className="link-btn create" to="/create-post">
        New post
      </Link>
    );

  return (
    <div className="profile-content">
      <div className="profile-info">
        <div className="col">
          <span className="number">{followers}</span>
          <span className="number-explanation">Followers</span>
        </div>
        <ProfilePhoto avatar={profilePhotoUrl} />
        <div className="col">
          <span className="number">{following}</span>
          <span className="number-explanation">Following</span>
        </div>
      </div>
      <div className="user-info">
        <span className="name-and-job">{`${firstName} ${lastName} - ${jobTitle}`}</span>
        <span className="bio">{description}</span>
      </div>
      <div className="links-container">
        {editBtn}
        {createBtn}
      </div>

      {children}
      <Modal show={editAccountModalShow} onClose={handleEditAccountModal.close}>
        <ProfileInformation onClose={handleEditAccountModal.close} />
      </Modal>

      <Modal show={createPostModalShow} onClose={handleCreatePostModal.close}>
        <NewPost />
      </Modal>
    </div>
  );
};

export default AccountInterface;
