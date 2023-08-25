import './globals.css'
import React from "react";
import {useRouter} from "next/router.js";
import Head from "next/head";
import Script from "next/script";

export default function MyApp({Component, pageProps}) {

    const router = useRouter()

    return (
        <>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-85B8CW1R8E"/>
            <Script
                id='google-analytics'
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `window.dataLayer = window.dataLayer || [];
                             function gtag(){
                             dataLayer.push(arguments);
                             }
                             gtag('js', new Date());
                             gtag('config', 'G-85B8CW1R8E', {
                             page_path: window.location.pathname,
                             });`
                }}
            />
            <Head>
                <title>Flows.network</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Streamline your workflows automation"/>
            </Head>
            <Component key={router.asPath} {...pageProps}/>
        </>
    )
}
