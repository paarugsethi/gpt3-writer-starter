import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// Handle the CORS preflight request
export default async function handler(req, res) {
  await cors(req, res);

  // Return a dummy response or handle the preflight request as needed
  res.status(200).json({ message: 'CORS preflight request handled' });
}