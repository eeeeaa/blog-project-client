import { loginUseCase } from "../../domain/auth/authUseCase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../utils/contextProvider";

export function Login() {
  const navigate = useNavigate();
  const { setCookie, setUserProfile } = useContext(AppContext);
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUseCase(username, password);
      setCookie("token", data.token, {
        secure: true,
        httpOnly: true,
        sameSite: true,
        maxAge: 86400,
      });
      setUserProfile({ username: data.username });
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">
          <p>Username</p>
          <input
            id="username"
            name="username"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
