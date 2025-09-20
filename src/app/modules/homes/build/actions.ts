
'use server';

import { saveBuildProject, type BuildProjectData } from '@/lib/firebase-services';
import { revalidatePath } from 'next/cache';

export async function handleSaveBuildProject(projectData: BuildProjectData) {
    try {
        const result = await saveBuildProject(projectData);
        // Optionally revalidate a path if you have a page that lists build projects
        // revalidatePath('/admin/build-projects');
        return result;
    } catch (error) {
        console.error("Server Action Error: Failed to save build project", error);
        // Throwing the error so the client-side .catch() can handle it
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while saving the project.");
    }
}
