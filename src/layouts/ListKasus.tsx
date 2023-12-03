'use client';
import { useEffect, useState } from 'react';
import { FiCheckCircle, FiCoffee, FiRefreshCw } from 'react-icons/fi';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import Maps from '~/components/Maps';
import useAddKasus from '~/hooks/useAddKasus';
import useListKasus from '~/hooks/useListKasus';
import useRemoveKasus from '~/hooks/useRemoveKasus';

const ListKasus = () => {
  const [isiData, setIsiData] = useState<any>();
  const [addLayer, setAddLayer] = useState<boolean>(false);
  const [isFinish, setFinish] = useState<any>([false, false]);
  const { isLoading: addLoad, isSuccess: addSuccess, isError: addError, mutate: addMutate, setData: addSet } = useAddKasus();
  const { isLoading: listLoad, isSuccess: listSuccess, isError: listError, data: listData, mutate: listMutate } = useListKasus();

  const { setID, mutate: delMutate } = useRemoveKasus();
  const removeKasus = async (id: any) => {
    await setID(id);
    await delMutate();
    await listMutate();
  };

  useEffect(() => {
    (async () => await listMutate())();
  }, [, addLoad]);

  useEffect(() => {
    setFinish([!!addLoad, !!addSuccess || !addError]);
    setTimeout(() => {
      setFinish([false]);
    }, 1500);
  }, [addLoad]);

  const addKasus = async (e: any) => {
    await addSet({
      title: e.target[0].value,
      address: e.target[1].value,
      latitude: e.target[2].value,
      longitude: e.target[3].value,
      level: e.target[4].value.toUpperCase()
    });
    await addMutate();
  };

  return (
    <>
      <div className="flex w-full flex-row justify-between gap-5 p-10">
        <div className={`${addLayer && '!h-0 !w-0 !opacity-0'} flex w-full flex-col opacity-100 duration-500`}>
          <div className="flex flex-row justify-between ">
            <h1 className="text-2xl font-bold">List Kasus Karhutla</h1>
            <div className="flex flex-row items-center gap-2">
              <h1 onClick={() => listMutate()} className="fbtn !border-sky-500 !bg-sky-500 !px-3">
                <FiRefreshCw className={`${listLoad && 'animate-spin'}`} />
              </h1>
              <h1 onClick={() => setAddLayer(true)} className="fbtn h-fit !px-2 !py-1">
                Tambah
              </h1>
            </div>
          </div>
          <div className="mt-5 flex flex-col">
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <h1>Tinggi</h1>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                <h1>Menengah</h1>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500"></span>
                <h1>Rendah</h1>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-stone-500"></span>
                <h1>Kosong</h1>
              </div>
            </div>
            <div className={`${listLoad && '!mt-5 opacity-100'} -mt-5 flex flex-row items-center gap-3 opacity-0 duration-500`}>
              <span className="loading loading-infinity loading-md"></span>
              <h1 className="animate-pulse">Loading ...</h1>
            </div>
            {listData && listData.data.length == 0 && (
              <div className={`mt-10 flex flex-row items-center gap-3 opacity-100 duration-500`}>
                <FiCoffee />
                <h1>Tidak ada data.</h1>
              </div>
            )}
            <div className={`${listLoad && '!opacity-0'} hide-scroll mt-8 flex max-h-[450px] flex-col overflow-y-scroll opacity-100 duration-500`}>
              {listData &&
                listData.data.map((x: any, i: any) => {
                  return (
                    <div key={i} className="flex items-center gap-5 divide-black border-b border-gray-400 p-2 pl-0 hover:rounded-lg hover:bg-slate-400/30 md:cursor-pointer">
                      <div className="flex w-full flex-col">
                        <h1 className="line-clamp-1 font-semibold">{x.address}</h1>
                        <div className="flex w-full flex-row items-center justify-between">
                          <h1>
                            <span className="font-medium text-purple-600">{x.title}</span> |{' '}
                            <span className="text-stone-700">
                              {x.latitude}, {x.longitude}
                            </span>
                          </h1>
                          <div className="flex flex-row items-center gap-2">
                            {x.level == 'TINGGI' && <span className="h-3 w-3 rounded-full bg-red-500"></span>}
                            {x.level == 'MENENGAH' && <span className="h-3 w-3 rounded-full bg-amber-500"></span>}
                            {x.level == 'RENDAH' && <span className="h-3 w-3 rounded-full bg-blue-500"></span>}
                            {x.level == 'KOSONG' && <span className="h-3 w-3 rounded-full bg-stone-500"></span>}
                            <HiOutlinePencilAlt />
                            <span onClick={() => removeKasus(x.createdAt)}>
                              <HiOutlineTrash />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={`${addLayer && '!h-full !w-full !opacity-100'} flex h-0 w-0 flex-col opacity-0 duration-500`}>
          <div className="flex flex-row justify-between border-b border-black pb-3">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold">Tambah Kasus</h1>
              <span className="text-sm text-slate-600">Data baru akan muncul di halaman utama.</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <h1 onClick={() => setAddLayer(false)} className="fbtn h-fit !px-2 !py-1">
                Kembali
              </h1>
            </div>
          </div>
          <div className={`${isFinish[0] ? 'mt-4' : 'mt-0 h-0 opacity-0'} flex flex-row items-center gap-3 duration-500`}>
            {isFinish[1] && (
              <>
                <FiCheckCircle className="text-green-600" />
                <h1 className="font-[mooli] font-semibold text-green-600">Data berhasil disimpan.</h1>
              </>
            )}
            {isFinish[1] ?? (
              <>
                <FiCheckCircle className="text-red-600" />
                <h1 className="font-[mooli] font-semibold text-red-600">Data berhasil disimpan.</h1>
              </>
            )}
          </div>
          <form method="FALSE" action={'#'} className={`mt-8 flex flex-col gap-3 duration-300`} onSubmit={(e: any) => addKasus(e)}>
            <input required={true} defaultValue={isiData?.title} type="text" placeholder="Masukan judul" className="w-full max-w-xs rounded-lg border border-orange-600 p-3" />
            <input required={true} defaultValue={isiData?.address} type="text" placeholder="Masukan alamat" className="w-full max-w-xs rounded-lg border border-orange-600 p-3" />
            <input required={true} defaultValue={isiData?.lat} type="text" placeholder="Masukan latitude" className="w-full max-w-xs rounded-lg border border-orange-600 p-3" />
            <input required={true} defaultValue={isiData?.long} type="text" placeholder="Masukan longitude" className="w-full max-w-xs rounded-lg border border-orange-600 p-3" />
            <select required={true} className="select w-full max-w-xs border border-orange-600">
              <option value={'kosong'} disabled selected>
                Pilih level
              </option>
              <option value={'tinggi'}>Tinggi</option>
              <option value={'menengah'}>Menengah</option>
              <option value={'rendah'}>Rendah</option>
            </select>
            <div className="flex flex-row items-center gap-3">
              {addLoad ? (
                <>
                  <button type="button" className="fbtn mt-5 flex h-fit justify-center !border-sky-600 !bg-sky-600/50 !px-2 !py-1 duration-300 active:scale-100">
                    Reset
                  </button>
                  <button type="button" className="fbtn mt-5 flex h-fit justify-center !border-emerald-600 !bg-emerald-600/50 !px-2 !py-1 duration-300 active:scale-100">
                    <span className="loading loading-spinner loading-md"></span>
                  </button>
                </>
              ) : (
                <>
                  <button type="reset" className="fbtn mt-5 h-fit !border-sky-600 !bg-sky-600 !px-2 !py-1 duration-300">
                    Reset
                  </button>
                  <button type="submit" className="fbtn mt-5 h-fit !border-emerald-600 !bg-emerald-600 !px-2 !py-1 duration-300">
                    Simpan
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        <div className="w-full">
          <Maps width={'600px'} height={'550px'} setIsiData={setIsiData} addLayer={addLayer} />
        </div>
      </div>
    </>
  );
};

export default ListKasus;
