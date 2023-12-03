import { sign, verify } from 'jsonwebtoken'
let secret = process.env.NEXTAUTH_JWT_SECRET as string

export const signJWT = (obj: any) => {
    try {
        return sign(obj, secret, {
            expiresIn: 8,
        })
    } catch (e) {
        return false
    }
}

export const verifyJWT = (token: any) => {
    try {
        let v: any = verify(token, secret)
        delete v.iat;
        delete v.exp;
        return v
    } catch (e) {
        return false
    }
} 