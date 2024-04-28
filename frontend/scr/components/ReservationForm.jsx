import React, { useState } from 'react';

const ReservationForm = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Проверяем, что все поля заполнены
    if (!name || !date || !time || !guests) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }
    const response = await fetch('/bookings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, date, time, guests }),
    });
    if (response.ok) {
      alert('Бронирование успешно добавлено!');
      setName('');
      setDate('');
      setTime('');
      setGuests('');
    } else {
      alert('Произошла ошибка при добавлении бронирования.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      <input type="number" placeholder="Количество гостей" value={guests} onChange={(e) => setGuests(e.target.value)} />
      <button type="submit">Забронировать</button>
    </form>
  );
};

export default ReservationForm;
