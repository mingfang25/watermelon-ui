export class IssueRequest {
    title: string;
    description: string;
    priority: number;
    estimate: number;
    status: string;
    createdByUserId: number;
    assignedUserId: number;
    projectId: number;
}