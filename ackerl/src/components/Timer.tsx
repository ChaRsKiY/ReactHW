import {useState, useEffect, FC} from 'react';
import styles from './timer.module.css';

const AdvancedTimer: FC = () => {
  const [time, setTime] = useState<number>(5);
  const [inputTime, setInputTime] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning, time]);

  useEffect(() => {
    if(time === 0) {
      setIsRunning(false);
      setTimeout(() => alert("Timer!"), 100);
    }
  }, [time]);

  const handleStart = () => {
    const newTime = parseInt(inputTime, 10);
    if (!isNaN(newTime) && newTime > 0) {
      setTime(newTime);
      setIsRunning(true);
    } else if(time > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setInputTime('');
    setTime(Number(inputTime) || 5);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
      <div className={styles.maincontainer}>
        <div className={styles.simpletimer}>Timer</div>
        <div className={styles.time}>{formatTime(time)}</div>
        <div className={styles.btncontainer}>
        <button className={styles.button + " " + String(time === 0 && styles.disabled)} onClick={handlePause} disabled={time === 0}>
          {isRunning ? "Pause" : "Resume"}
        </button>
          <button className={styles.button + " " + styles.mainbtn + " " + String(isRunning && styles.disabled)} onClick={handleStart} disabled={isRunning}>
            Start
          </button>
        <button className={styles.button  + " " + String(isRunning && styles.disabled)} onClick={handleReset} disabled={isRunning}>
          Reset
        </button>
        </div>
        <div className={styles.inputcontainer}>
          <input type="number" value={inputTime} onChange={(e) => setInputTime(e.target.value)} />
        </div>
      </div>
  );
};

export default AdvancedTimer;
