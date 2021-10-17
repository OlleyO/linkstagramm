import { ThunkAction } from "redux-thunk";

import {
  AccountForUpdate,
  IStoreState,
  Profile,
  UserForLogin,
  UserForSignUp,
} from "../../types";
import {
  fetchAccount,
  fetchCreateAccount,
  fetchEditAccount,
  fetchLoginAsRegisteredUser,
} from "../api/api";
import { ResponseWithUserProfile } from "../api/types";
import { AppDispatch } from "../store/store";
import {
  CreateAccountAction,
  LoginAction,
  GetUserAccountAction,
  EditAccountAction,
  LogoutAction,
  createAccountPending,
  loginPending,
  loginSucceeded,
  getUserAccountPending,
  getUserAccountSucceeded,
  getUserAccountFailed,
  editAccountPending,
  editAccountFailed,
  editAccountSucceeded,
  OtherErrorAction,
  SetAuthTokenAction,
  loginFailed,
} from "../types/actions";

const initState: IStoreState = {
  isLoading: false,
  isLoggedIn: false,
  isAccountCreated: false,
  error: "",
  authorizationToken: "",
  hasError: false,

  // user account data:
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  description: "",
  followers: 0,
  following: 0,
  jobTitle: "",
  profilePhotoUrl: "",
};

export const createAccount =
  (userInfo: UserForSignUp) => (dispatch: AppDispatch) => {
    dispatch(createAccountPending());

    return fetchCreateAccount(userInfo).then((response) => {
      if (!response.ok) {
        throw new Error(
          "Ooops... Something went wrong. User might already exist."
        );
      }

      return response.json();
    });
  };

export const loginAsRegisteredUser =
  (userInfo: UserForLogin) => (dispatch: AppDispatch) => {
    dispatch(loginPending());

    return fetchLoginAsRegisteredUser(userInfo).then((response) => {
      if (!response.ok) {
        throw new Error(
          "Oops... It seems like there is no such user or input data is invalid"
        );
      }

      const authToken = response.headers.get("Authorization") ?? "";

      if (authToken.length === 0) {
        dispatch(loginFailed("Can't get auth token"));
        return;
      }

      dispatch(loginSucceeded(authToken ?? ""));
      sessionStorage.setItem("authToken", authToken);
    });
  };

export const getUSerAccount =
  () => (dispatch: AppDispatch, getState: () => IStoreState) => {
    const { authorizationToken: authToken, username } = getState();

    dispatch(getUserAccountPending());

    return fetchAccount(authToken)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Cannot get ${username}'s account'`);
        }

        return response.json();
      })
      .then((account: ResponseWithUserProfile) => {
        const camelcasedAccount: Profile = {
          username: account.username,
          firstName: account.first_name ?? "",
          lastName: account.last_name ?? "",
          email: account.email,
          description: account.description ?? "",
          followers: account.followers,
          following: account.following,
          profilePhotoUrl: account.profile_photo_url ?? "",
          jobTitle: account.job_title ?? "",
        };
        dispatch(getUserAccountSucceeded(camelcasedAccount));
      })
      .catch((error) => {
        dispatch(getUserAccountFailed(error.message));
      });
  };

export const editAccount =
  (
    newAccount: Profile
  ): ThunkAction<void, IStoreState, Profile, EditAccountAction> =>
  async (dispatch: AppDispatch, getState: () => IStoreState) => {
    try {
      const { authorizationToken: authToken } = getState();

      const rubyCaseAccount: AccountForUpdate = {
        username: newAccount.username,
        profile_photo: newAccount.profilePhotoUrl,
        first_name: newAccount.firstName,
        last_name: newAccount.lastName,
        description: newAccount.description,
        job_title: newAccount.jobTitle,
      };

      dispatch(editAccountPending());

      const response = await fetchEditAccount(authToken, rubyCaseAccount);
      if (!response.ok) {
        throw new Error("Cannot update account");
      }
      const account: ResponseWithUserProfile = await response.json();
      const camelcasedAccount: Profile = {
        username: account.username,
        firstName: account.first_name ?? "",
        lastName: account.last_name ?? "",
        email: account.email,
        description: account.description ?? "",
        followers: account.followers,
        following: account.following,
        profilePhotoUrl: account.profile_photo_url ?? "",
        jobTitle: account.job_title ?? "",
      };

      dispatch(editAccountSucceeded(camelcasedAccount));
    } catch (err) {
      const error = err as Error;
      dispatch(editAccountFailed(error.message));
    }
  };

export const getTokenFromSessionStorage = (dispatch: AppDispatch): string => {
  const token = sessionStorage.getItem("authToken") ?? "";

  if (token === "") {
    dispatch(loginFailed("Can't get auth token"));
    return "";
  }

  dispatch(loginSucceeded(token));
  return token;
};

//   authReducer
export default (
  state = initState,
  action:
    | CreateAccountAction
    | LoginAction
    | GetUserAccountAction
    | EditAccountAction
    | LogoutAction
    | OtherErrorAction
    | SetAuthTokenAction
): IStoreState => {
  switch (action.type) {
    case "CREATE_ACCOUNT_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "CREATE_ACCOUNT_SUCCEEDED":
      return {
        ...state,
        isAccountCreated: true,
        hasError: false,
        isLoading: false,
        error: "",
      };

    case "CREATE_ACCOUNT_FAILED":
      return {
        ...state,
        error: action.error,
        hasError: true,
        isLoading: false,
      };

    case "LOGIN_AS_REGISTERED_USER_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "LOGIN_AS_REGISTERED_USER_SUCCEEDED":
      return {
        ...state,
        isLoggedIn: true,
        authorizationToken: action.authorizationToken,
        hasError: false,
        error: "",
        isLoading: false,
      };

    case "LOGIN_AS_REGISTERED_USER_FAILED":
      return {
        ...state,
        error: action.error,
        hasError: true,
        isLoading: false,
      };

    case "GET_USER_ACCOUNT_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_USER_ACCOUNT_SUCCEEDED":
      return {
        ...state,
        isLoading: false,
        ...action.account,
        hasError: false,
        error: "",
      };

    case "GET_USER_ACCOUNT_FAILED":
      return {
        ...state,
        error: action.error,
        hasError: true,
        isLoading: false,
      };

    case "EDIT_USER_ACCOUNT_PENDING":
      return {
        ...state,
        isLoading: true,
      };

    case "EDIT_USER_ACCOUNT_SUCCEEDED":
      return {
        ...state,
        ...action.account,
        hasError: false,
        error: "",
        isLoading: false,
      };

    case "EDIT_USER_ACCOUNT_FAILED":
      return {
        ...state,
        error: action.error,
        hasError: true,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        authorizationToken: "",
      };

    case "OTHER_ERROR":
      return {
        ...state,
        error: action.error,
      };

    case "SET_AUTH_TOKEN":
      return {
        ...state,
        authorizationToken: action.authToken,
      };

    default:
      return state;
  }
};
