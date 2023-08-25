import React from "react";
import UserTab from "./UserTab.tsx";
import {useRouter} from "next/router";

export default function header(props) {
    return (<div
        className="flex text-lg justify-between w-full sticky top-0 h-20 items-center font-medium shadow z-50">
        <div className="pl-4 xl:pl-10">
            <a href={process.env.DOMAIN_NAME}>
                <img className="w-60" src="/logo-white.svg" alt="flows.network_logo"/>
            </a>
        </div>
        <div className="flex pr-6 xl:pr-10 pr-4 items-center">
            <UserTab userData={props.userData}/>
        </div>
    </div>)
}
