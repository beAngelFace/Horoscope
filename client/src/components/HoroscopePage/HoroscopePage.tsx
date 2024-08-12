import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import './HoroscopePage.css';

type Horoscope = {
  id: string;
  date: string;
  prediction: string;
  groupId: string;
};

function HoroscopePage(): JSX.Element {
  const { groupId } = useParams<{ groupId: string }>(); // Получаем groupId из параметров URL
  const [horoscope, setHoroscope] = useState<Horoscope | null>(null);

  useEffect(() => {
    const fetchHoroscope = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get(`/horoscope/${groupId}`);
        setHoroscope(response.data);
      } catch (error) {
        console.error('Ошибка при получении предсказания:', error);
      }
    };

    void fetchHoroscope();
  }, [groupId]);

  return (
    <div className="horoscope-page">
      {horoscope ? (
        <div className="horoscope-content">
          <h2>Предсказание для группы</h2>
          <p><strong>Дата:</strong> {new Date(horoscope.date).toLocaleDateString()}</p>
          <p><strong>Предсказание:</strong> {horoscope.prediction}</p>
        </div>
      ) : (
        <p>Загрузка предсказания...</p>
      )}
    </div>
  );
}

export default HoroscopePage;
