import "../../style/navbar.scss";

const AuthNavbar: React.FunctionComponent = ({ children }) => {
  return (
    <div className="navbar">
      <h2>Linkstagram</h2>
      {children}
    </div>
  );
};

export default AuthNavbar;
