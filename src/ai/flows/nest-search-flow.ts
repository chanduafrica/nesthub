
'use server';
/**
 * @fileOverview A search agent for the DigitalNest ecosystem.
 *
 * - searchNest - A function that searches across all Nest portals.
 */

import { ai } from '@/ai/genkit';
import { getProducts, getProperties, getHolidayPackages, getStays } from '@/lib/firebase-services';
import { z } from 'zod';
import { NestSearchInputSchema, NestSearchOutput, NestSearchOutputSchema, NestSearchResult, NestSearchResultSchema } from './nest-search-types';
import type { NestSearchInput } from './nest-search-types';


// Helper function to create URL-friendly slugs
function createSlug(title: string) {
    if (!title) return '';
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// 2. Define the Search Tool
const searchAcrossPortalsTool = ai.defineTool(
    {
        name: 'searchAcrossPortals',
        description: 'Searches for items across all DigitalNest portals like NestMall, NestHomes, NestStays, and NestTravel.',
        inputSchema: NestSearchInputSchema,
        outputSchema: NestSearchOutputSchema,
    },
    async (query) => {
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
                    url: `/modules/mall/product/${createSlug(p.title)}`,
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
                    url: `/modules/homes/properties/${createSlug(p.title)}`,
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
                    url: `/modules/travel/package/${createSlug(p.title)}`,
                });
            }
        });

        // Search Stays (NestStays)
        const stays = await getStays();
        stays.forEach(s => {
            if (s.title.toLowerCase().includes(lowerCaseQuery) || s.type.toLowerCase().includes(lowerCaseQuery) || s.location.toLowerCase().includes(lowerCaseQuery)) {
                results.push({
                    title: s.title,
                    description: `${s.type} in ${s.location}`,
                    price: s.price,
                    portal: 'NestStays',
                    imageUrl: s.image,
                    url: `/modules/stays`, // Assuming a generic stays page for now
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
        Your primary function is to understand a user's request and use the available tools to find relevant items within our internal portals.

        - Your main task is to analyze the user's query: {{{this}}}.
        - Identify key information like item names, categories (e.g., "electronics", "fashion"), locations (e.g., "Kilimani", "Diani"), or attributes (e.g., "cheap", "luxury").
        - Use this information to call the 'searchAcrossPortals' tool. This is the ONLY way you can get information.
        - You CANNOT access the public internet or any external data sources. Your knowledge is limited to the output of the 'searchAcrossPortals' tool.
        - From the tool's results, select the top 10 most relevant items that best match the user's original query.
        - Return these top 10 items as your final output in the specified JSON format.
        - If the tool returns no relevant results, return an empty array.
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
export async function searchNest(query: NestSearchInput): Promise<NestSearchOutput> {
    return await searchNestFlow(query);
}


