import { useState } from 'react';
import { useMutation } from 'react-query';
import { signJWT, verifyJWT } from '~/modules/utils';

const useAddKasus = () => {
  const [isData, setData] = useState<any>(false)
  let q = useMutation(async () => {
    const add = await fetch('/api/backend/add_kasus?token=' + await signJWT(isData))
    const res = await add.json()
    return verifyJWT(res.token)
  })

  return { ...q, setData }
}

export default useAddKasus