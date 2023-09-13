import React from "react";
import UserTab from "./UserTab.tsx";

interface HeaderProps {
    userData: object
}

export default function Header(props: HeaderProps) {
    return (<div
        className="flex text-lg justify-between w-full sticky top-0 h-20 items-center font-medium shadow z-50">
        <div className="pl-4 xl:pl-10">
            <a href={process.env.DOMAIN_NAME}>
                <img style={{width:"4.5rem"}} className="small-hidden" src="/logo-only.svg" alt="flows.network_logo"/>
                <img className="small-show w-60" src="/logo-white.svg" alt="flows.network_logo"/>
            </a>
        </div>
        <div className="flex pr-6 xl:pr-10 pr-4 items-center">
            <UserTab userData={props.userData}/>
        </div>
    </div>)
}
