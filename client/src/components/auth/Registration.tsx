import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../../services/axiosInstance";
import "./AufReg.css";
import * as React from "react"; // i dont know???


type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  groupId: number;
};

type RegistrationProps = {
  setUser: (user: User) => void;
};


type ErrorState = string | null;

function Registration({ setUser }: RegistrationProps): JSX.Element {
  const navigate = useNavigate(); 
  const [error, setError] = useState<ErrorState>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cpassword, setCPassword] = useState<string>("");

  function validation(
    name: string,
    email: string,
    password: string,
    cpassword: string
  ): boolean {
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      cpassword.trim() === ""
    ) {
      setError("Заполните поле");
      return false;
    }
    if (password.trim() !== cpassword.trim()) {
      setError("Пароли не совпадают");
      return false;
    }
    return true;
  }

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validation(name, email, password, cpassword)) {
      return;
    }

    try {
      const { data } = await axiosInstance.post<{
        message: string;
        accessToken: string;
        user: User;
      }>("/auth/registration", {
        name,
        email,
        password,
      });

      console.log("=====", data.user);
      if (data.message === "success") {
        setAccessToken(data.accessToken);
        setUser(data.user);
        navigate("/mainpage"); // Переход на страницу /mainpage после успешной регистрации
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="registrationForm">
      <h2 className="registrationTitle">Создать профиль</h2>
      <form className="registration" onSubmit={onHandleSubmit}>
        <label htmlFor="name" className="registrationLabel">
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          <input
            required
            type="email"
            placeholder="email@xxx.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            minLength={5}
          />
        </label>

        <label htmlFor="password">
          <input
            type="password"
            placeholder="password"
            value={password}
            required
            minLength={3}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          <input
            required
            type="password"
            placeholder="check password"
            value={cpassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
        </label>

        <span style={{ color: "#ccffcc" }}>{error && <p>{error}</p>}</span>
        <button className="button-3d" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Registration;
