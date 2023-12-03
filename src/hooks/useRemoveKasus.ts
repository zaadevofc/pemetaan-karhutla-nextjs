import { useState } from 'react';
import { useMutation } from 'react-query';

const useRemoveKasus = () => {
    const [isID, setID] = useState<any>(false)
    let q = useMutation(async () => {
        const del = await fetch('/api/backend/remove_kasus?id=' + isID)
        const res = await del.json()
        return { ...res }
    })

    return { ...q, setID }
}

export default useRemoveKasus