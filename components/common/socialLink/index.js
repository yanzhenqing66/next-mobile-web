import Link from 'next/link'
const socials = [
  { id: 1, href: 'https://www.facebook.com/PoppyShoppingApps', title: 'PoppyShopping on facebook' },
  { id: 2, href: 'https://www.instagram.com/poppyshoppingapp/', title: 'PoppyShopping on instagram' },
  { id: 3, href: 'https://www.pinterest.com/Poppyshopping/', title: 'PoppyShopping on pinterest' },
  { id: 4, href: 'https://twitter.com/poppysellertips', title: 'PoppyShopping on twitter' },
  { id: 5, href: 'https://www.quora.com/profile/Poppy-Seller-Success?q=poppy', title: 'PoppyShopping on quora' },
  { id: 6, href: 'https://www.linkedin.com/company/poppymobileshopping/', title: 'PoppyShopping on linkedin' },
  { id: 7, href: 'https://play.google.com/store/apps/details?id=com.poppyapps', title: 'Download on the App Store' },
  { id: 8, href: 'https://apps.apple.com/cn/app/id1589566752', title: 'Get it on Google aly' },
];

const socialLink = () => {
  return (
    <div>
      <ul>
        {socials.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>
              <a title={item.title}></a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default socialLink