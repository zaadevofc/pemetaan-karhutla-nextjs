
import NextAuth from "next-auth"
import { authConfig } from "~/modules/auth"

const auth = NextAuth(authConfig)
export default auth