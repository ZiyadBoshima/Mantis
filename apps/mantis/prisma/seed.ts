import { Issue, Status } from "@prisma/client";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const issues: {
  title: string,
  description: string,
  status: Status,
  createdAt: Date,
  updatedAt: Date,
  assignedToUserId: string
}[]
 = [
	{
		"title": "Database Connection Issue",
		"description": "## Database Connection Issue\n\nWe are currently experiencing an issue with our database connection. This is causing significant delays in our application. We are working to resolve this issue as quickly as possible.\n\n### Steps to Reproduce\n\n1. Open the application.\n2. Attempt to load data.\n3. Observe the delay.",
		"status": "OPEN",
		"createdAt": new Date("2024-01-26T20:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk1"
	},
	{
		"title": "Slow Website Load Times",
		"description": "## Slow Website Load Times\n\nOur website is currently loading very slowly. This is causing a poor user experience. We are investigating the cause of this issue.\n\n### Steps to Reproduce\n\n1. Visit our website.\n2. Observe the slow load times.",
		"status": "IN_PROGRESS",
		"createdAt": new Date("2024-01-26T12:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk2"
	},
	{
		"title": "API Endpoint Failure",
		"description": "## API Endpoint Failure\n\nOne of our API endpoints is failing to return the expected data. This is causing issues in our application. We are working to resolve this issue as quickly as possible.\n\n### Steps to Reproduce\n\n1. Send a request to the failing endpoint.\n2. Observe the incorrect response.",
		"status": "CLOSED",
		"createdAt": new Date("2024-01-26T22:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk3"
	},
	{
		"title": "Missing Documentation",
		"description": "## Missing Documentation\n\nWe have identified several areas of our codebase that are lacking sufficient documentation. This is making it difficult for new developers to get up to speed.\n\n### Steps to Reproduce\n\n1. Review the codebase.\n2. Identify areas lacking documentation.",
		"status": "OPEN",
		"createdAt": new Date("2024-01-26T05:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk4"
	},
	{
		"title": "Security Vulnerability",
		"description": "## Security Vulnerability\n\nA security vulnerability has been identified in our application. We are working to patch this vulnerability as quickly as possible.\n\n### Steps to Reproduce\n\n1. Review the security report.\n2. Identify the vulnerability.",
		"status": "IN_PROGRESS",
		"createdAt": new Date("2024-01-26T09:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk5"
	},
	{
		"title": "Outdated Dependencies",
		"description": "## Outdated Dependencies\n\nSeveral of our project dependencies are outdated. This could potentially lead to compatibility issues or security vulnerabilities.\n\n### Steps to Reproduce\n\n1. Run a dependency check.\n2. Identify outdated dependencies.",
		"status": "CLOSED",
		"createdAt": new Date("2024-01-26T03:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk6"
	},
	{
		"title": "Inconsistent UI",
		"description": "## Inconsistent UI\n\nThere are inconsistencies in our user interface that are causing confusion for our users. We need to standardize our UI components for a better user experience.\n\n### Steps to Reproduce\n\n1. Navigate through the application.\n2. Identify inconsistent UI components.",
		"status": "OPEN",
		"createdAt": new Date("2024-01-26T14:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk7"
	},
	{
		"title": "Broken Links",
		"description": "## Broken Links\n\nSeveral links on our website are broken. This is causing a poor user experience and may be negatively impacting our SEO.\n\n### Steps to Reproduce\n\n1. Navigate through the website.\n2. Identify broken links.",
		"status": "IN_PROGRESS",
		"createdAt": new Date("2024-01-26T13:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk8"
	},
	{
		"title": "Performance Issues",
		"description": "## Performance Issues\n\nOur application is experiencing performance issues. This is causing slow load times and a poor user experience.\n\n### Steps to Reproduce\n\n1. Use the application.\n2. Identify areas of poor performance.",
		"status": "CLOSED",
		"createdAt": new Date("2024-01-26T01:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk9"
	},
	{
		"title": "Error Handling",
		"description": "## Error Handling\n\nOur application is not properly handling errors. This is causing crashes and other unexpected behavior.\n\n### Steps to Reproduce\n\n1. Use the application.\n2. Identify areas where errors are not properly handled.",
		"status": "OPEN",
		"createdAt": new Date("2024-01-26T13:31:15.000Z"),
		"updatedAt": new Date("2024-01-27T00:31:15.000Z"),
		"assignedToUserId": "cjkhdscnjk10"
	}
]


function seedIssues() {
  Promise.all(issues.map(({ 
    title,
    description,
    status, 
    createdAt, 
    updatedAt, 
    assignedToUserId 
  }: {
    title: string,
    description: string,
    status: any,
    createdAt: Date,
    updatedAt: Date,
    assignedToUserId: string
  
  }) => prisma.issue.create({ data: {
    title,
    description,
    status,
    createdAt,
    updatedAt,
    assignedToUserId
  } })))
    .then(() => console.info('[SEED] Successfully created issue records'))
    .catch(e => console.error('[SEED] Failed to created issue records', e))
}

seedIssues()