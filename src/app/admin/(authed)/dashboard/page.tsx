
import { Client, Transaction, ModuleEngagement } from '@/lib/mock-data';
import { DashboardClient } from '@/components/admin/dashboard-client';
import { getClients, getTransactions } from '@/lib/firebase-services';

// This is now a SERVER component
export default async function AdminDashboardPage() {
  
  // 1. Fetch all required data on the server
  const clients: Client[] = await getClients();
  const transactions: Transaction[] = await getTransactions();
  
  // 2. Pass all the data as props to the client component
  return <DashboardClient clients={clients} transactions={transactions} />;
}
