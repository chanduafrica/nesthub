
import { z } from 'zod';

// 1. Define Input and Output Schemas with Zod
export const NestSearchInputSchema = z.string();
export type NestSearchInput = z.infer<typeof NestSearchInputSchema>;

export const NestSearchResultSchema = z.object({
  title: z.string().describe('The title of the item.'),
  description: z.string().describe('A brief description of the item.'),
  price: z.number().optional().describe('The price of the item, if applicable.'),
  portal: z.string().describe('The Nest portal the item belongs to (e.g., NestMall, NestHomes, NestTravel).'),
  imageUrl: z.string().describe('A URL for an image of the item.'),
  url: z.string().describe('A deep link URL to the item\'s page.'),
});
export type NestSearchResult = z.infer<typeof NestSearchResultSchema>;

export const NestSearchOutputSchema = z.array(NestSearchResultSchema);
export type NestSearchOutput = z.infer<typeof NestSearchOutputSchema>;
