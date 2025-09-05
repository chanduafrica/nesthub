
import { Client, Transaction, ModuleEngagement } from '@/lib/mock-data';
import fs from 'fs';
import path from 'path';
import { DashboardClient } from '@/components/admin/dashboard-client';

// This is now a SERVER component
export default async function AdminDashboardPage() {
  
  // 1. Fetch all required data on the server
  const clientsFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'clients.json');
  const transactionsFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'transactions.json');
  const engagementFilePath = path.join(process.cwd(), 'src', 'lib', 'data', 'module-engagement.json');
  
  const clientsJsonData = fs.readFileSync(clientsFilePath, 'utf-8');
  const transactionsJsonData = fs.readFileSync(transactionsFilePath, 'utf-8');
  const engagementJsonData = fs.readFileSync(engagementFilePath, 'utf-8');

  const clients: Client[] = JSON.parse(clientsJsonData);
  const transactions: Transaction[] = JSON.parse(transactionsJsonData);
  const moduleEngagement: ModuleEngagement[] = JSON.parse(engagementJsonData);
  
  // 2. Pass all the data as props to the client component
  return <DashboardClient clients={clients} transactions={transactions} moduleEngagement={moduleEngagement} />;
}
