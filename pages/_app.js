import './globals.css'
import React, {useEffect} from "react";
import {useRouter} from "next/router.js";
import Head from "next/head";
import Script from "next/script";
import {accountService} from "@/services/index";


export default function MyApp({Component, pageProps}) {
    const router = useRouter();

    useEffect(() => {
        window.sign = async function (code) {
            await accountService.sign(code);
            router.push('/');
        };
    }, []);

    return (
        <>
            <script src="https://accounts.google.com/gsi/client" async defer/>
            <Head>
                <title>Flows.network</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="description" content="Streamline your workflows automation"/>
            </Head>
            <Component key={router.asPath} {...pageProps}/>
        </>
    )
}
