
import { z } from 'zod';

// 1. Define Input and Output Schemas
export const DukaSearchInputSchema = z.object({
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
