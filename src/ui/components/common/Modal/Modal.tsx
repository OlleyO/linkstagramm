import React, { PropsWithChildren } from "react";

import "../../../style/modal.scss";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}

const Modal: React.FunctionComponent<PropsWithChildren<ModalProps>> = ({
  children,
  onClose,
  show,
}) => {
  const handleCloseModalFromInside = (
    e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.currentTarget.className.includes("modal-close-btn")) onClose();
    e.stopPropagation();
  };

  return show ? (
    <div
      onClick={() => onClose()}
      className="modal"
      onKeyDown={() => onClose()}
      role="button"
      tabIndex={-1}
    >
      <div
        className="modal-content"
        onClick={handleCloseModalFromInside}
        onKeyDown={handleCloseModalFromInside}
        role="button"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
