import styled from '@emotion/styled'
import rem from '@/utils/rem'

const FooterC = styled.footer`
  position: fixed;
  bottom: ${rem(10)};
  line-height: ${rem(18)};
  color: #4E4E4E;
  font-weight: 400;
  padding-right: ${rem(20)};
`

const A = styled.a`
  font-weight: 500;
  color: #222;
  text-decoration: underline;

  &:hover {
    color: #F93A3A;
  }
`

function Footer() {
  return (
    <FooterC>
      By continue you agree to our
      <A href='https://active.poppyapps.com/userAgreement' target={'_blank'}>T&Cs</A>.
      We use your data to offer you a personalized experience.
      <A href='https://active.poppyapps.com/privacyPolicy' target={'_blank'}>Find out more</A>.
    </FooterC>
  )
}

export default Footer