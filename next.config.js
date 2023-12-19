/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_CLIENT_ID:
      '96305492305-fo21k488mu622784qs2p9ssrcid86vih.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    NEXTAUTH_URL: 'https://kintaisys-vinhs-projects-52857548.vercel.app',
    NEXTAUTH_URL_INTERNAL:
      'https://kintaisys-vinhs-projects-52857548.vercel.app',
    NEXTAUTH_SECRET: 'c36cefe4d56653b1c615f4e0fbe580e3',
    NEXT_PUBLIC_API_URL: 'https://sheets.googleapis.com/v4/spreadsheets',
    SHEET_ID: '12KAc4XeZcQ-mUTgU37Hu0fVEXPyl7zKTmn5NmHWq2Tk',
    API_KEY: 'AIzaSyB1OJOr1XaF72YMN70hPgHNlhPd29AP6PE',
  },
};

module.exports = nextConfig;
