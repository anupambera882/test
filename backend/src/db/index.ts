import { PrismaClient, Prisma, User, AuthProvider } from '@prisma/client';

// Initialize Prisma Client
const client = new PrismaClient();

// Export the client
export const db = client;

// Export the Prisma namespace and User type
export { Prisma, User, AuthProvider };
