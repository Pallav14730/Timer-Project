import { useRef, useState } from "react"
import ResultModal from "./ResultModal";


export default function TimerChallenges({title, targetTime}){
    const timer = useRef();
    const dialog = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)
    const timerisActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if(timeRemaining <= 0){
        clearInterval(timer.current)
        dialog.current.open();
    }

 function handleReset(){
    setTimeRemaining(targetTime * 1000)
 }

    function handleStart(){
       timer.current =  setInterval(() => {
           setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10)
    }

    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current)
    }
    return (
        <>
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">{targetTime} second {targetTime > 1 ? 's' : '' }</p>
            <p>
                <button onClick={timerisActive ? handleStop : handleStart}>{timerisActive ? 'stop' : 'start'} Challenge</button>
            </p>
            <p className={timerisActive ? 'acitve' : ''}>
            {timerisActive ? 'Time is running....' : 'Timer inactive'}
            </p>
        </section>
        </>
    )
}