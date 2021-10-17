import { useEffect, useState } from "react";
import { SwiperOptions } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

import { fetchAllUsersProfiles, fetchGetAllPosts } from "../../core/api/api";
import { ResponseWithPost } from "../../core/api/types";
import { Profile } from "../../types";
import AccountInterface from "../components/AccountInterface";
import Post, { PostProps } from "../components/Post";
import Navbar from "../components/common/Navbar";
import ProfilePhoto from "../components/common/ProfilePhoto";

import "../style/scrollbar.scss";
import { useAppDispatch } from "../../core/store/store";
import { otherError } from "../../core/types/actions";

const Home: React.FunctionComponent = () => {
  const [users, setUsers] = useState<Profile[]>([]);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const dispatch = useAppDispatch();

  const abortCont = new AbortController();

  const swiperOptions: SwiperOptions = {
    grabCursor: true,
    slidesPerView: 6,
    freeMode: true,
  };

  const onStart = () => {
    Promise.all([
      fetchAllUsersProfiles(abortCont.signal),
      fetchGetAllPosts(abortCont.signal),
    ])
      .then((responses) => {
        responses.forEach((response) => {
          if (response.url.endsWith("posts")) {
            response
              .json()
              .then((data: ResponseWithPost[]) => {
                setPosts(
                  data.map((post: ResponseWithPost) => ({
                    id: post.id,
                    author: {
                      firstName: post.author.first_name ?? "",
                      lastName: post.author.last_name ?? "",
                      username: post.author.username ?? "",
                      profilePhotoUrl: post.author.profile_photo_url ?? "",
                    },
                    commentsCount: post.comments_count,
                    likesCount: post.likes_count,
                    description: post.description,
                    isLiked: post.is_liked,
                    createdAt: post.created_at,
                    photos: post.photos,
                  }))
                );
              })
              .catch((err: Error) => dispatch(otherError(err.message)));
          } else if (response.url.endsWith("profiles")) {
            response
              .json()
              .then((data) => setUsers(data))
              .catch((err: Error) => dispatch(otherError(err.message)));
          }
        });
      })
      .catch((err: Error) => dispatch(otherError(err.message)));
  };

  useEffect(() => {
    onStart();
    return () => {
      abortCont.abort();
    };
  }, []);

  return (
    <div className="home">
      <Navbar />

      <div className="home-content">
        {/* eslint-disable react/jsx-props-no-spreading */}
        <Swiper className="scrollbar" {...swiperOptions}>
          {/* eslint-enable react/jsx-props-no-spreading */}
          {users.map(({ username, profilePhotoUrl: photoUrl }) => (
            <SwiperSlide key={username}>
              <ProfilePhoto avatar={photoUrl} key={username} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div>
          <div>
            {posts.map((post) => (
              <Post
                id={post.id}
                author={post.author}
                commentsCount={post.commentsCount}
                likesCount={post.likesCount}
                description={post.description}
                isLiked={post.isLiked}
                createdAt={post.createdAt}
                key={post.id}
                photos={post.photos}
              />
            ))}
          </div>
        </div>
      </div>

      <AccountInterface>
        <div style={{ textAlign: "center", marginTop: "42px" }}>
          <p style={{ fontSize: "12px", fontWeight: 100, color: "#75757566" }}>
            About Help Privacy Terms Locations Language
          </p>
          <p style={{ fontSize: "12px", fontWeight: 100, color: "#75757566" }}>
            &copy; 2020 Linkstagram
          </p>
        </div>
      </AccountInterface>
    </div>
  );
};

export default Home;
