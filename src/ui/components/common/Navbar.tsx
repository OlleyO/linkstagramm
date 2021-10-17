import "../../style/navbar.scss";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IStoreState } from "../../../types";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import ProfilePhoto from "./ProfilePhoto";

const Navbar: React.FunctionComponent = () => {
  const { width } = useWindowDimensions();
  const [isOpened, setIsOpened] = useState(false);
  const profilePhotoUrl = useSelector(
    (state: IStoreState) => state.profilePhotoUrl
  );
  const closeButton = (
    <span
      role="presentation"
      className="close"
      onClick={() => setIsOpened(false)}
      onKeyDown={() => setIsOpened(false)}
    />
  );

  return (
    <nav className={`navbar ${isOpened ? "opened" : ""}`}>
      <h2>Linkstagram</h2>
      {!isOpened && (
        <span
          role="button"
          tabIndex={0}
          onKeyDown={() => {
            if (width <= 1024) setIsOpened(true);
          }}
          onClick={() => {
            if (width <= 1024) setIsOpened(true);
          }}
        >
          <ProfilePhoto avatar={profilePhotoUrl} profileImage />
        </span>
      )}

      <div className="content">
        {closeButton}
        <ul>
          <li>
            <Link className="text-nav" to="/messages">
              Messages
            </Link>
          </li>
          <li>
            <Link className="text-nav" to="/likes">
              Likes
            </Link>
          </li>
          <li>
            <Link className="text-nav" to="/profile">
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
