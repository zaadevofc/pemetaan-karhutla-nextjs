import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authConfig } from '~/modules/auth'
let prisma = new PrismaClient()

export default async function Handler (req: any, res: any) {
    const session: any = await getServerSession(req, res, authConfig)
    if (!session) return res.send({ msg: 'unauthorized' })

    const all = await prisma.kasus.findMany({
        where: { userId: session.token.sub }
    })

    return res.send({ ok: !!all, data: all.reverse() })
}