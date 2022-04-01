import React from 'react'
import GoogleLogin from 'react-google-login'

const googleLoginId = '734992546913-rtjc6noipa842lf4k9cgjije8a9eo5b9.apps.googleusercontent.com'

function GoogleLoginComp({children, resGoogle, onAutoLoadFinished}) {
  return (
    <GoogleLogin
      clientId={googleLoginId}
      onSuccess={resGoogle}
      onFailure={resGoogle}
      onAutoLoadFinished={onAutoLoadFinished}
      render={renderProps => (
        <div onClick={renderProps.onClick} disabled={renderProps.disabled}>
          {children}
        </div>
      )}
    />
  )
}

export default GoogleLoginComp