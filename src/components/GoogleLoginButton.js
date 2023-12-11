import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const responseGoogle = (response) => {
    if (response && response.profileObj) {
      onSuccess(response.profileObj);
    } else {
      onFailure();
    }
  };

  return (
    <GoogleLogin
      clientId="96305492305-bout7jov9hgpl0uc9itmv8b7t86sc4ua.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy="single_host_origin"
    />
  );
};

export default GoogleLoginButton;
