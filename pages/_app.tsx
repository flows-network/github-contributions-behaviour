import './globals.css'
import React, {useEffect} from "react";
import {useRouter} from "next/router.js";
import Head from "next/head";
import Script from "next/script";
import {accountService} from "@/services/index";


interface MyAppProps {
    Component: React.ComponentType;
    pageProps: Record<string, unknown>;
}

type myWindow = Window & {
    sign?: (code: string) => Promise<void>;
};

export default function MyApp({Component, pageProps}: MyAppProps) {
    const router = useRouter();

    useEffect(() => {
        (window as myWindow).sign = async function (code: string) {
            await accountService.sign(code);
            router.push('/');
        };
    }, []);

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
