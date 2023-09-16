import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const OderSuccessfull = () => {
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/loginPage");
    }
  }, []);
  return (
    <div> <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
    <div className="text-center">
      <p className="text-base font-semibold text-indigo-600">{user?.email}</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Order is successfully placed</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Oder No {router.query.id} </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back home
        </Link>
       
      </div>
    </div>
  </main></div>
  )
}

export default OderSuccessfull