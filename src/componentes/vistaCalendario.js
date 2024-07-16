import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { db } from '../configuracionfirebase/firebase';

const localizer = momentLocalizer(moment);

const VistaCalendario = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('Recordatorios').onSnapshot((snapshot) => {
      const eventsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.Titulo,
          start: data.FechaInicio ? data.FechaInicio.toDate() : new Date(), // Manejo del caso undefined
          end: data.FechaFin ? data.FechaFin.toDate() : new Date(),         // Manejo del caso undefined
        };
      });
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default VistaCalendario;

