import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import useGeoLocation from '~/hooks/useGeolocation';
import useListKasus from '~/hooks/useListKasus';
const randomStr = Math.random().toString(36).substring(2, 10);

const Maps = ({ width = '100%', height = '100vh', setIsiData, addLayer }: { width?: any; height?: any; setIsiData?: any; addLayer?: any }) => {
  const { data: session } = useSession();
  const { data, setData, mutate } = useGeoLocation();
  const { data: list, mutate: loadList } = useListKasus();
  const libraries = useMemo(() => ['places'], []);
  const [location, setLocation] = useState<any>({ lat: 7.6274, lng: 110.8928, zoom: 14 });
  const [isMark, setMark] = useState<any>({});

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ lat: latitude, lng: longitude, zoom: 11 });
      });
    }
    (async () => await loadList())();
  }, []);

  const setCurrentLoc = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ lat: latitude, lng: longitude, zoom: 12 });
      });
    }
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
      keyboardShortcuts: true
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXTAUTH_MAPS_API as string,
    libraries: libraries as any
  });

  const mapClick = async (e: any) => {
    if (addLayer) {
      const lat = await e.latLng.lat();
      const lng = await e.latLng.lng();
      await setData({ lat, lng });
      await mutate();

      setIsiData({
        title: data?.name ?? data?.address.county,
        address: data?.display_name,
        lat: data?.lat,
        long: data?.lon
      });
      setMark((prev: any) => {
        return {
          title: data?.name ?? data?.address.county,
          address: data?.display_name,
          latitude: data?.lat,
          longitude: data?.lon
        };
      });
    }
  };

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <GoogleMap onClick={mapClick} clickableIcons={true} options={mapOptions} zoom={location.zoom} center={location} mapTypeId={google.maps.MapTypeId.ROADMAP} mapContainerStyle={{ width, height }}>
        {/* {(session && list) && [...list.data, isMark].map((x: any) => <MarkerF position={{ lat: parseFloat(x.latitude), lng: parseFloat(x.longitude) }} />)} */}
        <div className="absolute p-4">
          <h1 onClick={() => setCurrentLoc()} className="fbtn">
            Lokasi
          </h1>
        </div>
      </GoogleMap>
    </>
  );
};

export default Maps;
