
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

// 1. Define the Search Tool
const searchAcrossPortalsTool = ai.defineTool(
    {
        name: 'searchAcrossPortals',
        description: 'Searches for items across all DigitalNest portals like NestMall, NestHomes, NestStays, and NestTravel.',
        inputSchema: NestSearchInputSchema,
        outputSchema: z.array(NestSearchResultSchema),
    },
    async (query) => {
        console.log(`[Search Tool] Searching for: ${query}`);
        const results: NestSearchResult[] = [];
        const lowerCaseQuery = query.toLowerCase();

        // Search Products (NestMall)
        try {
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
        } catch (e) { console.error("Error searching products", e); }

        // Search Properties (NestHomes)
         try {
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
        } catch (e) { console.error("Error searching properties", e); }


        // Search Packages (NestTravel)
        try {
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
        } catch(e) { console.error("Error searching packages", e); }

        // Search Stays (NestStays)
        try {
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
        } catch (e) { console.error("Error searching stays", e); }


        console.log(`[Search Tool] Found ${results.length} initial results.`);
        return results;
    }
);


const SearchFlowInputSchema = z.object({
  query: z.string(),
  results: z.array(NestSearchResultSchema),
});


// 3. Define the Main AI Prompt/Flow
const nestSearchPrompt = ai.definePrompt(
  {
    name: 'nestSearchPrompt',
    input: { schema: SearchFlowInputSchema },
    output: { schema: NestSearchOutputSchema },
    prompt: `
        You are NestSearch, an AI assistant for the DigitalNest ecosystem.
        Your primary function is to intelligently rank and select the most relevant items from a provided list of search results based on the user's original query.

        The user's original query was: "{{query}}"
        
        Here are the search results retrieved from our internal portals:
        
        {{#each results}}
        - {{this.title}} in {{this.portal}} (Description: {{this.description}}, Price: {{this.price}})
        {{/each}}
        
        Your task:
        - Analyze the user's query to understand their intent (e.g., looking for a specific item, a category, a location, or a price range).
        - From the provided search results, select the top 10 most relevant items that best match the user's original query.
        - Return ONLY these top 10 items in the specified JSON format.
        - If there are no relevant results in the provided list, or if the list is empty, return an empty array.
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
    // 1. Perform the search using the tool
    const searchResults = await searchAcrossPortalsTool(query);

    // 2. If no results, return empty array
    if (searchResults.length === 0) {
      return [];
    }

    // 3. Use the LLM to rank and select the best results
    const { output } = await nestSearchPrompt({
      query: query,
      results: searchResults.slice(0, 20), // Limit to 20 to keep prompt size reasonable
    });
    
    return output || [];
  }
);


// 4. Export a callable server action
export async function searchNest(query: NestSearchInput): Promise<NestSearchOutput> {
    return await searchNestFlow(query);
}
