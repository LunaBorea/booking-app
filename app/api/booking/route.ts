import prisma from '@/lib/prisma'
import { randomUUID } from 'crypto'
import { auth } from "@/lib/auth"
import { headers } from 'next/headers'

export async function POST(req: Request) {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return Response.json({msg:"unauthorized access"})
    const body = await req.json()
    const data = await prisma.booking.create({data: {
        id: randomUUID(),
        resourceId: body.selectedResource,
        userId: session?.user.id,
        date: body.date
    }})
    return Response.json(data)
}

export async function GET(req: Request) {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return Response.json({msg:"unauthorized access"})
    const bookings = await prisma.booking.findMany({where: {userId: session.user.id}})
    return Response.json(bookings)
}