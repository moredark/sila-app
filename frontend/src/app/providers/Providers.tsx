import React, { FC } from 'react'
import { ReactQueryProvider } from './ReactQueryProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

interface Props {
  children: React.ReactNode
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
        {children}
      </GoogleOAuthProvider>
    </ReactQueryProvider>
  )
}

export default Providers
