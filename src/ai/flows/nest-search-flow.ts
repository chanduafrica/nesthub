
'use server';
/**
 * @fileOverview A search agent for the DigitalNest ecosystem.
 *
 * - searchNest - A function that searches across all Nest portals.
 * - NestSearchInput - The input type for the searchNest function.
 * - NestSearchResult - The output type for the searchNest function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getProducts, getProperties, getHolidayPackages } from '@/lib/firebase-services';

// 1. Define Input and Output Schemas with Zod
const NestSearchInputSchema = z.string();
export type NestSearchInput = z.infer<typeof NestSearchInputSchema>;

const NestSearchResultSchema = z.object({
  title: z.string().describe('The title of the item.'),
  description: z.string().describe('A brief description of the item.'),
  price: z.number().optional().describe('The price of the item, if applicable.'),
  portal: z.string().describe('The Nest portal the item belongs to (e.g., NestMall, NestHomes, NestTravel).'),
  imageUrl: z.string().describe('A URL for an image of the item.'),
  url: z.string().describe('A deep link URL to the item\'s page.'),
});
export type NestSearchResult = z.infer<typeof NestSearchResultSchema>;

const NestSearchOutputSchema = z.array(NestSearchResultSchema);
export type NestSearchOutput = z.infer<typeof NestSearchOutputSchema>;

// 2. Define the Search Tool
const searchAcrossPortalsTool = ai.defineTool(
    {
        name: 'searchAcrossPortals',
        description: 'Searches for items across all DigitalNest portals like NestMall, NestHomes, and NestTravel.',
        inputSchema: z.object({ query: z.string() }),
        outputSchema: NestSearchOutputSchema,
    },
    async ({ query }) => {
        console.log(`[Search Tool] Searching for: ${query}`);
        const results: NestSearchResult[] = [];
        const lowerCaseQuery = query.toLowerCase();

        // Search Products (NestMall)
        const products = await getProducts();
        products.forEach(p => {
            if (p.title.toLowerCase().includes(lowerCaseQuery) || (p.category && p.category.toLowerCase().includes(lowerCaseQuery))) {
                results.push({
                    title: p.title,
                    description: `Category: ${p.category}`,
                    price: p.discountPrice || p.price,
                    portal: 'NestMall',
                    imageUrl: p.image,
                    url: `/modules/mall/product/${p.slug}`,
                });
            }
        });

        // Search Properties (NestHomes)
        const properties = await getProperties();
        properties.forEach(p => {
            if (p.title.toLowerCase().includes(lowerCaseQuery) || p.location.toLowerCase().includes(lowerCaseQuery)) {
                results.push({
                    title: p.title,
                    description: `${p.beds} beds, ${p.baths} baths in ${p.location}`,
                    price: p.price,
                    portal: 'NestHomes',
                    imageUrl: p.imageUrl,
                    url: `/modules/homes/properties/${p.slug}`,
                });
            }
        });

        // Search Packages (NestTravel)
        const packages = await getHolidayPackages();
        packages.forEach(p => {
             if (p.title.toLowerCase().includes(lowerCaseQuery) || p.location.toLowerCase().includes(lowerCaseQuery)) {
                results.push({
                    title: p.title,
                    description: p.duration,
                    price: p.price,
                    portal: 'NestTravel',
                    imageUrl: p.image,
                    url: `/modules/travel/package/${p.slug}`,
                });
            }
        });

        console.log(`[Search Tool] Found ${results.length} initial results.`);
        // In a real scenario, you'd have better ranking. Here we just take the first 20.
        return results.slice(0, 20);
    }
);


// 3. Define the Main AI Prompt/Flow
const nestSearchPrompt = ai.definePrompt(
  {
    name: 'nestSearchPrompt',
    input: { schema: NestSearchInputSchema },
    output: { schema: NestSearchOutputSchema },
    tools: [searchAcrossPortalsTool],
    prompt: `
        You are NestSearch, an AI assistant for the DigitalNest ecosystem.
        Your task is to help users find what they are looking for across all portals (NestMall, NestHomes, NestTravel, etc.).

        1. Use the 'searchAcrossPortals' tool with the user's query: {{{prompt}}}.
        2. From the tool's results, identify the top 10 most relevant items.
        3. Return these top 10 items as your final output in the specified JSON format.
        4. If no relevant results are found, return an empty array.
    `,
  },
);

const searchNestFlow = ai.defineFlow(
  {
    name: 'searchNestFlow',
    inputSchema: NestSearchInputSchema,
    outputSchema: NestSearchOutputSchema,
  },
  async (query) => {
    const { output } = await nestSearchPrompt(query);
    return output || [];
  }
);


// 4. Export a callable server action
export async function searchNest(query: string): Promise<NestSearchOutput> {
    return await searchNestFlow(query);
}
