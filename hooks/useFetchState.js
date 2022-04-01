import { useCallback, useEffect, useRef, useState } from 'react'

function useFetchState(...props) {
  const focus = useRef()
  const [data, setState] = useState(...props)
  useEffect(() => {
    focus.current = true
    return () => (focus.current = false)
  }, [])
  const setData = useCallback((...params) => {
    focus.current && setState(...params)
  }, [])
  return [data, setData]
}

export default useFetchState