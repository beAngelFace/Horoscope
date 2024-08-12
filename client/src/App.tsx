import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Registration from "./components/auth/Registration";
import Authorization from "./components/auth/Authorization";
import axiosInstance, { setAccessToken } from "./services/axiosInstance";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./components/MainPage/MainPage";
import HoroscopePage from "./components/HoroscopePage/HoroscopePage";
import ErrorPage from "./components/ErrorPage";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  groupId: number;
};

type AxiosUserResponse = {
  message: string;
  users: User;
};

type AxiosCheckUserResponse = {
  message: string;
  user: User;
  accessToken: string;
};

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);

  const axiosUsers = async (id: number): Promise<void> => {
    try {
      const { data } = await axiosInstance.get<AxiosUserResponse>(`/users/${id}`);

      if (data.message === "success") {
        setUser(data.users);
      }
    } catch (error) {
      console.error("Ошибка при получении пользователя:", error);
    }
  };

  const axiosCheckUser = async (): Promise<void> => {
    try {
      const { data } = await axiosInstance.get<AxiosCheckUserResponse>('/tokens/refresh');
      console.log(data);

      if (data.message === 'success') {
        setUser(data.user);
        setAccessToken(data.accessToken);
      }
    } catch (error) {
      console.error("Ошибка при проверке пользователя:", error);
    }
  };

  useEffect(() => {
    axiosCheckUser();
  }, []);

  return (
    <div className="app-container">
      <Navbar user={user} setUser={setUser} />
      <div className="starfield"></div>
      <h1 className="rotating-text">Гороскоп для Эльбрусовцев</h1>

      <Routes>
        <Route path="/" element={<MainPage user={user} />} />
        <Route path="/mainpage" element={<MainPage user={user} />} />
        <Route path="/registration" element={<Registration setUser={setUser} />} />
        <Route path="/authorization" element={<Authorization setUser={setUser} />} />
        <Route path="/horoscope/:groupId" element={<HoroscopePage setUser={setUser}/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
