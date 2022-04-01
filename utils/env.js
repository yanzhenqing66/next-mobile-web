

const envFlag = process.env.NEXT_PUBLIC_DOMAIN_ENV === 'production' ? true : false
const env = process.env.NEXT_PUBLIC_DOMAIN_ENV
export {envFlag, env}