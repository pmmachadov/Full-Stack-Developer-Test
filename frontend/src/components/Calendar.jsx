import React, { useState, useEffect } from "react";
import "./Calendar.css";

/**
 * Calendar Component
 * Displays available dates for sessions and allows user selection
 *
 * @param {Object} sessions - All session data from the API/JSON
 * @param {Function} onDateSelect - Callback function when a date is selected
 */
const Calendar = ({ sessions, onDateSelect }) => {
  // State to store unique dates from the sessions data
  const [availableDates, setAvailableDates] = useState([]);
  // State to track which date is currently selected
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (sessions) {
      // Extract all unique dates from sessions
      const dates = new Set();

      // Using more direct approach with arrow functions
      Object.keys(sessions).forEach((courseName) => {
        sessions[courseName].forEach((session) => {
          const dateStr = session.fecha_inicio.split(" ")[0]; // Format: "DD/MM/YYYY"
          dates.add(dateStr);
        });
      });

      // Convert to array and sort
      const sortedDates = Array.from(dates).sort((a, b) => {
        const [dayA, monthA, yearA] = a.split("/").map(Number);
        const [dayB, monthB, yearB] = b.split("/").map(Number);

        return (
          new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
        );
      });

      setAvailableDates(sortedDates);

      // Select the first date by default if none is selected
      if (!selectedDate && sortedDates.length > 0) {
        setSelectedDate(sortedDates[0]);
        onDateSelect(sortedDates[0]);
      }
    }
  }, [sessions, selectedDate, onDateSelect]);

  /**
   * Handle click on a date card
   * Updates selected date and notifies parent component
   */
  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  /**
   * Convert date string to day of week name (Spanish)
   * @param {string} dateStr - Date in format "DD/MM/YYYY"
   * @returns {string} - Day name in Spanish
   */
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

  /**
   * Convert month number to month name in Spanish
   * @param {string} dateStr - Date in format "DD/MM/YYYY"
   * @returns {string} - Month name in Spanish
   */
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
        {/* Map through available dates and create a card for each */}
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
