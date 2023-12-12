import { NextApiHandler } from 'next';
import { google } from 'next-auth/client';

const handler: NextApiHandler = async (req, res) => {
  try {
    await google.handleCallback(req, res, { basePath: '/api/auth' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error handling Google callback' });
  }
};

export default handler;
