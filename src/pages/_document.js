import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='h-full bg-gray-100 '>
      <Head>
        <title>E-commerce</title>
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </body>
    </Html>
  )
}
