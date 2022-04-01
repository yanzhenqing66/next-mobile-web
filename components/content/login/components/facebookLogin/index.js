import React from 'react'

const fbConfig = {
  textButton: 'Login with Facebook',
  scope: 'email,user_likes',
  xfbml: true,
  cookie: true,
  fields: 'name,email,picture',
  cssClass: 'kep-login-facebook',
  version: 'v2.7',
  language: 'en_US',
  // autoLoad: true,
  uri: encodeURI('http://myapps.com')
}
function FacebookLogin({ children, resFaceBook }) {
  const onFbLogin = () => {
    FB.login(response => {
      if (response.authResponse) {
        console.log('Welcome! fb login  Fetching your information.... ');
        resFaceBook(response.authResponse)
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: fbConfig.scope, return_scopes: true })
  }

  return (
    <div onClick={onFbLogin}>
      {children}
    </div>
  )
}

export default FacebookLogin