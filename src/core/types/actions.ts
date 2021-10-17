import { Profile } from "../../types";

export type CreateAccountAction =
  | {
      type: "CREATE_ACCOUNT_FAILED";
      error: string;
    }
  | {
      type: "CREATE_ACCOUNT_SUCCEEDED";
    }
  | {
      type: "CREATE_ACCOUNT_PENDING";
    };

export type LoginAction =
  | {
      type: "LOGIN_AS_REGISTERED_USER_FAILED";
      error: string;
    }
  | {
      type: "LOGIN_AS_REGISTERED_USER_SUCCEEDED";
      authorizationToken: string;
    }
  | {
      type: "LOGIN_AS_REGISTERED_USER_PENDING";
    };

export type GetUserAccountAction =
  | {
      type: "GET_USER_ACCOUNT_FAILED";
      error: string;
    }
  | {
      type: "GET_USER_ACCOUNT_SUCCEEDED";
      account: Profile;
    }
  | {
      type: "GET_USER_ACCOUNT_PENDING";
    };

export type EditAccountAction =
  | {
      type: "EDIT_USER_ACCOUNT_FAILED";
      error: string;
    }
  | {
      type: "EDIT_USER_ACCOUNT_SUCCEEDED";
      account: Profile;
    }
  | {
      type: "EDIT_USER_ACCOUNT_PENDING";
    };

export type LogoutAction = {
  type: "LOGOUT";
};

export type OtherErrorAction = {
  type: "OTHER_ERROR";
  error: string;
};

export type SetAuthTokenAction = {
  type: "SET_AUTH_TOKEN";
  authToken: string;
};

// SECTION: Action creators
export const createAccountFailed = (error: string): CreateAccountAction => ({
  type: "CREATE_ACCOUNT_FAILED",
  error,
});

export const createAccountSucceeded = (): CreateAccountAction => ({
  type: "CREATE_ACCOUNT_SUCCEEDED",
});

export const createAccountPending = (): CreateAccountAction => ({
  type: "CREATE_ACCOUNT_PENDING",
});

export const loginFailed = (error: string): LoginAction => ({
  type: "LOGIN_AS_REGISTERED_USER_FAILED",
  error,
});

export const loginSucceeded = (authorizationToken: string): LoginAction => ({
  type: "LOGIN_AS_REGISTERED_USER_SUCCEEDED",
  authorizationToken,
});

export const loginPending = (): LoginAction => ({
  type: "LOGIN_AS_REGISTERED_USER_PENDING",
});

export const getUserAccountFailed = (error: string): GetUserAccountAction => ({
  type: "GET_USER_ACCOUNT_FAILED",
  error,
});

export const getUserAccountSucceeded = (
  account: Profile
): GetUserAccountAction => ({
  type: "GET_USER_ACCOUNT_SUCCEEDED",
  account,
});

export const getUserAccountPending = (): GetUserAccountAction => ({
  type: "GET_USER_ACCOUNT_PENDING",
});

export const editAccountFailed = (error: string): EditAccountAction => ({
  type: "EDIT_USER_ACCOUNT_FAILED",
  error,
});

export const editAccountSucceeded = (account: Profile): EditAccountAction => ({
  type: "EDIT_USER_ACCOUNT_SUCCEEDED",
  account,
});

export const editAccountPending = (): EditAccountAction => ({
  type: "EDIT_USER_ACCOUNT_PENDING",
});

export const logout = (): LogoutAction => ({
  type: "LOGOUT",
});

export const otherError = (error: string): OtherErrorAction => ({
  type: "OTHER_ERROR",
  error,
});

export const setAuthToken = (authToken: string): SetAuthTokenAction => ({
  type: "SET_AUTH_TOKEN",
  authToken,
});
