import { useState, useEffect, useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/Countdown.module.css"



export function Countdown(){
    const {
        minutes, 
        seconds, 
        hasFinished, 
        isActive, 
        startCountDown, 
        resetCountDown
    } = useContext(CountdownContext) 

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split(''); //String(minutes) Converte o numero (minutes) para string, o split('') ja que não foi passado nenhum caracter (''),ele corta/divide todos caracteres dessa string 
    //(EX: string(25) faz 25 virar "25", split("25") corta para "2" "5")
    //O padStart(2, '0') verifica se a string não tem mais de 2 caracteres, caso não, ele preenche pra esquerda (pad) com o valor "0"

    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');    

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