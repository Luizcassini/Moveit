import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelupModal:() => void;   

}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider( {
    children,
    ...rest
}: ChallengesProviderProps ){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) *4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level)); //String podia ser level.ToString()
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelup(){
      setLevel(level + 1);
      setIsLevelModalOpen(true);
    }

    function closeLevelupModal(){
        setIsLevelModalOpen(false);
    }
    
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
            body: `Valendo ${challenge.amount}xp`
            })
        }
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
            closeLevelupModal,
        }}
    >

        {children}
    
        {isLevelModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
    )
} 