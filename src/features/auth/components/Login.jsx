import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import React from "react";
import { googleLogin } from "../../../services/apiService";
import Avatar from "../../../components/common/Avatar"; // Ajusta la ruta según tu estructura
import "./Login.css";

const Login = ({ onLoginSuccess }) => {

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google login success", credentialResponse);
      const data = await googleLogin(credentialResponse.credential);
      console.log("Google login data", data);
      onLoginSuccess(data.token,data.name);
    } catch (error) {
      console.error("Error durante el inicio de sesión con Google", error);
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId="440328957525-s0nf44k562nplet8jjk7eer09308i1ig.apps.googleusercontent.com">
      <div className="login-container">
        <div className="avatar-container">
          <Avatar className="avatar-image" />
        </div>

        <h1 className="login-title">Iniciar sesión</h1>
        <div className="google-button-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            text="continue_with"
            shape="pill"
            size="large"
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
