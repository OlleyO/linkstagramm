import React, { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import { createAccount } from "../../core/features/authSlice";
import { useAppDispatch } from "../../core/store/store";
import {
  createAccountFailed,
  createAccountSucceeded,
} from "../../core/types/actions";
import image from "../../public/images/signUp/123.png";
import imageGroup from "../../public/images/signUp/Group_26.png";
import { IStoreState } from "../../types";
import Navbar from "../components/common/AuthNavbar";

import "../style/form.scss";

const Register: React.FunctionComponent = () => {
  const { hasError, error } = useSelector((state: IStoreState) => ({
    error: state.error,
    hasError: state.hasError,
  }));
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [infoForCreateAccount, setInfoForCreateAccount] = useState({
    login: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(createAccount(infoForCreateAccount))
      .then(() => {
        dispatch(createAccountSucceeded());

        setInfoForCreateAccount({ login: "", username: "", password: "" });
        history.push("/login");
      })
      .catch((err: Error) => {
        dispatch(createAccountFailed(err.message));
      });
  };

  const handleInputChanged = (e: React.FormEvent<HTMLInputElement>) =>
    setInfoForCreateAccount({
      ...infoForCreateAccount,
      [e.currentTarget.id]: e.currentTarget.value,
    });

  return (
    <div className="register">
      <Navbar />
      <div className="content">
        <div className="images-left">
          <img className="single-img" src={image} alt="" />
          <img className="group-img" src={imageGroup} alt="" />
        </div>

        <div className="right">
          <form onSubmit={handleSubmit}>
            <h1 className="form-header">Sign Up</h1>

            <label htmlFor="login">
              email
              <input
                id="login"
                type="email"
                value={infoForCreateAccount.login}
                onChange={handleInputChanged}
                required
                placeholder="example@mail.com"
              />
            </label>

            <label htmlFor="username">
              user name
              <input
                id="username"
                type="text"
                value={infoForCreateAccount.username}
                onChange={handleInputChanged}
                required
                placeholder="alexexample..."
              />
            </label>

            <label htmlFor="password">
              password
              <input
                id="password"
                type="password"
                value={infoForCreateAccount.password}
                onChange={handleInputChanged}
                required
                placeholder="Type in..."
              />
            </label>

            <span className="text-form">
              Have an account?&nbsp;
              <Link className="link" to="/login">
                Log In
              </Link>
            </span>

            <button type="submit">Sign up</button>

            <span className="text-form">
              Have an account?&nbsp;
              <Link className="link" to="/login">
                Log In
              </Link>
            </span>
          </form>
        </div>
      </div>
      {hasError && <div className="error">{`${error}`}</div>}
    </div>
  );
};

export default Register;
