import axios from './axiosClient'
import type { SignInPayload, SignUpPayload, AuthResponse } from '../types'

export const signIn = async (payload: SignInPayload) => {
  const { data } = await axios.post<AuthResponse>('/user/signin', payload)
  return data
}

export const signUp = async (payload: SignUpPayload) => {
  const { data } = await axios.post<AuthResponse>('/user/signup', payload)
  return data
}