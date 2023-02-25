import React from 'react'
import { useAuth } from '../../contexts/auth_context'

export const ExamplePage = () => {
  const { authData, signOut } = useAuth()

  return (
    <div
      style={{
        width: '100vw',
        background: '#222',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh'
      }}
    >
      <span
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#ddd'
        }}
      >
        {'(^_^)'}
      </span>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#ddd'
        }}
      >
        こんにちは {authData?.user.username}
      </h1>
      <button
        style={{
          marginTop: 30,
          fontSize: 16,
          borderRadius: 10,
          width: 'min(300px, 90%)',
          padding: 5,
          fontWeight: 'bold',
          background: '#666'
        }}
        onClick={signOut}
      >
        近い
      </button>
    </div>
  )
}
