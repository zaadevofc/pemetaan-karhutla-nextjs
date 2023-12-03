import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from 'next-auth/providers/github';
import prisma from './prisma';

export const authConfig: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GitHubProvider({
            clientId: <string>process.env.GITHUB_CLIENT_ID,
            clientSecret: <string>process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/auth/login',
        signOut: '/',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session(session: any) {
            return session
        },
        async redirect({ baseUrl, url }) {
            return baseUrl
                ;
        }
    },
    session: {
        strategy: 'jwt'
    }
}