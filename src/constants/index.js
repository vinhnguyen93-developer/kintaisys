// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();
import { publicRuntimeConfig } from '../../next.config'

console.log('publicRuntimeConfig', publicRuntimeConfig);

export const GOOGLE_CLIENT_ID = publicRuntimeConfig.GOOGLE_CLIENT_ID
export const GOOGLE_CLIENT_SECRET = publicRuntimeConfig.GOOGLE_CLIENT_SECRET
export const NEXTAUTH_URL = publicRuntimeConfig.NEXTAUTH_URL
export const NEXT_PUBLIC_API_URL = publicRuntimeConfig.NEXT_PUBLIC_API_URL
