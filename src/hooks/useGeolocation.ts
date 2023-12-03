import { useState } from 'react';
import { useMutation } from 'react-query';

const useGeoLocation = () => {
    const [isData, setData] = useState<any>(false)
    let q = useMutation(['listKasus'], async () => {
        const geo = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${isData.lat}&lon=${isData.lng}`)
        const res = await geo.json()
        return { ...res }
    })
    return { ...q, setData }
}

export default useGeoLocation