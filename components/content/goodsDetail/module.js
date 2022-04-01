import { createContext, useContext } from "react"

export const ProductContext = createContext()

export const useDetailState = () => {
  return useContext(ProductContext)
}

export const productInitState = {
  optionVisible: false,
  activeHeader: false,
}

export const productReducer = (draft, action) => {
  const { type, data } = action
  switch (type) {
    case 'setOptionVisible': return void (draft.optionVisible = data)
    case 'setActiveHeader': return void (draft.activeHeader = data)
    default: return productInitState
  }
}