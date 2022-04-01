import {Get, Post} from './index'

// 修改用户信息
export const updateUser = params => Post('user/update', params)
export const uptHeadPic = params => Post('user/updateHeadPicture', params)

// 更换背景图
export const uptBackgroundPic = params => Post(`user/updateBackgroundPicture`, params)

// 获取用户信息
export const getUserDetail = userId => Post(`user/detail?userId=${userId}`)

// 获取用户IM
export const getStoreIm = params => Get(`imessage/user/getUsernameByStoreId?storeId=${params}`)