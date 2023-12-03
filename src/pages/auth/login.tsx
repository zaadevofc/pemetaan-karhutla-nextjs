import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Container from '../../components/Container';

export default async function Page () {
  return (
    <>
      <Container className="h-screen items-center justify-center p-5">
        <div className="flex flex-col items-center gap-7">
          <h1 className="font-[Walkind] text-4xl">Karhutla</h1>
          <div className="flex flex-col gap-3">
            <input type="text" placeholder="Masukan username/email" className="input input-bordered w-72 border border-orange-600 shadow-md outline-none" />
            <input type="text" placeholder="Masukan password" className="input input-bordered w-72 border border-orange-600 shadow-md outline-none" />
            <button className="fbtn mx-auto mt-6">Masuk</button>
          </div>
          <h1>atau masuk dengan</h1>
          <div className="flex flex-row items-center gap-3">
            <div className="fbtn !bg-orange-500/10 !p-2">
              <Image src="/logo/google.svg" width={25} height={25} alt="google" />
            </div>
            <div className="fbtn !bg-orange-500/10 !p-2" onClick={() => signIn('github')}>
              <Image src="/logo/github.svg" width={25} height={25} alt="githuv" />
            </div>
            <div className="fbtn !bg-orange-500/10 !p-2">
              <Image src="/logo/discord.svg" width={25} height={25} alt="discord" />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
