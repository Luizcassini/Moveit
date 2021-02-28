import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body' | 'eye';
    description: 'string';
    amount: 'number';
}

interface ChallengesContextData {
    level: number;
    currentExperience: number; 
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelup: () => void;
    startNewChallenge: () => void;
    resetChallenge:() => void;
    completeChallenge:() => void;

}

interface ChallengesContextProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider( {children}: ChallengesContextProps ){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) *4, 2)


    function levelup(){
      setLevel(level + 1);
    }
    
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)
    }

    function resetChallenge(){
        setActiveChallenge(null);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }
        const { amount } = activeChallenge;

        //let it changes ("Deixe isso mudar" usada geralmente para dize que pode receber um novo valor no futuro)
        let finalExperience = currentExperience + amount; //aqui estamos somando o atual xp do usuario com o mount(exp) ganho
       
        if (finalExperience >= experienceToNextLevel){     //Nessa condição fazemos: se expFinal for maior ou igual a exp total pra passar de level ... Então ->
            finalExperience = finalExperience - experienceToNextLevel //...Então faça expFinal = expFinal - o total necessário ara passar de level, pois oq sobrar é o que vai ficar na barrinha pro próximo level
            levelup(); //E também será executado a function pra passar de nivel (level up)
        }

        setCurrentExperience(finalExperience); //"UseState" mudou o currentExp(Exp-atual) para a experiencia final obtida
        setActiveChallenge(null); //zera status do desafio atual
        setChallengesCompleted(challengesCompleted +1); //Adiciona +1 aos desafios completos
    }

    return(
    <ChallengesContext.Provider 
        value={ {
            level, 
            currentExperience, 
            experienceToNextLevel,
            challengesCompleted, 
            levelup,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge,
        }}
    >

        {children}
    </ChallengesContext.Provider>
    )
} 