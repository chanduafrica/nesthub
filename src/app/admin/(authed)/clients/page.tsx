
import { Client } from '@/lib/mock-data';
import { ClientsList } from '@/components/admin/clients-list';
import { getClients } from '@/lib/firebase-services';

// This is now a SERVER component
export default async function AllClientsPage() {
  
  // 1. Fetch data on the server
  const clients: Client[] = await getClients();

  // 2. Pass the data as props to the client component
  return <ClientsList initialClients={clients} />;
}
