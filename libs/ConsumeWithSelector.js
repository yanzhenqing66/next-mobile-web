import React from "react"

const ConsumeWithSelector = (Component, context, selector) => {
  const ctx = selector(React.useContext(context))
  return React.memo(props => <Component {{ ...props, ...ctx }} />)
}

export default ConsumeWithSelector
