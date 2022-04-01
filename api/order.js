import { Get } from ".";


export const getOrderApi = params => Get(`order/list?${params}`)

export const getOrderDetailApi = id => Get(`order/detail?orderNo=${id}`)

// 物流
export const getTrackApi = id => Get(`tracking/getTrackDetail?orderNo=${id}&loginUserId`)

export const getOrderItem = id => Get(`order/orderInfo?orderNo=${id}`)

// 评论
export const getToReviewApi = url => Get(url)