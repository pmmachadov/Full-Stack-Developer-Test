import "./SessionList.css";

const SessionList = ({ sessions, selectedDate, onSessionSelect }) => {
  const getSessionsForDate = () => {
    const filteredSessions = [];

    if (!selectedDate) return filteredSessions;

    Object.keys(sessions).forEach((courseName) => {
      const courseSessions = sessions[courseName].filter((session) => {
        return session.fecha_inicio.split(" ")[0] === selectedDate;
      });

      if (courseSessions.length > 0) {
        courseSessions.forEach((session) => {
          filteredSessions.push({
            ...session,
            courseName,
          });
        });
      }
    });

    return filteredSessions.sort((a, b) => {
      const timeA = a.fecha_inicio.split(" ")[1];
      const timeB = b.fecha_inicio.split(" ")[1];
      return timeA.localeCompare(timeB);
    });
  };

  const sessionsForDate = getSessionsForDate();

  const formatTimeRange = (startDateTime, endDateTime) => {
    const startTime = startDateTime.split(" ")[1];
    const endTime = endDateTime.split(" ")[1];
    return `${startTime} a ${endTime}`;
  };

  return (
    <div className="sessions-list-container">
      <h2>Sesiones disponibles:</h2>

      {sessionsForDate.length === 0 ? (
        <p className="no-sessions">
          No hay sesiones disponibles para esta fecha.
        </p>
      ) : (
        <div className="sessions-grid">
          {sessionsForDate.map((session, index) => (
            <div
              key={`session-${selectedDate}-${session.courseName}-${index}`}
              className="session-card"
              onClick={() => onSessionSelect(session)}
            >
              <div className="session-title">{session.courseName}</div>
              <div className="session-time">
                {formatTimeRange(session.fecha_inicio, session.fecha_fin)}
              </div>
              <div className="session-capacity">
                Cupo: <span className="capacity-number">{session.cupo}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SessionList;
