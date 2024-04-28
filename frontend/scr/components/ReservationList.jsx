import React, { useState, useEffect } from 'react';

const ReservationList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('/bookings/')
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error('Ошибка получения бронирований:', error));
  }, []);

  const handleRemove = async (index) => {
    const response = await fetch(`/bookings/${index}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Бронирование успешно удалено!');
      setBookings(bookings.filter((booking, i) => i !== index));
    } else {
      alert('Произошла ошибка при удалении бронирования.');
    }
  };

  return (
    <div>
      <h2>Брони</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            <div>Имя: {booking.name}</div>
            <div>Дата: {booking.date}</div>
            <div>Время: {booking.time}</div> {/* Добавляем отображение времени */}
            <div>Гостей: {booking.guests}</div>
            <button onClick={() => handleRemove(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
