import Script from 'next/script'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import VideoState from '../context/videos/VideoState'
import '../styles/globals.css'
import '../styles/nProgress.css'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'



function MyApp({ Component, pageProps }) {

  Router.events.on("routeChangeStart", (ur = -0) => {
    NProgress.start();

  })
  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done();
  })


  return (
    <>

      <Head>
        <meta name='asg_verification' content='vVcWCcbbgmnqv221hpAjPojb' />
        <meta name="Trafficstars" content="48702"/>
        <meta name="exoclick-site-verification" content="6b1112fe173bdf782d96975e70bd4b95"></meta>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#ffffff" />

        {/* Ads Netword Verification  */}
        <meta name="6a97888e-site-verification" content="80bd73765fca365d8238dc1ccbdd975f"></meta>

      </Head>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-6JFQKLE3DK"
      />

      <Script id="gtm-script" strategy="afterInteractive">
        {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-6JFQKLE3DK');`}
      </Script>


      <VideoState>

        {/* <LoginForm />
        <SignUpForm/>
        <SignUpFormOTP/>
        <PasswordReset/> */}
        <Navbar />
        <div className='basicMargin '>
          <Component {...pageProps} />
        </div>
        <hr />
        
        {/* <Footer /> */}
      </VideoState>
    </>
  )
}

export default MyApp


