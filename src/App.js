import React from 'react';
import './App.css';
import EventForm from './componentes/StudentForm';
import EventList from './componentes/StudentList';
import VistaCalendario from './componentes/vistaCalendario'; // Nota la letra mayúscula

const App = () => {
  return (
    <div className='container'>
      <h1>Agenda</h1>
      <EventForm />
      <br /><br />
      <div className='vista-eventos'>
        <div className='lista-eventos'>
          <EventList />
        </div>
        <div className='vista-calendario'>
          <VistaCalendario />
        </div>
      </div>
    </div>
  );
};

export default App;

