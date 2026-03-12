import prisma from '@/lib/prisma'

export async function GET() {
    const resources = await prisma.resource.findMany({})
    return Response.json(resources)
}