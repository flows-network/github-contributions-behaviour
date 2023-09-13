import React, {useEffect, useState} from "react";
import Button from "./Button.tsx";
import Link from 'next/link';

let flag = false

interface UserProps {
    userData: {
        username?: string,
        avatar?: string
    }
}

export default function UserTab(props: UserProps) {
    const [tabShow, setTabShow] = useState(false) //controls the display of tabShow

    const closeTab = () => {
        flag || setTabShow(false);
        flag = false
    }

    useEffect(() => {
        //click other place to close userTab
        document.addEventListener("click", closeTab)
        //Unload on page close or refresh
        return () => {
            document.removeEventListener("click", closeTab)
        }
    }, [])

    const toggleAccount = () => {
        setTabShow(!tabShow)
        flag = true
    }

    const handleGoogleLogin = () => {
        google.accounts.id.initialize({
            client_id: process.env.NEXT_PUBLIC_CLIENT_ID,itp_support: true, login_uri: "https://jyccloud.cn/api/signByGoogle",
        });
        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                console.log("opted out");
            }
        });
    };

    return (<div>
        <div className="cursor-pointer">
            {props.userData ? <img style={{minWidth: "2rem"}} onClick={toggleAccount} className="rounded-full w-8 h-8"
                                   src={props.userData.avatar}
                                   alt="userAvatar"/> :
                <div className="flex items-center">
                    <a
                        href={'https://github.com/login/oauth/authorize?client_id=' + process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID}
                        rel="opener"
                        className="flex hover:bg-light-gray cursor-pointer"
                        target="_blank">
                        <Button className="p-1.5 px-1.5 lg:px-5" type="normal">
                            <div className="hidden lg:block">
                                Sign by GitHub
                            </div>
                            <img style={{width:"27px"}} className="block lg:hidden" src="/GitHub.svg"
                                 alt="main image"/>
                        </Button>
                    </a>
                    <div
                        onClick={() => {
                            handleGoogleLogin()
                        }}
                        className="hidden lg:block g_id_signin px-3 lg:px-5 py-1"
                    />
                    <div
                        onClick={() => {
                            handleGoogleLogin()
                        }}
                        data-type="icon"
                        className="block lg:hidden g_id_signin px-3 lg:px-5 py-1"
                    />
                </div>}
        </div>
        {/*
                    this part is for:
                        show login with GitHub or user list(Connectors, flow, sign Out etc.)
                */
            tabShow ? <div className="bg-white absolute right-8 top-24 rounded shadow-md">
                <ul className="text-black list-none">
                    <li className="px-6 text-sm select-none py-3">{props.userData.username}</li>
                    <div className="h-px bg-gray-300"/>
                    <li className="hover:bg-main hover:text-white text-xs">
                        <Link href="/api/logout"><div className="block px-6 py-2">Sign Out</div></Link>
                    </li>
                </ul>
            </div> : ""}
    </div>)
}
