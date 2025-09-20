
import { Transaction, Client, ModuleEngagement } from '@/lib/mock-data';
import { getTransactions, getClients } from '@/lib/firebase-services';
import { TransactionsList } from '@/components/admin/transactions-list';
import fs from 'fs';
import path from 'path';

// This is now a SERVER component
export default async function AllTransactionsPage() {
  
  // 1. Fetch all required data
  const transactions: Transaction[] = await getTransactions();
  const clients: Client[] = await getClients();
  
  const engagementFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'module-engagement.json');
  const engagementJsonData = fs.readFileSync(engagementFilePath, 'utf-8');
  const moduleEngagement: ModuleEngagement[] = JSON.parse(engagementJsonData);

  // 2. Pass the data as props to the client component
  return <TransactionsList 
            initialTransactions={transactions} 
            initialClients={clients} 
            moduleEngagement={moduleEngagement} 
         />;
}
