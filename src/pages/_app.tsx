import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} className="dark-mode" />
}

export default MyApp
