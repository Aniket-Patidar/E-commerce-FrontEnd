import Image from 'next/image'
import { Inter } from 'next/font/google'
import ProductList from '@/components/Product/component/ProductList'
import Navbar from '@/components/Navbar/Navbar'
import Protected from '@/components/protected/Protected'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <ProductList />
    </>
  )
}
