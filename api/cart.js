import {Get, GetQuery, Post} from './index'

// 购物车
export const getCartListApi = () => Get('shoppingCart/list')
export const addCartApi = params => Post('shoppingCart/add', params)
export const updCartSelect = params => Post('shoppingCart/changeSelected', params)
export const updCartNum = params => Post('shoppingCart/updateSkuNum', params)
export const delCartGoods = params => Post('shoppingCart/delete', params)

// 地址
export const getAddressList = () => Get('userAddress/list')
export const getStateList = () => Get('country/getUSCountryList')
export const addAddress = params => Post('userAddress/add', params)
export const updAddress = params => Post('userAddress/update', params)
export const delAddress = params => Post('userAddress/delete', params)
export const getAddressItem = id => Get(`userAddress/detail?id=${id}`)

// 银行卡支付
export const getPayCardList = () => Get('payment/paymentList?type=1')
export const addPayCard = params => Post('payment/userAddPayment', params)
export const updPayCard = params => Post('payment/paymentUpdate', params)
export const delPayCard = id => Post(`payment/deletedPayment?id=${id}`)
export const getPayCardDetail = id => Post(`payment/paymentDetail?id=${id}`)

// 支付订单页
export const getCheckoutApi = url => GetQuery(url)

// buy now
export const buyNowApi = params => Post('order/product/preSubmitOrder', params)

export const createOrder = (params, header) => Post('order/submitOrder', params, header)
export const stripePay = params => Post(`stripe/paymentWeb`, params)
export const stripeRes = params => Post(`stripe/capturePayment`, params)
export const paypalResSuccess = params => Post(`paypal/payment`, params)
export const paypalResFiled = id => Post(`paypal/paymentFailed?tradeNo=${id}`)
