import { signOut } from 'next-auth/react';

const Navbar = (props: any) => {
  return (
    <>
      <nav className="flex flex-row items-center justify-between border-b border-black p-6 pb-4">
        <h1>Dashboard</h1>
        <div className="flex flex-row items-center gap-8 md:cursor-pointer">
          <h1 onClick={() => signOut()} className="text-red-600">
            Keluar
          </h1>
          <img className="rounded-full border border-black shadow-lg" src="https://avatars.githubusercontent.com/u/93970726?v=4" alt="" width={31.91} height={31.91} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
