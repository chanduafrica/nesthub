
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug === 'string') {
    return res.status(400).json({ error: 'Invalid path' });
  }

  const fileName = slug.join('/') + '.json';
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', fileName);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ error: 'Data not found' });
  }
}
