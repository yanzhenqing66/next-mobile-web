export const initState = {
  productList: [],
  hasMore: false,
  activeTab: '1',
  isTab: false,
  filterVisible: false,
  searchParams: {
    freeShipping: 0,
    pictureReview: 0,
    storeAge: null,
    minPrice: null,
    maxPrice: null
  },
  loading: false
}

export const shopReducer = (draft, action) => {
  const { type, data } = action
  switch (type) {
    case 'set_list':
      draft.productList.push(...data)
      break
    case 'clear_list':
      draft.productList.length = 0
      break
    case 'hasMore':
      draft.hasMore = data
      break
    case 'filterVisible':
      draft.filterVisible = data
      break
    case 'activeTab':
      draft.activeTab = data
      break
    case 'searchParams':
      draft.searchParams = { ...draft.searchParams, ...data }
      break
    case 'loading':
      draft.loading = data
      break
    default:
      break
  }
} 