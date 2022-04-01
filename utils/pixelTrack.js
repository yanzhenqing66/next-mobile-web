import { logEvent } from "@/api/common"
import createDeviceId from "./createDeviceId"
import store from '@/store'

export const reportLog = (props) => {
  const Store = store.getState()
  const { id } = Store.user
  
  const { event, page, item_id, tab_id, item_views, start_ts, end_ts, button } = props
  const params = {
    event: event || 'click',
    data: {
      page: page || 'feed',
      item_id,
      tab_id,
      item_views,
      start_ts,
      end_ts,
      button,
      platform_id: 'web',
      device_id: createDeviceId(),
      id: id || ''
    }
  }
  logEvent(params).then(() => { }).catch(() => { })
}

export function pinTrack(track, info={}) {
  pintrk('track', track, info) 
}

export function fbTrack(track, info={}) {
  fbq('track', track, info)
}

export function adEvent(token, info={}) {
  Adjust.trackEvent({
    eventToken: token,
    ...info
  })
}
