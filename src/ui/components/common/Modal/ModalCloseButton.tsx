//  This is close button for Modal Component.
//  You can add additional functions on Click Event,
// but you should remember close() functions
import "../../../style/modal.scss";

interface ModalCloseButtonProps {
  text?: string;
  className?: string;
  onClick: () => void;
}

const ModalCloseButton: React.FunctionComponent<ModalCloseButtonProps> = ({
  text,
  className,
  onClick,
}) => {
  return (
    <button
      className={`close-modal ${"" ?? className} `}
      onClick={() => onClick()}
      type="button"
    >
      {text}
    </button>
  );
};

export default ModalCloseButton;
