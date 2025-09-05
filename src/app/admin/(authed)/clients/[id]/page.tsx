
import { notFound } from 'next/navigation';
import { ClientView } from '@/components/admin/client-view';
import { Client } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';

// This is now a SERVER component
export default function Client360Page({ params }: { params: { id: string } }) {
  
  // 1. Fetch data on the server
  const filePath = path.join(process.cwd(), 'src', 'lib', 'data', 'clients.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const clients: Client[] = JSON.parse(jsonData);
  
  const client = clients.find((c) => c.id === params.id);

  // 2. Handle not found case on the server
  if (!client) {
    notFound();
  }

  // 3. Pass the data as props to the client component
  return <ClientView client={client} />;
}
