
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import { getBuildProjects } from '@/lib/firebase-services';

// Helper function to write data to a JSON file
async function writeData<T>(filename: string, data: T[]): Promise<void> {
    const dataDirectory = path.join(process.cwd(), 'src', 'lib', 'data');
    const filePath = path.join(dataDirectory, filename);
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(`Error writing to ${filename}:`, error);
    }
}


export type BuildProjectData = {
    designName: string;
    designId: string;
    totalCost: number;
    depositPaid: number;
    paymentMethod: string;
    contractNo: string;
    projectManager: string;
    status: string;
};

export async function handleSaveBuildProject(projectData: BuildProjectData) {
    try {
        const projects = await getBuildProjects();
        const newProject = { 
            id: `proj_${Date.now()}`,
            ...projectData,
            submittedAt: new Date().toISOString(),
        };
        projects.push(newProject);
        await writeData('build-projects.json', projects);

        return { success: true, project: newProject };
    } catch (error) {
        console.error("Server Action Error: Failed to save build project", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while saving the project.");
    }
}
