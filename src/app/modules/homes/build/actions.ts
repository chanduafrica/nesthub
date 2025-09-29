
'use server';

import { getBuildProjects, writeData } from '@/lib/firebase-services';

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
