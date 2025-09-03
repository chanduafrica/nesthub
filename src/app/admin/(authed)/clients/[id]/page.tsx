
import { notFound } from 'next/navigation';
import { mockClients } from '@/lib/mock-data';
import { ClientView } from '@/components/admin/client-view';

// This is now a SERVER component
export default function Client360Page({ params }: { params: { id: string } }) {
  
  // 1. Fetch data on the server
  const client = mockClients.find((c) => c.id === params.id);

  // 2. Handle not found case on the server
  if (!client) {
    notFound();
  }

  // 3. Pass the data as props to the client component
  return <ClientView client={client} />;
}
