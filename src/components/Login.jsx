import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = () => {
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
      <h2>Welcome to BioRekha</h2>
      <p className="login-subtext">
        Securely access your personal health records.
      </p>

      <button className="google-btn" onClick={handleGoogleLogin}>
        Sign in with Google
      </button>
    </div>
  </div>
);

};

export default Login;
