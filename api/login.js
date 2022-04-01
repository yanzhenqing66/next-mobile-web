import {Post} from './index'

export const loginAuth = params => Post('user/linkLogin', params)
