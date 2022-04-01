import {Get, GetQuery, Post} from './index'

export const getDetailData = (params, headers) => Get(`/product/detail`, params, headers)

export const getWishList = id => Get(`userFolder/simpleList?contentId=${id}`)

export const getCollectStatus = id => Get(`userFolder/product/collectStatus?productId=${id}`)
export const updFoldGood = params => Post('userFolder/bindAndUpdate', params)

export const getDetailView = (params, headers) => GetQuery(`review/priorityList?${params}`, headers)

export const getReviewList = params => Get(`review/list?${params}`)

export const getRelated = params => GetQuery(`product/related?${params}`)

// 同店铺商品推荐
export const getBrandGoods = params => Get(`product/innerRelated?${params}`)
