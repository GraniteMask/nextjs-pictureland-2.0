import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SnackbarProvider } from 'notistack'
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
//   const initialOptions = {
//     "client-id": "test",
//     currency: "USD",
//     intent: "capture",
//     "data-client-token": "abc123xyz==",
// };
  return (
  <SnackbarProvider anchorOrigin={{vertical: 'top', horizontal:'center'}}>
    <StoreProvider>
      <PayPalScriptProvider deferLoading={true} options={{ "client-id": process.env.PAYPAL_CLIENT_ID }}>
        <Component {...pageProps} />
      </PayPalScriptProvider>   
    </StoreProvider>
  </SnackbarProvider>
  ) 
}

export default MyApp
