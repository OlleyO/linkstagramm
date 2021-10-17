import React, { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { loginAsRegisteredUser } from "../../core/features/authSlice";
import { useAppDispatch } from "../../core/store/store";
import { loginFailed } from "../../core/types/actions";
import imageGroup from "../../public/images/login/Group_26.png";
import { IStoreState } from "../../types";
import Navbar from "../components/common/AuthNavbar";

import "../style/form.scss";

const Login: React.FunctionComponent = () => {
  const history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state: IStoreState) => state.error);
  const hasError = useSelector((state: IStoreState) => state.hasError);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      loginAsRegisteredUser({
        login,
        password,
      })
    )
      .then(() => {
        history.push("/");
      })
      .catch((err: Error) => {
        dispatch(loginFailed(err.message));
      });
  };

  const handleSetLogin = (e: React.FormEvent<HTMLInputElement>) =>
    setLogin(e.currentTarget.value);
  const handleSetPassword = (e: React.FormEvent<HTMLInputElement>) =>
    setPassword(e.currentTarget.value);

  return (
    <div className="login">
      <Navbar />
      <div className="content">
        <div className="images-left">
          <img className="group-img" src={imageGroup} alt="" />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <h1 className="form-header">Log in</h1>

            <label htmlFor="login">
              email
              <input
                id="login"
                type="email"
                value={login}
                onChange={handleSetLogin}
                required
                placeholder="example@mail.com"
              />
            </label>

            <label htmlFor="password">
              password
              <input
                id="password"
                type="password"
                value={password}
                onChange={handleSetPassword}
                required
                placeholder="Type in..."
              />
            </label>

            <span className="text-form">
              Don&apos;t have an account?&nbsp;
              <Link className="link" to="/register">
                Sign Up
              </Link>
            </span>

            <button type="submit">Log in</button>

            <span className="text-form">
              Don&apos;t have an account?&nbsp;
              <Link className="link" to="/register">
                Sign Up
              </Link>
            </span>
          </form>
        </div>
      </div>
      {hasError && <div className="error">{error}</div>}
    </div>
  );
};

export default Login;
