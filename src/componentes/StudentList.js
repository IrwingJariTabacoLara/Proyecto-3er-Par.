import React, { useEffect, useState } from 'react';
import { db } from '../configuracionfirebase/firebase';
import './lista.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [expandedEventIds, setExpandedEventIds] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('Recordatorios').onSnapshot((snapshot) => {
      const eventsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          Titulo: data.Titulo,
          FechaInicio: data.FechaInicio ? data.FechaInicio.toDate().toLocaleString() : 'No date',
          FechaFin: data.FechaFin ? data.FechaFin.toDate().toLocaleString() : 'No date',
          Descripcion: data.Descripcion,
        };
      });
      setEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  const toggleExpand = (id) => {
    setExpandedEventIds((prevExpandedEventIds) =>
      prevExpandedEventIds.includes(id)
        ? prevExpandedEventIds.filter(eventId => eventId !== id)
        : [...prevExpandedEventIds, id]
    );
  };

  const deleteEvent = async (id) => {
    try {
      await db.collection('Recordatorios').doc(id).delete();
      alert('Evento eliminado exitosamente');
    } catch (error) {
      console.error('Error deleting document: ', error);
      alert('Error al eliminar el evento');
    }
  };

  return (
    <div className='eventos'>
      <h2>Lista de Eventos</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id} style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{event.Titulo}</h3>
              <button
                onClick={() => toggleExpand(event.id)}
                className={expandedEventIds.includes(event.id) ? 'btn-expanded' : 'btn-collapsed'}
                style={{ marginLeft: '10px' }}
              >
                {expandedEventIds.includes(event.id) ? '-' : '+'}
              </button>
              <button
                onClick={() => deleteEvent(event.id)}
                className="btn-delete"
                style={{ marginLeft: '10px' }}
              >
                Eliminar
              </button>
            </div>
            {expandedEventIds.includes(event.id) && (
              <div style={{ marginTop: '5px' }}>
                <p><strong>Inicio:</strong> {event.FechaInicio}</p>
                <p><strong>Término:</strong> {event.FechaFin}</p>
                <p>{event.Descripcion}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
