
import { Client, Transaction, ModuleEngagement } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';
import { DashboardClient } from '@/components/admin/dashboard-client';
import { getClients, getTransactions } from '@/lib/firebase-services';

// This is now a SERVER component
export default async function AdminDashboardPage() {
  
  // 1. Fetch all required data on the server
  const engagementFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'module-engagement.json');
  const engagementJsonData = fs.readFileSync(engagementFilePath, 'utf-8');

  const clients: Client[] = await getClients();
  const transactions: Transaction[] = await getTransactions();
  const moduleEngagement: ModuleEngagement[] = JSON.parse(engagementJsonData);
  
  // 2. Pass all the data as props to the client component
  return <DashboardClient clients={clients} transactions={transactions} moduleEngagement={moduleEngagement} />;
}
