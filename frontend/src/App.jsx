import { useState, useEffect } from "react";
import Calendar from "./components/Calendar.jsx";
import SessionList from "./components/SessionList.jsx";
import SessionDetail from "./components/SessionDetail.jsx";
import "./App.css";

function App() {
  const [sessions, setSessions] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

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
    setSelectedSession(null);
  };

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  const handleCloseDetail = () => {
    setSelectedSession(null);
  };

  const handleEnroll = (session, student) => {
    const newEnrollment = {
      sessionId: `${session.courseName}-${session.fecha_inicio}`,
      studentId: student.id,
      studentName: student.name,
      courseName: session.courseName,
      fecha: session.fecha_inicio,
    };

    const alreadyEnrolled = enrollments.some(
      (enrollment) =>
        enrollment.sessionId === newEnrollment.sessionId &&
        enrollment.studentId === newEnrollment.studentId
    );

    if (alreadyEnrolled) {
      alert(`${student.name} ya está inscrito en esta sesión`);
      return;
    }

    setEnrollments([...enrollments, newEnrollment]);

    alert(`${student.name} ha sido asignado a ${session.courseName}`);

    setSelectedSession(null);
  };

  if (loading) {
    return <div className="loading">Cargando sesiones...</div>;
  }

  return (
    <div className="app-container">
      <h1>Sistema de Sesiones Académicas</h1>

      <Calendar sessions={sessions} onDateSelect={handleDateSelect} />

      {selectedDate && (
        <SessionList
          sessions={sessions}
          selectedDate={selectedDate}
          onSessionSelect={handleSessionSelect}
        />
      )}

      {selectedSession && (
        <SessionDetail
          session={selectedSession}
          onClose={handleCloseDetail}
          onEnroll={handleEnroll}
        />
      )}
    </div>
  );
}

export default App;
