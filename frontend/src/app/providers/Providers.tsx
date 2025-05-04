import React, { FC } from 'react'
import { ReactQueryProvider } from './ReactQueryProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { I18Provider } from './I18Provider'

interface Props {
  children: React.ReactNode
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <I18Provider>
      <ReactQueryProvider>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
          {children}
        </GoogleOAuthProvider>
      </ReactQueryProvider>
    </I18Provider>
  )
}

export default Providers
