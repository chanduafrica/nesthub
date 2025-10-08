
'use server';
/**
 * @fileOverview An AI shopping assistant for the NestDuka portal.
 *
 * - searchDuka - A function that generates a shopping cart based on a user's budget and needs.
 */

import { ai } from '@/ai/genkit';
import { getDukaProducts } from '@/lib/firebase-services';
import type { DukaProduct } from '@/lib/mock-data';
import { z } from 'zod';

// 1. Define Input and Output Schemas
const DukaSearchInputSchema = z.object({
    query: z.string().describe("The user's shopping request in natural language, including budget and items needed."),
    availableProducts: z.array(z.object({
        id: z.string(),
        name: z.string(),
        price: z.number(),
        category: z.string(),
        brand: z.string(),
        unitSize: z.string(),
    })),
});

export const DukaSearchOutputSchema = z.array(
    z.object({
        productId: z.string().describe("The ID of the suggested product."),
        quantity: z.number().describe("The quantity of this product to add to the cart."),
    })
).describe("The generated shopping cart with product IDs and quantities.");

export type DukaSearchInput = z.infer<typeof DukaSearchInputSchema>;
export type DukaSearchOutput = z.infer<typeof DukaSearchOutputSchema>;

// 2. Define the Main AI Prompt
const dukaSearchPrompt = ai.definePrompt(
  {
    name: 'dukaSearchPrompt',
    input: { schema: DukaSearchInputSchema },
    output: { schema: DukaSearchOutputSchema },
    prompt: `
        You are "DukaDash", an expert personal shopper for NestDuka.
        Your goal is to create the best possible shopping cart for a user based on their needs and budget.

        USER'S REQUEST: "{{query}}"
        
        AVAILABLE PRODUCTS:
        {{#each availableProducts}}
        - ID: {{this.id}}, Name: {{this.name}}, Price: KES {{this.price}}, Category: {{this.category}}, Brand: {{this.brand}}, Size: {{this.unitSize}}
        {{/each}}
        
        Your task:
        1.  Carefully analyze the user's request, paying close attention to the budget, number of people, duration (e.g., weekly), and specific items mentioned.
        2.  From the list of available products, select a combination of items that best fulfills the user's request while staying within or very close to their budget.
        3.  Prioritize essential items first (e.g., milk, bread, ugali flour, oil).
        4.  Make reasonable assumptions. If a user asks for "weekly groceries for 2", assume standard quantities like 1-2 loaves of bread, 2L of milk, etc.
        5.  Return an array of objects, where each object contains the 'productId' and the recommended 'quantity' for that product.
        6.  If the budget is too low for the request, do your best to get the most essential items.
        7.  If no products are provided, or the request is impossible, return an empty array.
    `,
  },
);

// 3. Define the Flow
const dukaSearchFlow = ai.defineFlow(
  {
    name: 'dukaSearchFlow',
    inputSchema: z.string(), // The flow takes only the user's text query
    outputSchema: DukaSearchOutputSchema,
  },
  async (query) => {
    // Get all available products from our "database"
    const allProducts: DukaProduct[] = await getDukaProducts();

    // Prepare the input for the prompt, including the list of products
    const promptInput: DukaSearchInput = {
      query: query,
      availableProducts: allProducts.map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category,
          brand: p.brand,
          unitSize: p.unitSize
      })),
    };

    // Call the LLM with the prepared input
    const { output } = await dukaSearchPrompt(promptInput);
    
    return output || [];
  }
);


// 4. Export a callable server action
export async function searchDuka(query: string): Promise<DukaSearchOutput> {
    return await dukaSearchFlow(query);
}
