import React, { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = ({ sessions, onDateSelect }) => {
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (sessions) {
      const dates = new Set();

      Object.keys(sessions).forEach((courseName) => {
        sessions[courseName].forEach((session) => {
          const dateStr = session.fecha_inicio.split(" ")[0];
          dates.add(dateStr);
        });
      });

      const sortedDates = Array.from(dates).sort((a, b) => {
        const [dayA, monthA, yearA] = a.split("/").map(Number);
        const [dayB, monthB, yearB] = b.split("/").map(Number);

        return (
          new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
        );
      });

      setAvailableDates(sortedDates);

      if (!selectedDate && sortedDates.length > 0) {
        setSelectedDate(sortedDates[0]);
        onDateSelect(sortedDates[0]);
      }
    }
  }, [sessions, selectedDate, onDateSelect]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const getDayOfWeek = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);

    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    return days[date.getDay()];
  };

  const getMonthName = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);

    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return months[month - 1];
  };

  return (
    <div className="calendar-container">
      <h2>Calendario:</h2>
      <div className="dates-container">
        {availableDates.map((dateStr) => {
          const [day] = dateStr.split("/");
          const dayOfWeek = getDayOfWeek(dateStr);
          const monthName = getMonthName(dateStr);

          return (
            <div
              key={dateStr}
              className={`date-card ${
                selectedDate === dateStr ? "selected" : ""
              }`}
              onClick={() => handleDateClick(dateStr)}
            >
              <div className="day-of-week">{dayOfWeek}</div>
              <div className="day">{day}</div>
              <div className="month">{monthName}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
