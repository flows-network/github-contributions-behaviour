import './globals.css'
import React, {useEffect} from "react";
import {useRouter} from "next/router.js";
import Head from "next/head";
import Script from "next/script";
import {accountService} from "@/services/index"

export default function MyApp({Component, pageProps}) {

    const router = useRouter()

    useEffect(() => {
        window.sign = async function (code) {
            await accountService.sign(code);
            router.push("/")
        }
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/platform.js';
        script.addEventListener('load', () => {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                });
            });
        });
        document.body.appendChild(script);
    }, [])


    return (
        <>
            <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-85B8CW1R8E"/>
            <script src="https://accounts.google.com/gsi/client" async defer/>
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
