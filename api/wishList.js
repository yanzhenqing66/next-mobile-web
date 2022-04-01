import { Get, GetQuery, Post } from './index'

// wishlist
export const getFavorList = params => Get(`userFolder/list?${params}`)
export const getDiscover = params => Get(`userFolder/center?${params}`)
export const getFolderInfo = id => Get(`userFolder/getFolder?folderId=${id}`)
export const getExtendInfo = (id, headers) => GetQuery(`userFolder/extendInfo?folderId=${id}`, headers)
export const getFavorDetail = params => GetQuery(`userFolder/detail?${params}`)
export const updFavorCard = params => Post('userFolder/update', params)
export const delFavorCard = params => Post('userFolder/delete', params)
export const createFavorCard = params => Post('userFolder/create', params)
export const getWishFirstPic = (params, headers) => GetQuery(`userFolder/detail?${params}`, headers)

// recent
export const getRecentList = params => Get(`userBrowsingHistory/list?${params}`)
export const delRecent = params => Post(`userBrowsingHistory/delete`, params)

// shop
export const getFollowList = params => Get(`userFollow/storeList?${params}`)
export const getStoreDetail = (id, headers) => GetQuery(`store/detail?id=${id}`, headers)
export const getStoreStatus = id => Get(`userFollow/storeStatus?storeId=${id}`)
export const getFollowCount = id => Get(`userFollow/storeCount?storeId=${id}`)

export const uplaodGoodsUrls = params => Post(`userFolder/uploadProductUrl`, params)

// 标签
export const getStoreLabel = id => Get(`store/labelNameList?id=${id}`)