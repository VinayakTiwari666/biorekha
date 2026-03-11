import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import healthIcon from "../assets/healthicon.png";

const Login = ({ message }) => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">
          <img
            src={healthIcon}
            alt="Health Icon"
            className="login-icon-img"
          />
        </div>

        <h2>Welcome to BioRekha</h2>
        <p className="login-subtext">
          Securely manage your personal health records.
        </p>

        {/* 🔥 Alert Message */}
        {message && (
          <p className="login-alert">
            {message}
          </p>
        )}

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="google-icon"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
