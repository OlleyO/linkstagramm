import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { editAccount } from "../../core/features/authSlice";
import { useAppDispatch } from "../../core/store/store";
import { logout } from "../../core/types/actions";
import noAvatar from "../../public/images/no-avatar.png";
import { IStoreState, Profile } from "../../types";

interface ProfileInformationProps {
  onClose: () => void;
}

const ProfileInformation: React.FunctionComponent<ProfileInformationProps> = ({
  onClose,
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const initState = useSelector((state: IStoreState) => ({
    username: state.username,
    firstName: state.firstName,
    lastName: state.lastName,
    jobTitle: state.jobTitle,
    description: state.description,
    profilePhotoUrl: state.profilePhotoUrl,
  }));

  const [infoForEditAccount, setInfoForEditAccount] = useState<Profile>({
    ...initState,
  });

  const handleInputChanged = (e: React.FormEvent<HTMLInputElement>) => {
    setInfoForEditAccount({
      ...infoForEditAccount,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleFileUpload = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.item(0);
    if (!file) return;
    const url = URL.createObjectURL(file);
    setInfoForEditAccount({
      ...infoForEditAccount,
      profilePhotoUrl: url,
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("authToken");
    history.push("/logIn");
  };

  const handleCancel = () => onClose();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(editAccount(infoForEditAccount));
    onClose();
  };

  useEffect(
    () => () => {
      if (infoForEditAccount.profilePhotoUrl)
        URL.revokeObjectURL(infoForEditAccount.profilePhotoUrl);
    },
    []
  );

  return (
    <div className="form-modal">
      <form onSubmit={handleSubmit}>
        <div className="form-head">
          <h2>Profile information</h2>
          {/* Log out Button */}
          <button type="button" className="logout-btn" onClick={handleLogout}>
            Log out
          </button>
        </div>
        <div className="form-middle">
          <div className="input-photo">
            <img src={infoForEditAccount.profilePhotoUrl ?? noAvatar} alt="" />
            <label htmlFor="avatar">
              <input id="avatar" type="file" onChange={handleFileUpload} />
              Choose new photo
            </label>
          </div>
          <div className="name-surname">
            <label htmlFor="firstName">
              First name
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleInputChanged}
                value={infoForEditAccount.firstName}
              />
            </label>
            <label htmlFor="lastName">
              Last name
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleInputChanged}
                value={infoForEditAccount.lastName}
              />
            </label>
          </div>
        </div>
        <div className="form-prebottom">
          <label htmlFor="jobTitle">
            Job Title
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              onChange={handleInputChanged}
              value={infoForEditAccount.jobTitle}
            />
          </label>

          <label htmlFor="description" className="textarea">
            Description
            <textarea
              id="description"
              name="description"
              rows={2}
              onChange={(e) =>
                setInfoForEditAccount({
                  ...infoForEditAccount,
                  [e.currentTarget.name]: e.currentTarget.value,
                })
              }
              value={infoForEditAccount.description}
            />
          </label>
        </div>
        <div className="form-bottom">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileInformation;
