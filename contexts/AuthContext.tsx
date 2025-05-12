import { apiFetch } from '@/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  token: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadToken = async () => {
      const stored = await AsyncStorage.getItem('jwt')
      setToken(stored)
      setLoading(false)
    }
    loadToken()
  }, [])

  useEffect(() => {
    console.log('Token: ' + token)
  }, [token])

  const login = async (username: string, password: string) => {
    
    const response = await apiFetch<{ token: string }>('/auth/login', {
      method: 'POST',
      body: { username, password },
    });

    setToken(response.token)
  }

  const logout = async () => {
    await AsyncStorage.removeItem('jwt')
    setToken(null)
  }

  if (loading) return null

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}