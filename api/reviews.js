import { Post, GetQuery } from "."

export const getReviewTag = (id, headers) => GetQuery(`review/tagCount?productId=${id}`, headers)

export const getStoreReveiws = params => Post('review/getReviewsByStore', params)

