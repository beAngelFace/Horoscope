import React from 'react'
import { NavLink } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../../services/axiosInstance";
import "./Navbar.css";


type User = {
  name: string;
};

type NavbarProps = {
  user?: User | null;
  setUser: (user: User | null) => void;
};

function Navbar({ user, setUser }: NavbarProps): JSX.Element {
  const onHandleLogout = async (): Promise<void> => {
    try {
      const { data } = await axiosInstance.get("/auth/logout");
      console.log(data);
      if (data.message === "success") {
        setAccessToken(undefined);
        setUser(null); 
      }
    } catch (error) {
      console.error("Ошибка при выходе из системы:", error);
    }
  };

  return (
    <nav className="navbar">
      <NavLink className="navbar-link" to="/">
        Главная
      </NavLink>
      {user ? (
        <>
          <p className="welcome-message">{`Привет, ${user.name}!`}</p>
          <button className="logout-button" type="button" onClick={onHandleLogout}>
            Выход
          </button>
        </>
      ) : (
        <>
          <NavLink className="navbar-link" to="/registration">
            Регистрация
          </NavLink>
          <NavLink className="navbar-link" to="/authorization">
            Авторизация
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
