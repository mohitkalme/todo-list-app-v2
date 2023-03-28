import '@/styles/globals.css'
import 'intro.js/introjs.css'
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'

// Create a client
const queryClient = new QueryClient()

//react-toastify
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {


  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <>
          <Component {...pageProps} />

          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </>

      </SessionProvider>
    </QueryClientProvider>
  )
}
