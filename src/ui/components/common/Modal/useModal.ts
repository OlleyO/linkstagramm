import { useState } from "react";

export default () => {
  const [show, setShow] = useState(false);
  const handleModalEvents = {
    open: () => {
      setShow(true);
    },

    close: () => {
      setShow(false);
    },
  };

  return { show, handleModalEvents };
};
