
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import Nabar from "@/components/Nabar"

export default function App({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <Nabar/>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}