import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { editAccount } from "../../core/features/authSlice";
import { useAppDispatch } from "../../core/store/store";
import { logout } from "../../core/types/actions";
import { IStoreState, Profile } from "../../types";
import AuthNavbar from "../components/common/AuthNavbar";

import "../style/form.scss";

const ProfileEdit: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { hasError, error } = useSelector((state: IStoreState) => ({
    error: state.error,
    hasError: state.hasError,
  }));

  const initState = useSelector((state: IStoreState) => ({
    username: state.username,
    firstName: state.firstName,
    lastName: state.lastName,
    jobTitle: state.jobTitle,
    description: state.description,
    profilePhotoUrl: state.profilePhotoUrl,
  }));

  const [infoForEditAccount, setInfoForEditAccount] = useState<Profile>({
    username: initState.username,
    firstName: initState.firstName,
    lastName: initState.lastName,
    jobTitle: initState.jobTitle,
    description: initState.description,
    profilePhotoUrl: initState.profilePhotoUrl,
  });

  const handleInputChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setInfoForEditAccount({
      ...infoForEditAccount,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("authToken");
    history.push("/logIn");
  };

  const handleCancel = () => history.goBack();

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInfoForEditAccount({
      ...infoForEditAccount,
      [e.currentTarget.name]: e.currentTarget.value,
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    editAccount(infoForEditAccount);
  };

  return (
    <div className="profile-edit">
      <AuthNavbar>
        <button type="button" className="logout" onClick={handleLogout}>
          Log out
        </button>
      </AuthNavbar>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          nickname
          <input
            id="username"
            name="username"
            type="text"
            placeholder="alex.psd"
            onChange={handleInputChanged}
            value={infoForEditAccount.username}
          />
        </label>

        <label htmlFor="firstName">
          first name
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Alexandr"
            onChange={handleInputChanged}
            value={infoForEditAccount.firstName}
          />
        </label>

        <label htmlFor="lastName">
          second name
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Sokolov"
            onChange={handleInputChanged}
            value={infoForEditAccount.lastName}
          />
        </label>

        <label htmlFor="jobTitle">
          job title
          <input
            id="jobTitle"
            name="jobTitle"
            type="text"
            placeholder="Photographer"
            onChange={handleInputChanged}
            value={infoForEditAccount.jobTitle}
          />
        </label>

        <label htmlFor="description">
          description
          <textarea
            id="description"
            name="description"
            placeholder="Like to travel and shoot cinematic and b/w photos Tools - Capture One for Raw"
            onChange={handleDescriptionChange}
            value={infoForEditAccount.description}
          />
        </label>

        <span className="text-form" />
        <button type="submit">Save</button>
        <button className="cancel" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>

      {hasError && <div className="error">{`${error}`}</div>}
    </div>
  );
};

export default ProfileEdit;
