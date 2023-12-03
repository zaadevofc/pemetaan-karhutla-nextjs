'use client';

import ListKasus from '~/layouts/ListKasus';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

export default function Page() {
  return (
    <>
      <section className="flex flex-col">
        <div className="flex flex-row divide-x divide-black">
          <Sidebar />
          <div className="flex w-full flex-col">
            <Navbar />
            <ListKasus />
            <Footer />
          </div>
        </div>
      </section>
    </>
  );
};
