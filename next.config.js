/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID:
      '96305492305-bout7jov9hgpl0uc9itmv8b7t86sc4ua.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    NEXTAUTH_URL: 'http://localhost:3000/',
    NEXTAUTH_URL_INTERNAL: 'http://localhost:3000/',
    NEXTAUTH_SECRET: 'c36cefe4d56653b1c615f4e0fbe580e3',
  },
};

module.exports = nextConfig;
