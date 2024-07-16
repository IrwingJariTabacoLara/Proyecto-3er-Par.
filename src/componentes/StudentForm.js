import React, { useState } from 'react';
import { db, Timestamp } from '../configuracionfirebase/firebase';
import '../App.css';

const EventForm = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [startYear, startMonth, startDay] = startDate.split('-');
    const [startHours, startMinutes] = startTime.split(':');
    const fullStartDate = new Date(startYear, startMonth - 1, startDay, startHours, startMinutes);

    const [endYear, endMonth, endDay] = endDate.split('-');
    const [endHours, endMinutes] = endTime.split(':');
    const fullEndDate = new Date(endYear, endMonth - 1, endDay, endHours, endMinutes);

    try {
      await db.collection('Recordatorios').add({
        Titulo: title,
        FechaInicio: Timestamp.fromDate(fullStartDate),
        FechaFin: Timestamp.fromDate(fullEndDate),
        Descripcion: description,
      });
      setTitle('');
      setStartDate('');
      setStartTime('');
      setEndDate('');
      setEndTime('');
      setDescription('');
      alert('Evento agregado exitosamente');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error al agregar el evento');
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='Formulario'>
        <label>Título&emsp;</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        
        <label>&emsp;&emsp;Fecha de Inicio&emsp;</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} min={getCurrentDate()} required />
        <label>&emsp;&emsp;Hora de Inicio&emsp;</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        
        <label>&emsp;&emsp;Fecha de Término&emsp;</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={getCurrentDate()} required />
        <label>&emsp;&emsp;Hora de Término&emsp;</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        
        <br/><br/>
        <label>Descripción&emsp;</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        <br/><br/>
      </div>
      <button type="submit">Agregar Evento</button>
    </form>
  );
};

export default EventForm;

