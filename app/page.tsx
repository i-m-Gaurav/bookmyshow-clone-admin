'use client';

import {useRouter} from 'next/navigation'

export default function Home() {

const router = useRouter();


  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <button onClick={()=>router.push('/AddEvent')}>User</button>
      </div>
    </div>
    
  );
}
