import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

type Group = {
  id: string;
  team: string;
  start: string;
  graduation: string;
  img: string;
};

type User = {
  id: string;
  name: string;
  groupId: string | null;
};

function MainPage({ user }: { user: User | null }): JSX.Element {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [groupData, setGroupData] = useState<Group | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get('/mainpage');
        setGroups(response.data);
      } catch (error) {
        console.error('Ошибка при получении списка групп:', error);
      }
    };

    const fetchUser = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get('/users/userId');
        // Предполагается, что функция setUser приходит из пропсов или 
        // обновляет состояние пользователя в родительском компоненте
        // setUser(response.data); 
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
      }
    };

    void fetchGroups();
    void fetchUser();
  }, []);

  const handleGroupSelect = async (groupId: string) => {
    setSelectedGroup(groupId);

    try {
      const response = await axiosInstance.get(`/mainpage/${groupId}`);
      setGroupData(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных группы:', error);
    }
  };

  const handleSelectButtonClick = async (): Promise<void> => {
    if (!selectedGroup || !user || !user.id) {
      console.error('Ошибка: user.id не определён или данные пользователя не загружены');
      return;
    }

    try {
      // Создание гороскопа (по желанию)
      await axiosInstance.post('/horoscope/', {
        date: new Date().toISOString(),
        prediction: 'Ваш гороскоп на сегодня',
        groupId: selectedGroup,
      });

      // Перенаправление на страницу HoroscopePage с передачей groupId
      navigate(`/horoscope/${selectedGroup}`);
    } catch (error) {
      console.error('Ошибка при создании гороскопа или получении случайного предсказания:', error);
    }
  };

  return (
    <div>
      <ul>
        {groups.map((group) => (
          <li key={group.id} onClick={() => handleGroupSelect(group.id)}>
            {group.team}
          </li>
        ))}
      </ul>

      {selectedGroup && groupData && (
  <div className="group-container">
    <div>
      <h2>Данные для группы: {groupData.team}</h2>
      <p>Начало обучения: {groupData.start}</p>
      <p>Окончание обучения: {groupData.graduation}</p>
      <button onClick={handleSelectButtonClick}>Выбрать</button>
    </div>
    <img src={groupData.img} alt={groupData.team} />
  </div>
)}

    </div>
  );
}

export default MainPage;
