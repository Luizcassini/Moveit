import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout : NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps){
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60) //faz a variavel minuto usando variavel time divido por 60(segundos que da 1min), em seguida arredondando-a pra baixo (Math.floor), ou seja: caso time = 24:47(min:seg) o resultado seria 24.
    const seconds = time % 60 //O sinal de % retorna o resto de um valor, ou seja, nesse caso o resto da variavel time será sempre os segundos.

    function startCountDown(){
        setIsActive(true);
    }

    function resetCountDown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(1 * 60); 
    }

    useEffect(() => {
        if (isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1); 
            }, 1000);
        } else if(isActive && time === 0 ){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return(
        <CountdownContext.Provider 
        value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountDown,
            resetCountDown,
        }}
        >
            {children} 
        </CountdownContext.Provider>
    ) 
}
