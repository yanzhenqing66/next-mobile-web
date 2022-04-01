import { AUTH_TOKEN, DEL_TOKEN } from '../constant'

export const auth_token = data => ({type: AUTH_TOKEN, data})
export const del_token = () => ({type: DEL_TOKEN})