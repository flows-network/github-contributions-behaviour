import React, {useState} from "react";
import Button from "../components/Button";

import googleOneTap from 'google-one-tap';

export default function SignUp() {
    const [loading, setLoading] = useState(false)

    const handleGoogleLogin = () => {

        const options = {
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID, // required
            auto_select: false, // optional
            cancel_on_tap_outside: false, // optional
            context: 'signin', // optional
        };

        googleOneTap(options, (response) => {
            // Send response to server
            console.log(response);
        });

        // google.accounts.id.initialize({
        //     client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        //     callback: (data)=>{
        //         console.log(data)
        //     }
        // });
        //
        // google.accounts.id.prompt((notification) => {
        //     if (notification && notification.isNotDisplayed()) {
        //         console.log('Google login successful!', notification.getCredential());
        //     }
        // }).then(a=>{
        //     console.log(a)
        // });
    };

    return (
        <div className="text-black flex flex-col justify-center items-center h-screen bg-gray-f5 overflow-hidden">
            <img width="336" src="/logo-white.svg" alt="flows.network_logo"/>
            <div className="border rounded bg-white px-10 py-6 flex flex-col items-center">
                <span className="font-bold text-xl tracking-wider self-center">Welcome to our website! 🥳</span>

                <div className="relative">
                    <Button
                        onClick={() => {
                            setLoading(true)
                            window.open('https://github.com/login/oauth/authorize?client_id=' + process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID, "Flows.network github login in", {popup: true})
                        }}
                        type="normal"
                        size="small"
                        loading={loading}
                        className="mt-5 px-4 py-2 bg-gray-999"
                    >
                        <img className="mr-2" width="26" src="/GitHubBlack.svg" alt="GitHub_logo"/>Login with GitHub
                    </Button>
                </div>
                <div className="relative">
                    {/*<div id="g_id_onload"*/}
                    {/*     data-client_id={process.env.NEXT_PUBLIC_CLIENT_ID}*/}
                    {/*     data-login_uri="https://flows.netork"*/}
                    {/*     data-your_own_param_1_to_login="any_value"*/}
                    {/*     data-your_own_param_2_to_login="any_value">*/}
                    {/*    123*/}
                    {/*</div>*/}
                    <Button
                        onClick={() => {
                            setLoading(true)
                            handleGoogleLogin()
                            // window.open('https://github.com/login/oauth/authorize?client_id=' + process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID, "Flows.network github login in", {popup: true})
                        }}
                        type="primary"
                        size="small"
                        loading={loading}
                        text="Continue to contributions>"
                        className="mt-5 px-4 py-2"
                    />
                </div>

                <div id="g_id_onload"
                     data-client_id="YOUR_GOOGLE_CLIENT_ID"
                     data-callback="handleCredentialResponse">
                </div>
            </div>
        </div>
    )
}