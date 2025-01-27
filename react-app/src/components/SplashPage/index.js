import { useNavigate } from "react-router-dom";
import "./splashPage.css";

const SplashPage = () => {
  const navigate = useNavigate();

  const signUp = (e) => {
    navigate("/sign-up");
  };

  const login = (e) => {
    navigate("/login");
  };

  return (
    <div id="page">
      <div id="main-card">
        <h1>Welcome to PettIt</h1>
        <p>
          Pettit is a place where you can see all the creatures you want to pet!
        </p>
        <div id="buttons">
          <button className="btn" onClick={signUp}>
            Sign Upppppppppp
          </button>
          <button className="btn" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
export default SplashPage;
