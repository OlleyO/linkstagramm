import {
  AccountForUpdate,
  Post,
  UserForLogin,
  UserForSignUp,
} from "../../types";

// ${baseUrl}/
const { REACT_APP_API_URL: baseUrl } = process.env || "";

// SECTION: Authentication
export const fetchCreateAccount = async (user: UserForSignUp) => {
  const response = await fetch(`${baseUrl}/create-account`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response;
};

export const fetchLoginAsRegisteredUser = async (user: UserForLogin) => {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response;
};

// SECTION: Comments
export const fetchComment = async (
  authToken: string,
  postId: number,
  commentText: string
) => {
  const response = await fetch(`${baseUrl}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      message: commentText,
    }),
  });

  return response;
};

export const fetchPostComments = async (postId: number) => {
  const response = await fetch(`${baseUrl}/posts/${postId}/comments`);

  return response;
};

// SECTION: Edit profile
export const fetchAccount = async (authToken: string) => {
  const response = await fetch(`${baseUrl}/account`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const fetchEditAccount = async (
  authToken: string,
  editedAccount: AccountForUpdate
) => {
  const response = await fetch(`${baseUrl}/account`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(editedAccount),
  });

  return response;
};

// SECTION: Likes
export const fetchRemoveLike = async (postId: number, authToken: string) => {
  const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response;
};

export const fetchSetLike = async (postId: number, authToken: string) => {
  const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response;
};

// SECTION: Posts
export const fetchCreatePost = async (authToken: string, post: Post) => {
  const response = await fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(post),
  });

  return response;
};

export const fetchDeletePost = async (authToken: string, postId: number) => {
  const response = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response;
};

export const fetchGetPost = async (postId: number) => {
  const response = await fetch(`${baseUrl}/posts/${postId}`);

  return response;
};

export const fetchGetAllPosts = async (abortSignal: AbortSignal) => {
  const response = await fetch(`${baseUrl}/posts`, {
    signal: abortSignal,
  });

  return response;
};

export const fetchGetPostsOfUser = async (username: string) => {
  const response = await fetch(`${baseUrl}/profiles/${username}/posts`);

  return response;
};

// SECTION: Profiles
export const fetchUserProfile = async (username: string) => {
  const response = await fetch(`${baseUrl}/profiles/${username}`);
  const profile = await response.json();
  return profile;
};

export const fetchAllUsersProfiles = async (abortSignal: AbortSignal) => {
  const response = await fetch(`${baseUrl}/profiles`, {
    signal: abortSignal,
  });
  return response;
};
