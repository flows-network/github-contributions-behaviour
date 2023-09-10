import './app.css'
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import Script from "next/script";
import {accountService} from "../services/index";
import type { AppProps } from 'next/app'

type myWindow = Window & {
    sign?: (code: string) => Promise<void>;
};

export default function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter();

    useEffect(() => {
        (window as myWindow).sign = async function (code: string) {
            await accountService.sign(code);
            router.push('/');
        };
    }, []);

    return (
        <>
            <Script src="https://accounts.google.com/gsi/client" async defer/>
            <Head>
                <title>Flows.network</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Streamline your workflows automation"/>
            </Head>
            <Component key={router.asPath} {...pageProps}/>
        </>
    )
}

