import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { HiDatabase, HiFire, HiLibrary, HiLocationMarker, HiOfficeBuilding } from 'react-icons/hi';

const sideList = [
  { title: 'Dashboard', icon: HiDatabase, href: '/dashboard' },
  { title: 'List Kasus', icon: HiLocationMarker, href: '/dashboard/list' },
  { title: 'Daerah', icon: HiOfficeBuilding, href: '' },
  { title: 'Kabupaten', icon: HiLibrary, href: '' }
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2 py-5 pl-5 pr-16">
          <HiFire className="text-3xl text-orange-600" />
          <h1 className="self-start font-[Walkind] text-2xl">Karhutla</h1>
        </div>
        <div className="flex flex-col border-t border-black">
          <div className="mt-1 grid grid-cols-1 gap-2 p-3">
            {sideList.map((x, i) => {
              return (
                <div onClick={() => router.push(x.href)} key={i} className={`${pathname == x.href ? 'side-btn-active' : 'side-btn'}`}>
                  <x.icon />
                  <h1>{x.title}</h1>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
