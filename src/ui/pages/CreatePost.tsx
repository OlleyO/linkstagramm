import "../style/form.scss";
import "../style/dragdrop.scss";

import AwsS3 from "@uppy/aws-s3";
import Uppy from "@uppy/core";
import { Dashboard, useUppy } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import React, { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import { fetchCreatePost } from "../../core/api/api";
import { IStoreState, Post } from "../../types";
import Navbar from "../components/common/Navbar";

const CreatePost = () => {
  const history = useHistory();
  const authToken = useSelector(
    (state: IStoreState) => state.authorizationToken
  );

  const [post, setPost] = useState<Post>({
    post: {
      description: "",
      photos_attributes: [],
    },
  });

  const uppy = useUppy(() => new Uppy());

  uppy.use(AwsS3, {
    id: "gergwegs",

    companionUrl: "https://linkstagram-api.ga",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchCreatePost(authToken, post).then((res) => res.json());
  };

  const handleCancel = () => history.goBack();
  const handleDescriptionChange = (e: React.FormEvent<HTMLInputElement>) =>
    setPost({
      post: {
        ...post.post,
        description: e.currentTarget.value,
      },
    });

  return (
    <div className="create-post">
      <Navbar />
      <form onSubmit={handleSubmit}>
        <Dashboard uppy={uppy} />

        <label htmlFor="description" style={{ marginBottom: "auto" }}>
          description
          <input
            type="text"
            placeholder="Type in..."
            onChange={handleDescriptionChange}
          />
        </label>

        <button type="submit">Publish</button>
        <button className="cancel" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
