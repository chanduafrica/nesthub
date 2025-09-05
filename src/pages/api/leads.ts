
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Define the path to the data directory
const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { leadType, data } = req.body;

    let filePath;
    switch (leadType) {
      case 'viewing':
        filePath = path.join(dataDirectory, 'viewing-requests.json');
        break;
      case 'mortgage':
        filePath = path.join(dataDirectory, 'mortgage-leads.json');
        break;
      case 'insurance':
        filePath = path.join(dataDirectory, 'insurance-quotes.json');
        break;
      default:
        return res.status(400).json({ message: 'Invalid lead type' });
    }

    // Read the existing data
    let fileData: any[] = [];
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        fileData = JSON.parse(fileContents);
    } catch (error) {
        // File might not exist yet, which is okay
        console.log(`File not found for ${leadType}, creating a new one.`);
    }

    // Add new data with an ID and timestamp
    const newRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      submittedAt: new Date().toISOString(),
      ...data,
    };
    fileData.push(newRecord);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2));

    return res.status(200).json({ message: 'Lead saved successfully', record: newRecord });
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof Error) {
        return res.status(500).json({ message: 'Error saving lead', error: error.message });
    }
    return res.status(500).json({ message: 'An unknown error occurred' });
  }
}
