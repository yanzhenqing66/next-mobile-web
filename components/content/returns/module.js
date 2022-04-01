import { createContext, useContext } from 'react'

export const ReturnContext = createContext()

export const useRefundContext = () => {
  return useContext(ReturnContext)
}