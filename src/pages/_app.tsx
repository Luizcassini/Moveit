//NESSA PÁGINA FICAM OS COMPONENTES FIXOS DA APLICAÇÃO. ex: Um menu lateral (side bar) 
import '../styles/global.css'

import { ChallengesProvider } from '../contexts/ChallengesContext' 


function MyApp({ Component, pageProps }) {
  return(
    <ChallengesProvider>
    <Component {...pageProps} />
    </ChallengesProvider>
    ) 
}

export default MyApp
