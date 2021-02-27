import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css"

let countdownTimeout : NodeJS.Timeout;

export function Countdown(){
    const [time, setTime] = useState(0.1 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60) //faz a variavel minuto usando variavel time divido por 60(segundos que da 1min), em seguida arredondando-a pra baixo (Math.floor), ou seja: caso time = 24:47(min:seg) o resultado seria 24.

    const seconds = time % 60 //O sinal de % retorna o resto de um valor, ou seja, nesse caso o resto da variavel time será sempre os segundos.

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); //String(minutes) Converte o numero (minutes) para string, o split('') ja que não foi passado nenhum caracter (''),ele corta/divide todos caracteres dessa string 
    //(EX: string(25) faz 25 virar "25", split("25") corta para "2" "5")
    //O padStart(2, '0') verifica se a string não tem mais de 2 caracteres, caso não, ele preenche pra esquerda (pad) com o valor "0"

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountDown(){
        setIsActive(true);
    }

    function resetCountDown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if (isActive && time > 0){
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if(isActive && time === 0 ){
            setHasFinished(true);
            setIsActive(false);
        }
    }, [isActive, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                  disabled
                  className={styles.countdownButton}
                 >
                Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                    <button 
                      type="button" 
                      className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                      onClick={resetCountDown}
                     >
                      Abandonar Ciclo
                    </button>
                    ) : (
                    <button 
                      type="button" 
                      className={styles.countdownButton}
                      onClick={startCountDown}
                    >
                      Iniciar um ciclo
                    </button>
                    ) }
                </>
            )}
        </div>
    );
}