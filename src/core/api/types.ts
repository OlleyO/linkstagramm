// SECTION: Helper interfaces
export type UserProfile = {
  username: string;
  description: string | null;
  first_name: string | null;
  followers: number;
  following: number;
  job_title: string | null;
  last_name: string | null;
  profile_photo_url: string | null;
  email: string;
  [key: string]: string | null | number;
};

export type profileCamelcased = {
  username: string;
  description: string | null;
  firstName: string | null;
  followers: number;
  following: number;
  jobTitle: string | null;
  lastName: string | null;
  profilePhotoUrl: string | null;
  email: string;
  [key: string]: string | null | number;
};

export type Photo = {
  id: number;
  url: string;
};

export type Comment = {
  id: number;
  commenter: UserProfile;
  created_at: string;
  message: string;
};

//   SECTION: Request Params
export type CreateAccountParams = {
  username: string;
  login: string;
  password: string;
};

export type LoginParams = {
  login: string;
  password: string;
};

//   SECTION: Responses
export type ResponseWithUserProfile = UserProfile;

export type ResponseWithPost = {
  id: number;
  author: UserProfile;
  comments_count: number;
  created_at: string;
  description: string;
  is_liked: boolean;
  likes_count: number;
  photos: {
    id: number;
    url: string;
  }[];
};

export type ResponseWithComments = Comment[];
