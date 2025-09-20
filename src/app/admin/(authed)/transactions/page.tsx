
import { Transaction, Client } from '@/lib/mock-data';
import { getTransactions, getClients } from '@/lib/firebase-services';
import { TransactionsList } from '@/components/admin/transactions-list';

// This is now a SERVER component
export default async function AllTransactionsPage() {
  
  // 1. Fetch all required data
  const transactions: Transaction[] = await getTransactions();
  const clients: Client[] = await getClients();
  
  // 2. Pass the data as props to the client component
  return <TransactionsList 
            initialTransactions={transactions} 
            initialClients={clients} 
         />;
}
