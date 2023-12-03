'use client';

import Dashboard from '~/layouts/Dashboard';
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
            <Dashboard />
            <Footer />
          </div>
        </div>
      </section>
    </>
  );
};
