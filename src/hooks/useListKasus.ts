import { useMutation } from 'react-query';

const useListKasus = () => {
    let q = useMutation(['listKasus'], async () => {
        const add = await fetch('/api/backend/list_kasus')
        const res = await add.json()
        return { ...res }
    })
    return { ...q }
}

export default useListKasus