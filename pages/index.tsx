import Home from '@/templates/home'
import Head from 'next/head'

export default function home() {
  return (
    <>
      <Head>
        <title>ダーツシミュレーション</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta property="og:title" content="ダーツシミュレーション" />
        <meta property="og:description" content="ダーツの挙動を 3D 空間でシミュレーションします" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://darts-simulate.netlify.app/" />
        <meta property="og:image" content="https://darts-simulate.netlify.app/favicon.png" />
        <meta property="og:site_name" content="ダーツシミュレーション" />
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="180" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@takato_ezaki" />
        <meta name="twitter:url" content="https://darts-simulate.netlify.app/" />
        <meta name="twitter:title" content="ダーツシミュレーション" />
        <meta name="twitter:description" content="ダーツの挙動を 3D 空間でシミュレーションします" />
        <meta name="twitter:image" content="https://darts-simulate.netlify.app/favicon.png" />
      </Head>
      <Home/>
    </>
  )
}
