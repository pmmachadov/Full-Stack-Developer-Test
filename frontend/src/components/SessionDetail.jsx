import { useState } from "react";
import "./SessionDetail.css";

const SessionDetail = ({ session, onClose, onEnroll }) => {
  const [selectedStudent, setSelectedStudent] = useState("");

  const students = [
    { id: 1, name: "Juan Pérez" },
    { id: 2, name: "María González" },
    { id: 3, name: "Carlos Rodríguez" },
    { id: 4, name: "Ana Martínez" },
    { id: 5, name: "Luis Torres" },
  ];

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleEnroll = () => {
    if (!selectedStudent) {
      alert("Por favor seleccione un estudiante");
      return;
    }

    const student = students.find((s) => s.id === parseInt(selectedStudent));

    onEnroll(session, student);
  };

  const formatDate = (dateTimeStr) => {
    const [dateStr, timeStr] = dateTimeStr.split(" ");
    const [day, month, year] = dateStr.split("/");

    const date = new Date(year, month - 1, day);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return date.toLocaleDateString("es-ES", options) + " a las " + timeStr;
  };

  return (
    <div className="session-detail-overlay">
      <div className="session-detail-container">
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>Curso: {session.courseName}</h2>

        <div className="session-info">
          <div className="info-group">
            <label>Fecha de inicio:</label>
            <p>{formatDate(session.fecha_inicio)}</p>
          </div>

          <div className="info-group">
            <label>Fecha de fin:</label>
            <p>{formatDate(session.fecha_fin)}</p>
          </div>

          <div className="info-group">
            <label>Cupo disponible:</label>
            <p>{session.cupo} estudiantes</p>
          </div>
        </div>

        <div className="enrollment-section">
          <h3>Asignar Estudiante:</h3>

          <div className="student-selection">
            <select
              value={selectedStudent}
              onChange={handleStudentChange}
              className="student-dropdown"
            >
              <option value="">Seleccione un estudiante</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>

            <button
              className="enroll-button"
              onClick={handleEnroll}
              disabled={!selectedStudent}
            >
              Asignar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
