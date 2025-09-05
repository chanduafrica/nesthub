
import { Client } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';
import { ClientsList } from '@/components/admin/clients-list';

// This is now a SERVER component
export default async function AllClientsPage() {
  
  // 1. Fetch data on the server
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'clients.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const clients: Client[] = JSON.parse(jsonData);

  // 2. Pass the data as props to the client component
  return <ClientsList initialClients={clients} />;
}
