import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authConfig } from '~/modules/auth'
let prisma = new PrismaClient()

export default async function handler (req: any, res: any) {
    const session = await getServerSession(req, res, authConfig)
    if (!session) return res.status(400).send({ msg: 'unauthorized' })
    const remove = await prisma.kasus.deleteMany({
        where: {
            createdAt: req.query.id
        },
    })
    return res.send({ ok: !!remove, remove })
}