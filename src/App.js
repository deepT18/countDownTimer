import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [dateTime, setDateTime] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const handleDateTimeChange = (event) => {
    const selectedDateTime = event.target.value;
    setDateTime(selectedDateTime);
    setInputDate(new Date(selectedDateTime));
  };

  const calculateTimeLeft = () => {
    const difference = Math.abs(new Date() - new Date(inputDate));
    let time = {};
  
    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return time;
  };

  const startTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      const id = setInterval(() => {
        setTime(calculateTimeLeft());
      }, 1000);
      setTimerId(id);
      // setTime(calculateTimeLeft());
    } else {
      clearInterval(timerId);
      setTimerRunning(false);
      setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimerId(null);
    }
  };

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      <div className="input">
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          value={dateTime}
          onChange={handleDateTimeChange}
        />
      </div>
      <div>
        <button onClick={startTimer}>{timerRunning ? 'Clear Timer' : 'Start'}</button>
      </div>
      <div className="timer">
        <div className="timer-display">
          <div className="box">{time.days}</div>
          <span>Days</span>
          <div className="box">{time.hours}</div>
          <span>Hours</span>
          <div className="box">{time.minutes}</div>
          <span>Minutes</span>
          <div className="box">{time.seconds}</div>
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
}
