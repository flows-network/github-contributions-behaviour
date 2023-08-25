import Header from "../components/Header"
import Button from "@/components/Button";
import React, {useState} from 'react';

export default function Home() {

    const [ID,setID] = useState("")
    const [owner,setOwner] = useState("")
    const [repo,setRepo] = useState("")
    return (
        <div className="relative overflow-x-hidden">
            <img className="absolute w-full" src="/Earth.png" alt="bg-Earth"/>
            <img style={{height: "45.7vw"}} className="absolute" src="/Light.png" alt="bg-Light"/>
            <div className="relative z-50">
                <Header/>
                <div style={{lineHeight: "4.5rem", fontFamily: 'Oxanium, sans-serif'}}
                     className="font-medium mt-52 text-6xl text-center">
                    A GPT4 powered GitHub<br/>
                    Contribution Insights Agent /<br/>
                    GitHub weekly report
                </div>
                <div className="text-gray-999 text-2xl mt-8 text-center">
                    Analyze your contributions (issues and pull requests) to an open source project.
                </div>
                <div className="flex justify-center mt-24">
                    <Button type="explore" className="font-bold text-xl rounded-lg mx-5 py-4 px-14" text="Explore Now"/>
                    <Button className="font-bold text-xl bg-sourceCodeButton rounded-lg mx-5 p-4" type="normal"
                            text="See the Source Code"/>
                </div>
                <div className="flex justify-center mt-40">
                    <img style={{width: "74vw"}} className="rounded-2xl border-4 border-white" src="/main.svg"
                         alt="main image"/>
                </div>
                <div className="relative -right-28 flex items-center justify-center mt-24">
                    <div className="-ml-14">
                        <div style={{fontFamily: 'Oxanium, sans-serif'}} className="font-medium text-4xl">Open source
                            developers
                        </div>
                        <div className="mt-6 text-2xl text-gray-999">This agent can be a token of your contribution to
                            open source projects. If you’re a full time open source developers, this agent can be your
                            weekly report generator. It can automatically summarize your key commits, pull requests,
                            issues closed and community interactions. The report saves you time writing updates while
                            providing metrics to showcase your work.
                        </div>
                    </div>
                    <img style={{width: "42vw"}} className="mx-14 rounded-2xl border-2 border-dashed border-white"
                         src="/OpenSourceDevelopers.svg" alt="open source developers image"/>
                </div>
                <div className="flex items-center justify-center mt-24">
                    <img style={{width: "42vw"}} className="mx-14 rounded-2xl" src="/ProjectLeader.svg"
                         alt="project leader image"/>
                    <div className="mx-14">
                        <div style={{fontFamily: 'Oxanium, sans-serif'}} className="font-medium text-4xl">Project
                            leader
                        </div>
                        <div className="mt-6 text-2xl text-gray-999">This agent can be a team copilot to generate weekly
                            report for each member, summarizing the key accomplishments for every team member, so the
                            team leader can easily track progress and identify areas for improving team effectiveness.
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-24">
                    <div className="mx-14">
                        <div style={{fontFamily: 'Oxanium, sans-serif'}} className="font-medium text-4xl">Indie hacker
                        </div>
                        <div className="mt-6 text-2xl text-gray-999">This agent is a tool that help you build in public!
                            By generate a weekly report for you, this agent assistants you to be transparent and get
                            feedback from the community throughout your journey.
                        </div>
                    </div>
                    <img style={{width: "42vw"}} className="mx-14 rounded-2xl" src="/IndieHacker.svg" alt="indie hacker image"/>
                </div>
                <div style={{fontFamily: 'Oxanium, sans-serif'}} className="mt-52 font-medium text-4xl text-center">Let
                    ChatGPT analyze your contribution
                </div>
                <div className="flex justify-center">
                    <div style={{width: "76vw"}}
                          className="bg-grayBg py-16 px-40 border border-white mt-10 rounded-2xl">
                        <div className="text-sm font-normal">GitHub ID</div>
                        <input placeholder="GitHub ID"
                               value={ID}
                               onChange={(e)=>{
                                   setID(e.target.value)
                               }}
                               className="w-full mt-2 border-0 bg-input rounded leading-10 px-3"/>
                        <div className="flex mt-10">
                            <div className="w-full mr-5">
                                <div className="text-sm font-normal">GitHub Owner</div>
                                <input placeholder="GitHub Owner"
                                       value={owner}
                                       onChange={(e)=>{
                                           setOwner(e.target.value)
                                       }}
                                       className="w-full mt-2 border-0 bg-input rounded leading-10 px-3"/>
                            </div>
                            <div className="w-full">
                                <div className="text-sm font-normal">Github Repo</div>
                                <input placeholder="Github Repo"
                                       value={repo}
                                       onChange={(e)=>{
                                           setRepo(e.target.value)
                                       }}
                                       className="w-full mt-2 border-0 bg-input rounded leading-10 px-3"/>
                            </div>
                        </div>
                        <div className="mt-12 flex justify-end">
                            <Button type="explore" onClick={()=>{

                            }} className="font-bold text-xl py-4 px-14 rounded-lg" text="Submit "/>
                        </div>
                    </div>
                </div>
                <div className="mt-40 flex justify-center">
                    <div style={{width: "76vw"}}>
                        <div className="text-2xl flex items-center justify-between">
                            <div>
                                What kind of contributions does Evan You make to Vue.js?
                            </div>
                            <div className="flex items-center">
                                <div>Check it out</div>
                                <img className="w-6 ml-3" src="/arrow-tr.svg" alt="main image"/>
                            </div>
                        </div>
                        <div className="border border-line my-14"/>
                        <div className="text-2xl flex items-center justify-between">
                            <div>
                                What kind of contributions does Niko Matsakis make to Rust?
                            </div>
                            <div className="flex items-center">
                                <div>Check it out</div>
                                <img className="w-6 ml-3" src="/arrow-tr.svg" alt="main image"/>
                            </div>
                        </div>
                        <div className="border border-line my-14"/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div style={{width: "83vw"}}
                         className="flex items-center flex-col bg-grayBg p-12 border border-white mt-28 rounded-2xl">
                        <div className="text-2xl font-semibold text-center">You're using a private repo and want to generate your weekly work report. </div>
                        <Button type="explore" className="mt-12 font-bold text-xl py-4 px-14 rounded-lg" text="Deploy Your Own"/>
                    </div>
                </div>
                <div style={{fontFamily: 'Oxanium, sans-serif'}} className="mt-52 font-medium text-4xl text-center">
                    Sign up for product updates
                </div>
                <div className="mt-14 h-24 flex justify-center font-bold">
                    <div style={{width:"46vw"}} className="flex">
                        <input className="px-7 text-2xl w-3/4 bg-grayBg rounded-l-2xl rounded-r-none" placeholder="Type your email address here"/>
                        <div>
                            <Button type="primary" className="text-2xl px-7 h-24 rounded-r-2xl rounded-l-none" text="Subscribe"/>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mx-16 mb-10 mt-52">
                    <div className="flex items-center">
                        <img className="w-16 mr-2" src="/logo-only.svg" alt="main image"/>
                        <div>
                            <div className="font-medium text-gray-999">Powered by flows.network</div>
                            <div className="font-medium text-gray-999">Made by Jaykchen, in the process of career transfer into software engineering</div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <img className="w-10 mr-3" src="/Twitter.svg" alt="main image"/>
                        <img className="w-10 mr-3" src="/Discord.svg" alt="main image"/>
                        <img className="w-10 mr-3" src="/GitHub.svg" alt="main image"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
