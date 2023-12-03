import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authConfig } from '~/modules/auth';
import { signJWT, verifyJWT } from '~/modules/utils';
let prisma = new PrismaClient()

let tokenz = {
    title: '',
    address: '',
    latitude: '',
    longitude: '',
    level: ''
}

export default async function Handler (req: any, res: any) {
    const session: any = await getServerSession(req, res, authConfig)
    if (!session) return res.status(400).send({ msg: 'unauthorized' })

    const { token } = req.query
    let payload = verifyJWT(token)
    if (!payload) return res.status(400).send({ msg: 'token invalid' })

    const add = await prisma.kasus.create({
        data: {
            title: payload.title,
            address: payload.address,
            latitude: payload.latitude,
            longitude: payload.longitude,
            level: payload.level,
            createdAt: new Date().getTime().toString(),
            user: {
                connect: {
                    id: session.token.sub
                }
            }
        },
    })

    if (!add) return res.status(400).send({ msg: 'failed' })
    return res.status(200).send({ token: signJWT(add) })
}