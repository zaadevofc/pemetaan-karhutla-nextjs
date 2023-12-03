'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Maps from '~/components/Maps';
import Container from '../components/Container';

export default async function Page () {
  const { status } = useSession();
  let isAuth = status == 'unauthenticated';
  const router = useRouter();

  // if (status == 'loading') return <Loading />
  return (
    <>
      <Container className="flex flex-col p-8">
        <nav className="flex flex-row items-center justify-between border-b border-black pb-4">
          <h1 className="font-[Walkind] text-2xl">Karhutla</h1>
          <h1 onClick={() => router.push(isAuth ? '/auth/login' : '/dashboard')} className="fbtn ml-3 !px-2 !py-1">
            {isAuth ? 'Masuk' : 'Dashboard'}
          </h1>
        </nav>
        <section className="mt-10">
          <Maps />
        </section>
      </Container>
      <footer className="mt-16 flex justify-center p-4">
        <h1 className="text-sm font-semibold tracking-wide">Made with ❤️ by zaadevofc</h1>
      </footer>
    </>
  );
};
