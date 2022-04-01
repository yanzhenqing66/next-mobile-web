import { Get, Post } from ".";

export const getPreReturnInfoApi = params => Post('refund/preSubmit', params)

// 上传退款图片
export const uploadRefundPic = params => Post('refund/uploadImage', params)

export const submitRefund = params => Post('refund/submit', params)

export const getRefundListApi = () => Get('refund/list')

export const getRedundDetailApi = params => Post('refund/detail', params)

// 取消退款
export const cancelRefund = params => Post('refund/cancelRefundApply', params)

// 提交物流单号
export const updTrackNum = params => Post('refund/fillCourier', params)