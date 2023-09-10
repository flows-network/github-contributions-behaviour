import React, {useEffect, useState} from "react";
import Button from "./Button.tsx";
import Link from 'next/link'

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

    return (<div>
        <div className="cursor-pointer">
            {props.userData ? <img style={{minWidth: "2rem"}} onClick={toggleAccount} className="rounded-full w-8 h-8"
                                   src={props.userData.avatar}
                                   alt="userAvatar"/> :
                <div className="flex">
                    <Link href='/signup' className="flex py-2 mr-2 hover:bg-light-gray cursor-pointer">
                        <Button className="px-3 sm:px-5 py-1" type="primary" text="Sign up"/>
                    </Link>
                    <a
                        href={'https://github.com/login/oauth/authorize?client_id=' + process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID}
                        rel="opener"
                        className="flex py-2 hover:bg-light-gray cursor-pointer"
                        target="_blank">
                        <Button className="px-3 sm:px-5 py-1" type="normal" text="Sign in"/>
                    </a>
                </div>}
        </div>
        {/*
                    this part is for:
                        show login with GitHub or user list(Connectors, flow, sign Out etc.)
                */
            tabShow ? <div className="bg-white absolute right-8 top-24 rounded shadow-md">
                <ul className="list-none">
                    <li className="px-6 text-sm select-none py-3">{props.userData.username}</li>
                    <div className="h-px bg-gray-300"/>
                    <li className="hover:bg-main hover:text-white text-xs">
                        <Link className="block px-6 py-2" href="/api/logout">Sign Out</Link>
                    </li>
                </ul>
            </div> : ""}
    </div>)
}
