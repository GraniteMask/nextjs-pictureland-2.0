import { useEffect } from 'react'
import '../styles/globals.css'
import { StoreProvider } from '../utils/Store'

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    const jssStyles = document.querySelector('#jss-server-side')
    if(jssStyles){
      jssStyles.parentElement.removeChild(jssStyles)
    }
  },[]) //written to solve the problem of not applying material styling after refresh

  return (<StoreProvider><Component {...pageProps} /></StoreProvider>) 
}

export default MyApp
