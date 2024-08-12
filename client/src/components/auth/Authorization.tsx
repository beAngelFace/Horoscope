import { useState, ChangeEvent } from "react"; // подсмотрено..
import { useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../../services/axiosInstance";
import "./AufReg.css";

type AuthorizationProps = {
  setUser: (user: any) => void;
};

function Authorization({ setUser }: AuthorizationProps): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  function validation(email: string, password: string): boolean {
    if (email.trim() === "" || password.trim() === "") {
      setError("Заполните поле");
      return false;
    }
    return true;
  }

  const onHadleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validation(email, password)) {
      return;
    }

    try {
      const { data } = await axiosInstance.post("/auth/authorization", {
        email,
        password,
      });

      console.log(data.user);

      if (data.message === "success") {
        setUser(data.user);
        setAccessToken(data.accessToken);
        navigate("/mainpage"); // Переход на страницу /mainpage после успешной авторизации
        return;
      }
    } catch (error: any) {
      console.log(error.response?.data?.message);
      setError(error.response?.data?.message || "Произошла ошибка");
      console.log(error);
    }
  };

  return (
    <div>
      <form className="auth" onSubmit={onHadleSubmit}>
        <label htmlFor="email">
          <input
            required
            type="email"
            placeholder="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </label>
        <label htmlFor="password">
          <input
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </label>
        <span style={{ color: "#ccffcc" }}>{error && <p>{error}</p>}</span>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Authorization;
