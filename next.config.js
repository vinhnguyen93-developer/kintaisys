/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID:
      '96305492305-6hb1a4r04oagd66ttrgtl4fjnrs3383n.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    NEXTAUTH_URL: 'https://kintaisys.vercel.app/',
    NEXTAUTH_URL_INTERNAL: 'https://kintaisys.vercel.app/',
    NEXTAUTH_SECRET: 'c36cefe4d56653b1c615f4e0fbe580e3',
    NEXT_PUBLIC_API_URL: 'https://sheets.googleapis.com/v4/spreadsheets',
    SHEET_ID: '1QMqKfjVt4U_so4LyltUQaXbyOwupQuppIqkZ7hYH2yM',
    API_KEY: 'AIzaSyDQNX5_VnoIak2aQa8LlDWJE_z5MD6S8m8',
  },
};

module.exports = nextConfig;
