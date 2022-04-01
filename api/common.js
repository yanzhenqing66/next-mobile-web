import { Get, Post } from "."

// 文件夹1 店铺2 状态
export const getFollowStatus = params => Post(`userFollow/status?${params}`)
export const unFollow = params => Post(`userFollow/cancel`, params)
export const following = params => Post(`userFollow/follow`, params)

// 列表数据上报
export const getListViewlog = params => Post(`log/listViewLog`, params)
// 详情数据上报
export const getPageViewLog = params => Post(`log/pageViewLog`, params)
// 用户信息上报
export const logEvent = params => Post(`log/log`, params)

// 查询短链
export const getLink = id => Get(`shortLinkSet/findByShortKey?shortKey=${id}`)

// 幂等性处理
export const createUsn = () => Get(`user/createUsn`)

// 物流商
export const getExpress = () => Get('tracking/getAllCouriersByC')