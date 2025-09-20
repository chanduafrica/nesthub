
import { notFound } from 'next/navigation';
import { ClientView } from '@/components/admin/client-view';
import { Client, Transaction, ModuleEngagement } from '@/lib/mock-data';
import { getClient, getTransactions } from '@/lib/firebase-services';

// This is now a SERVER component
export default async function Client360Page({ params }: { params: { id: string } }) {
  
  // 1. Fetch all required data on the server
  const allTransactions: Transaction[] = await getTransactions();
  
  const client = await getClient(params.id);

  // 2. Handle not found case on the server
  if (!client) {
    notFound();
  }

  const clientTransactions = allTransactions.filter(tx => tx.clientId === client.id);

  // 3. Pass all the data as props to the client component
  return <ClientView client={client} transactions={clientTransactions} />;
}
