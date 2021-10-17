import React, { useState } from "react";

import noImage from "../../public/images/upload-post.svg";

const NewPost = () => {
  const [filesUrls, setFilesUrls] = useState<string[]>([]);
  const [description, setDescription] = useState<string>();
  const handleFileUpload = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const files = Array.from(e.currentTarget.files);

      files.forEach((file) => {
        const url = URL.createObjectURL(file);
        setFilesUrls([...filesUrls, url]);
      });
    }
  };

  const handleFilesClick = () => setFilesUrls([]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.currentTarget.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(description);
  };

  return (
    <div className="modal-create-post">
      <form onSubmit={handleSubmit}>
        <div className="photos">
          <img
            className="post-image"
            src={filesUrls.length === 0 ? noImage : filesUrls[0]}
            alt=""
          />
          <label htmlFor="post-images">
            <input
              id="post-images"
              type="file"
              multiple
              onChange={handleFileUpload}
              onClick={handleFilesClick}
            />
            Choose any photo from your libabry
          </label>
        </div>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            placeholder="Description..."
            onChange={handleDescriptionChange}
          />
        </label>

        <div className="form-buttom">
          <button className="cancel-btn" type="button">
            Cancel
          </button>
          <button className="save-btn" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
