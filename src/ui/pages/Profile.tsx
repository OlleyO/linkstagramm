import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { fetchGetPostsOfUser } from "../../core/api/api";
import {
  getTokenFromSessionStorage,
  getUSerAccount,
} from "../../core/features/authSlice";
import { useAppDispatch } from "../../core/store/store";
import { IStoreState } from "../../types";
import AccountInterface from "../components/AccountInterface";
import { PostProps } from "../components/Post";
import AuthNavbar from "../components/common/AuthNavbar";

import "../style/profile.scss";

const Profile: React.FunctionComponent = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoggedIn, username } = useSelector((state: IStoreState) => ({
    username: state.username,
    isLoggedIn: state.isLoggedIn,
  }));

  const [userPosts, setUserPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    getTokenFromSessionStorage(dispatch);
    if (!isLoggedIn) {
      history.push("/logIn");
    } else {
      dispatch(getUSerAccount())
        .then(() => fetchGetPostsOfUser(username))
        .then((res: Response) => res.json())
        .then((posts: PostProps[]) => {
          setUserPosts(posts);
        });
    }
  }, []);

  return (
    <div className="profile">
      <AuthNavbar>
        <Link to="/" className="home-link">
          Home
        </Link>
      </AuthNavbar>

      <AccountInterface>
        <div className="user-photos">
          {userPosts.map((post) => (
            <img alt="" src={post.photos[0].url} key={post.id} />
          ))}
        </div>
      </AccountInterface>
    </div>
  );
};

export default Profile;
