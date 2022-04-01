import { Get, GetQuery, Post } from './index'

export const getHomeLabel = (headers) => GetQuery('index/index', headers)

export const getProductList = (params, headers) => Post('product/list', params)

export const getGoodsList = params => Post(`product/index`, params)

// 搜索
export const getSearchList = params => Get(`search/suggest?${params}`)

export const getHotSearch = (headers) => GetQuery(`search/top?curPage=1&pageSize=10`, headers)

export const getHistorySearch = () => Get(`search/recent`)

export const getBrandList = params => Post(`store/brandList`, params)

// 删除搜索历史
export const delSearchHis = () => Post('search/clear') 
