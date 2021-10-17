export interface UserForShare {
  username: string;
  avatarSrc: string;
  firstName: string;
  lastName: string;
}

export interface UserForLogin {
  login: string;
  password: string;
}

export interface UserForSignUp {
  login: string;
  password: string;
  username: string;
}

export interface AccountForUpdate {
  username?: string;
  profile_photo?: string;
  description?: string;
  first_name?: string;
  last_name?: string;
  job_title?: string;
}

export interface Profile {
  username: string;
  description: string;
  firstName: string;
  followers?: number;
  following?: number;
  jobTitle: string;
  lastName: string;
  profilePhotoUrl: string;
  email?: string;
  [key: string]: string | number | undefined;
}

export interface PhotoData {
  id: string;
  storage: "cache";
  metadata: {
    filename: string;
    size: number;
    mime_type: string;
  };
}

export interface PostImage {
  image: PhotoData;
}

export interface Post {
  post: {
    description: string;
    photos_attributes: PostImage[];
  };
}

export interface ProfileForPost {
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  username: string;
}

export interface IStoreState {
  isLoggedIn: boolean;
  isLoading: boolean;

  isAccountCreated: boolean;
  error: string;
  authorizationToken: string;
  hasError: boolean;

  // user account data:
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  description: string;
  followers: number;
  following: number;
  jobTitle: string;
  profilePhotoUrl: string;
}

export interface DataFromPostFetch {
  id: number;
  author: ProfileForPost;
  comments_count: number;
  created_at: string;
  description: string;
  is_liked: boolean;
  likes_count: number;
  photos: { id: number; url: string }[];
}

export interface Comment {
  id: number;
  commenter: ProfileForPost;
  createdAt: string;
  message: string;
}
