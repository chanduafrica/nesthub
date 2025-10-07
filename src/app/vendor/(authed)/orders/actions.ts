
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import type { Transaction, TransactionStatus } from '@/lib/mock-data';
import { getTransactions } from '@/lib/firebase-services';

const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
const transactionsFilePath = path.join(dataDirectory, 'transactions.json');

export async function handleUpdateOrderStatus(orderId: string, status: TransactionStatus) {
    try {
        const transactions = await getTransactions();
        const transactionIndex = transactions.findIndex(t => t.id === orderId);

        if (transactionIndex !== -1) {
            transactions[transactionIndex].status = status;
            await fs.writeFile(transactionsFilePath, JSON.stringify(transactions, null, 2), 'utf8');
            revalidatePath('/vendor/orders');
            return { success: true, transaction: transactions[transactionIndex] };
        }
        throw new Error(`Transaction with id ${orderId} not found.`);

    } catch (error) {
        console.error("Server Action Error: Failed to update order status", error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: "An unknown error occurred." };
    }
}
