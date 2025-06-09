import { useState, useEffect } from "react";
import Calendar from "./components/Calendar.jsx";
import "./App.css";

function App() {
  const [sessions, setSessions] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetch("/sesiones.json")
      .then((response) => response.json())
      .then((data) => {
        setSessions(data.sesiones);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
        setLoading(false);
      });
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    console.log("Selected date:", date);
  };

  if (loading) {
    return <div className="loading">Cargando sesiones...</div>;
  }

  return (
    <div className="app-container">
      <h1>Sistema de Sesiones Académicas</h1>
      <Calendar sessions={sessions} onDateSelect={handleDateSelect} />

      {selectedDate && (
        <div className="sessions-for-date">
          <h2>Sesiones disponibles:</h2>
          <p>Sesiones para el {selectedDate} (implementar)</p>
        </div>
      )}
    </div>
  );
}

export default App;
