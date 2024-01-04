import "./index.css";
import pomoImage from "./pomo-image.png";
import alarmSound from "./alarm.wav";
import { useState, useEffect } from "react";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [pause, setPause] = useState(5);
  const [session, setSession] = useState(25);
  const [seconds, setSeconds] = useState("0");
  const [minutes, setMinutes] = useState(25);
  const [round, setRound] = useState(false);
  const notification = document.getElementById("beep");

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds, minutes, isRunning]);

  if (minutes === 0 && seconds === 0) {
    notification.play();
    setTimeout(() => {
      if (!round) {
        setRound(true);
        setMinutes(pause);
        setIsRunning(true);
      } else {
        setRound(false);
        setMinutes(session);
        setIsRunning(true);
      }
    }, "1000");
  }

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };
  const reset = () => {
    setIsRunning(false);
    setRound(false);
    setPause(5);
    setMinutes(25);
    setSession(25);
    setSeconds("0");
    notification.pause();
    notification.src = alarmSound;
  };

  return (
    <>
      <div className="container">
        <img src={pomoImage} className="pomo-image"></img>
        <div className="pomodoro-info">
          <div className="about">
            The Pomodoro Technique is a time management method developed by
            Francesco Cirillo in the late 1980s. It uses a kitchen timer to
            break work into intervals, typically 25 minutes in length, separated
            by short breaks. Each interval is known as a pomodoro, from the
            Italian word for tomato, after the tomato-shaped kitchen timer
            Cirillo used as a university student.
          </div>
          <div className="how-to-use-it">
            <p>The original technique has six steps:</p>
            <ol>
              <li>Decide on the task to be done.</li>
              <li>Set the Pomodoro timer (typically for 25 minutes).</li>
              <li>Work on the task.</li>
              <li>
                End work when the timer rings and take a short break (typically
                5–10 minutes).
              </li>
              <li>
                Go back to Step 2 and repeat until you complete four pomodoros.
              </li>
              <li>
                After four pomodoros are done, take a long break (typically 20
                to 30 minutes) instead of a short break. Once the long break is
                finished, return to step 2.
              </li>
            </ol>
          </div>
        </div>
        <div className="pomodoro">
          <div className="lengths">
            <div id="break-label">
              <h3>Break Length</h3>
              <div className="length-control">
                <i
                  className="fa-solid fa-angle-up"
                  onClick={() => (pause < 60 ? setPause(pause + 1) : pause)}
                  id="break-increment"
                ></i>
                <div className="show-state" id="break-length">
                  {pause}
                </div>
                <i
                  className="fa-solid fa-angle-down"
                  onClick={() => (pause > 1 ? setPause(pause - 1) : session)}
                  id="break-decrement"
                ></i>
              </div>
            </div>
            <div id="session-label">
              <h3>Session Length</h3>
              <div className="length-control">
                <i
                  className="fa-solid fa-angle-up"
                  onClick={() => {
                    if (session < 60) {
                      setSession(session + 1);
                      setMinutes(minutes + 1);
                    } else {
                      return session, minutes;
                    }
                  }}
                  id="session-increment"
                ></i>
                <div className="show-state" id="session-length">
                  {session}
                </div>
                <i
                  className="fa-solid fa-angle-down"
                  onClick={() => {
                    session > 1 ? setSession(session - 1) : session,
                      minutes > 1 ? setMinutes(minutes - 1) : minutes;
                  }}
                  id="session-decrement"
                ></i>
              </div>
            </div>
          </div>
          <div className="session" id="timer-label">
            {round ? <h4>Break</h4> : <h4>Session</h4>}
            <audio id="beep" src={alarmSound}></audio>

            <div className="main-session" id="time-left">
              {minutes > 9 ? minutes : "0" + minutes}:
              {seconds > 9 ? seconds : "0" + seconds}
            </div>
          </div>
          <div className="play-pause">
            <i
              className="fa-solid fa-play fa-special"
              id="start_stop"
              onClick={startAndStop}
            ></i>
            <i
              className="fa-solid fa-pause fa-special"
              onClick={startAndStop}
            ></i>
            <i
              className="fa-solid fa-arrows-rotate fa-special"
              id="reset"
              onClick={reset}
            ></i>
          </div>
          <div className="footer">
            <p>Made By</p>
            <p>Sveto :)</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
