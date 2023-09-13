import Header from "../../components/Header"
import type {NextPage} from 'next'
import {GetServerSidePropsContext} from 'next';
import {behaviorService} from "../../services/index"
import Button from "../../components/Button";
import React, {useEffect, useRef, useState} from 'react';
import server from "../../helpers/server";
import {useRouter} from "next/router.js";

interface User {
    github_id: string,
    github_name: string,
    username: string,
    avatar: string,
    role: string,
    github_url: string
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const user = await server.serverSideLogin(context)
    if (user) {
        return {props: {user}}
    }
    return {props: {}}
}

const Home: NextPage = ({user}: { user: User }) => {

    const router = useRouter()
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const scrollTitle = useRef<null | HTMLDivElement>(null);

    const [id, setId] = useState("")
    const [owner, setOwner] = useState("")
    const [repo, setRepo] = useState("")
    const [dots, setDots] = useState("")
    const [progress, setProgress] = useState<number>(0);
    const [pageData, setPageData] = useState<string>("");
    const [beforeText, setBeforeText] = useState<string>("");
    const [afterText, setAfterText] = useState<string>("");
    const [thisWeek, setThisWeek] = useState<string>("");

    // 在这里定义一个异步函数，用于请求 URL 并更新进度
    const fetchData = async () => {
        setProgress(0);

        try {
            let timer = setInterval(() => {
                if (Math.random() > 0.5) {
                    setProgress((prevProgress) => {
                        if (prevProgress >= 90) {
                            clearInterval(timer)
                            setDots(".")
                            return 90;
                        }
                        return prevProgress + 1;
                    });
                }
            }, 600);

            const response = await behaviorService.saveBehavior(owner, repo, id);
            clearInterval(timer)
            setPageData(response.data)
            const splitIndex = response.data.indexOf("- ");
            const beforeText = response.data.slice(0, splitIndex);
            const regex = /Signed-off-by: .*?\n/gm;
            const cleanedText = beforeText.replace(regex, '');
            setBeforeText(cleanedText)
            const afterText = response.data.slice(splitIndex);
            const regex2 = /\n-/gm;
            const replacedText = afterText.replace(regex2, '\n\n-');
            setAfterText(replacedText)

            timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(timer);
                        return 100;
                    }
                    return prevProgress + 1;
                });
            }, Math.random() * 10);
        } catch (error) {
            // 处理请求失败的情况
            console.log(error)
        }
    };

    useEffect(() => {
        let dotAdd: NodeJS.Timeout | undefined;
        if (dots) {
            dotAdd = setInterval(() => {
                if (dots.length < 3) {
                    setDots(dots + '.');
                } else {
                    setDots('.');
                }
            }, 1000);
        }
        if (progress >= 100) {
            clearInterval(dotAdd)
        }
        return (() => {
            clearInterval(dotAdd)
        })
    }, [dots, progress])

    useEffect(() => {
        const currentDate = new Date(); // 获取当前日期

        const startDate = new Date(currentDate); // 创建开始日期的副本
        startDate.setDate(startDate.getDate() - 7);

        const endDate = new Date(currentDate); // 创建开始日期的副本

        const startDateString = startDate.toLocaleDateString(); // 获取开始日期的字符串
        const endDateString = endDate.toLocaleDateString(); // 获取结束日期的字符串

        const weekDay = `${startDateString} - ${endDateString}`; // 组合日期范围的字符串

        setThisWeek(weekDay)
    }, [])

    useEffect(() => {
        if (router.query.behaviorId) {
            const behaviorId = router.query.behaviorId as string;
            behaviorService.getBehavior(behaviorId).then(data => {
                const behaviorData = data.data
                setPageData(behaviorData.data)
                setId(behaviorData.githubId)
                setOwner(behaviorData.owner)
                setRepo(behaviorData.repo)
                const splitIndex = behaviorData.data.indexOf("- ");
                const beforeText = behaviorData.data.slice(0, splitIndex);
                const regex = /Signed-off-by: .*?\n/gm;
                const cleanedText = beforeText.replace(regex, '');
                setBeforeText(cleanedText)
                const afterText = behaviorData.data.slice(splitIndex);
                const regex2 = /\n-/gm;
                const replacedText = afterText.replace(regex2, '\n\n-');
                setAfterText(replacedText)
                setProgress(100)
                if (scrollRef.current) {
                    scrollRef.current.scrollIntoView({behavior: 'smooth'});
                }
            })
        }
    }, [router.query.behaviorId])

    return (
        <div className="relative overflow-x-hidden">
            {user ? "" : <div id="g_id_onload"
                              data-client_id={process.env.NEXT_PUBLIC_CLIENT_ID}
                              data-itp_support={true}
                              data-login_uri="https://jyccloud.cn/api/signByGoogle">
            </div>}
            <img className="absolute w-full" src="/Earth.png" alt="bg-Earth"/>
            <img style={{height: "45.7vw"}} className="absolute" src="/Light.png" alt="bg-Light"/>
            <div className="relative z-50">
                <Header userData={user}/>
                <div className="main-title font-medium mt-40 sm:mt-52 text-4xl sm:text-6xl text-center mx-4 sm:mx-0">
                    A GPT4 powered GitHub<br/>-
                    Contribution Insights Agent /<br/>
                    GitHub weekly report
                </div>
                <div className="text-gray-999 text-2xl mt-8 text-center mx-4 sm:mx-0">
                    Analyze your contributions (issues and pull requests) to an open source project.
                </div>
                <div className="flex-col sm:flex-row items-center flex justify-center mt-24">
                    <Button onClick={() => {
                        if (scrollTitle.current) {
                            scrollTitle.current.scrollIntoView({behavior: 'smooth'});
                        }
                    }} type="explore" className="font-bold text-xl rounded-lg mx-5 py-4 px-14" text="Explore Now"/>
                    <Button className="font-bold text-xl bg-sourceCodeButton rounded-lg mx-5 p-4 mt-5 sm:mt-0" type="normal"
                            text="See the Source Code"/>
                </div>
                <div className="flex justify-center mt-40">
                    <img style={{width: "74vw"}} className="rounded-2xl border-4 border-white" src="/main.svg"
                         alt="main image"/>
                </div>
                <div className="relative sm:-right-28 flex flex-col sm:flex-row items-center justify-center mt-24">
                    <div className="mx-14 sm:mr-0 sm:-ml-14">
                        <div style={{fontFamily: 'Oxanium, sans-serif'}} className="text-center sm:text-left font-medium text-4xl">Open source
                            developers
                        </div>
                        <div className="mt-6 text-2xl text-gray-999">This agent can be a token of your contribution to
                            open source projects. If you’re a full time open source developers, this agent can be your
                            weekly report generator. It can automatically summarize your key commits, pull requests,
                            issues closed and community interactions. The report saves you time writing updates while
                            providing metrics to showcase your work.
                        </div>
                    </div>
                    <img className="attached-image sm:mx-14 rounded-2xl border-2 border-dashed border-white"
                         src="/OpenSourceDevelopers.svg" alt="open source developers image"/>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center mt-24">
                    <img className="attached-image hidden sm:block mx-14 rounded-2xl" src="/ProjectLeader.svg"
                         alt="project leader image"/>
                    <div className="mx-14">
                        <div style={{fontFamily: 'Oxanium, sans-serif'}} className="text-center sm:text-left font-medium text-4xl">Project
                            leader
                        </div>
                        <div className="mt-6 text-2xl text-gray-999">This agent can be a team copilot to generate weekly
                            report for each member, summarizing the key accomplishments for every team member, so the
                            team leader can easily track progress and identify areas for improving team effectiveness.
                        </div>
                    </div>
                    <img className="attached-image sm:hidden mx-14 rounded-2xl" src="/ProjectLeader.svg"
                         alt="project leader image"/>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center mt-24">
                    <div className="mx-14">
                        <div style={{fontFamily: 'Oxanium, sans-serif'}} className="text-center sm:text-left font-medium text-4xl">Indie hacker
                        </div>
                        <div className="mt-6 text-2xl text-gray-999">This agent is a tool that help you build in public!
                            By generate a weekly report for you, this agent assistants you to be transparent and get
                            feedback from the community throughout your journey.
                        </div>
                    </div>
                    <img className="attached-image mx-14 rounded-2xl" src="/IndieHacker.svg"
                         alt="indie hacker image"/>
                </div>
                <div ref={scrollTitle} style={{fontFamily: 'Oxanium, sans-serif'}}
                     className="mt-40 font-medium text-4xl text-center">
                    <div className="pt-12">
                        Let ChatGPT analyze your contribution
                    </div>
                </div>
                <div className="flex justify-center">
                    <div ref={scrollRef}
                        style={progress === 0 && !pageData ? {width: "76vw"} : {
                        height: "max-content",
                        backgroundSize: "cover",
                        backgroundImage: "url(/h5Bg.svg)"
                    }}
                         className={"contribution-body bg-grayBg border border-white mt-10 rounded-2xl " + (progress === 0 && !pageData ? "py-16 px-10 sm:px-40" : "")}>
                        {
                            (pageData && progress >= 100) ? <div style={{height: "max-content"}}
                                                                 className="contribution-body z-50 flex flex-col items-center">
                                <img style={{width: "90%",minHeight: "1px"}} className="mt-12 rounded-2xl"
                                     src="/LineUp.svg"
                                     alt="indie hacker image"/>
                                <div style={{fontFamily: 'Oxanium, sans-serif', fontSize: "26px"}}
                                     className="flex w-full px-5 justify-around items-center tracking-wider text-center my-5">
                                    {thisWeek}
                                </div>
                                <img style={{width: "90%"}} className="rounded-2xl"
                                     src="/LineDown.svg"
                                     alt="indie hacker image"/>
                                <div className="contribution-content break-all text-center text-5xl mt-12" style={{
                                    fontFamily: 'Lalezar, sans-serif',
                                    textShadow: " 0px 4px 2px #9955FF"
                                }}>{`${id}'s contribution to ${owner}/${repo} project`}</div>
                                <div></div>
                                <div className="contribution-content relative p-10 mt-10 whitespace-pre-line text-3xl break-normal"
                                     style={{
                                         borderRadius: "2.5rem",
                                         border: "1px solid rgb(107,57,173)",
                                         background: "rgba(153, 85, 255, 0.2)",
                                         hyphens: "auto",
                                         wordWrap: "break-word"
                                     }}>
                                    <div className="small-div top-left"></div>
                                    <div className="small-div top-right"></div>
                                    <div className="small-div bottom-left"></div>
                                    <div className="small-div bottom-right"></div>
                                    <div className="overflow-auto h-full"
                                         dangerouslySetInnerHTML={{__html: beforeText}}/>
                                </div>
                                <div className="contribution-content relative p-10 mt-7 whitespace-pre-line text-3xl break-normal"
                                     style={{
                                         borderRadius: "2.5rem",
                                         border: "1px solid rgb(107,57,173)",
                                         background: "rgba(153, 85, 255, 0.2)",
                                         hyphens: "auto",
                                         wordWrap: "break-word"
                                     }}>
                                    <div className="small-div top-left"></div>
                                    <div className="small-div top-right"></div>
                                    <div className="small-div bottom-left"></div>
                                    <div className="small-div bottom-right"></div>
                                    <div className="overflow-auto h-full"
                                         dangerouslySetInnerHTML={{__html: afterText}}/>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center my-12 w-full justify-around">
                                    <Button onClick={() => {
                                        setProgress(0)
                                        setPageData("")
                                        setBeforeText("")
                                        setAfterText("")
                                        setId("")
                                        setRepo("")
                                        setOwner("")
                                    }} className="bg-grayBg rounded-2xl py-5 px-8 text-3xl" text="Make you own"
                                            type="normal"/>
                                </div>
                            </div> : progress === 0 ? (<div>
                                <div className="text-sm font-normal">GitHub ID</div>
                                <input placeholder="GitHub ID"
                                       value={id}
                                       onChange={(e) => {
                                           setId(e.target.value)
                                       }}
                                       className="w-full mt-2 border-0 bg-input rounded leading-10 px-3"/>
                                <div className="sm:flex mt-10">
                                    <div className="w-full mr-5">
                                        <div className="text-sm font-normal">GitHub Owner</div>
                                        <input placeholder="GitHub Owner"
                                               value={owner}
                                               onChange={(e) => {
                                                   setOwner(e.target.value)
                                               }}
                                               className="w-full mt-2 border-0 bg-input rounded leading-10 px-3"/>
                                    </div>
                                    <div className="mt-10 sm:mt-0 w-full">
                                        <div className="text-sm font-normal">Github Repo</div>
                                        <input placeholder="Github Repo"
                                               value={repo}
                                               onChange={(e) => {
                                                   setRepo(e.target.value)
                                               }}
                                               className="w-full mt-2 border-0 bg-input rounded leading-10 px-3"/>
                                    </div>
                                </div>
                                <div className="mt-12 flex justify-end">
                                    <Button type="explore" onClick={async () => {
                                        await fetchData()
                                    }} className="font-bold text-xl py-4 px-14 rounded-lg" text="Submit"/>
                                </div>
                            </div>) : <div style={{backgroundSize: "cover", backgroundImage: "url(/h5Bg.svg)"}}
                                           className="w-full z-50 h-screen flex flex-col justify-between items-center">
                                <div className="w-full flex flex-col items-center">
                                    <img style={{height: "52vh"}} className="pt-20 rounded-2xl" src="/GitHubCat.svg"
                                         alt="indie hacker image"/>
                                    <img style={{height: "15vh",marginTop:"-9vh"}} className="rounded-2xl"
                                         src="/GitHubBehaviorText.svg"
                                         alt="indie hacker image"/>
                                    <img style={{height: "3.65vh"}} className="mt-2 rounded-2xl"
                                         src="/BehaviorText.svg"
                                         alt="indie hacker image"/>
                                </div>
                                <div className="w-5/6 flex flex-col items-center justify-end text-2xl">
                                    <div style={{fontSize: "1.625rem", fontFamily: 'Oxanium, sans-serif'}}
                                         className="text-center">Generated by GPT4
                                    </div>
                                    <div style={{height: "3.8vh",marginTop:"3vh"}} className="w-full relative">
                                        <div style={{borderRadius: "1.9vh", height: "3.8vh"}}
                                             className="overflow-hidden absolute w-full border border-white">
                                            <div className="absolute" style={{
                                                borderRadius: "1.9vh",
                                                width: `${progress}%`,
                                                height: "3.8vh",
                                                background: "linear-gradient(270deg, rgba(223, 24, 255, 0.85) 0%, rgba(119, 85, 255, 0) 60%, rgba(223, 24, 255, 0) 60%)"
                                            }}/>
                                            <div style={{
                                                borderRadius: "1.9vh",
                                                width: `${progress}%`,
                                                height: "3.8vh",
                                                backgroundImage: "url(/Progress.svg)"
                                            }}/>
                                        </div>
                                    </div>
                                    <div style={{marginTop:"3vh",marginBottom:"3vh"}} className="text-main text-center">{dots ? "Analyzing" + dots : "Loading..."}</div>
                                </div>
                            </div>
                        }
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
                        <div className="mb-12 text-2xl font-semibold text-center">
                            You&apos;re using a private repo and want to generate your weekly work report.
                        </div>
                        <Button type="explore" className="font-bold text-xl py-4 px-14 rounded-lg"
                                text="Deploy Your Own"/>
                    </div>
                </div>
                <div style={{fontFamily: 'Oxanium, sans-serif'}} className="mt-52 font-medium text-4xl text-center">
                    Sign up for product updates
                </div>
                <div className="mt-14 h-24 flex justify-center font-bold">
                    <div className="subscribe-input flex flex-col sm:flex-row">
                        <input style={{lineHeight:"6rem"}} className="px-7 text-2xl w-full sm:w-3/4 bg-grayBg rounded-t-2xl rounded-b-none sm:rounded-l-2xl sm:rounded-r-none"
                               placeholder="Type your email address here"/>
                        <div>
                            <Button type="primary" className="text-2xl px-7 h-24 rounded-b-2xl rounded-t-none sm:rounded-r-2xl sm:rounded-l-none w-full"
                                    text="Subscribe"/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between mx-16 mb-10 mt-52">
                    <div className="flex items-center">
                        <img className="w-16 mr-2" src="/logo-only.svg" alt="main image"/>
                        <div>
                            <div className="font-medium text-gray-999">Powered by flows.network</div>
                            <div className="font-medium text-gray-999">Made by Jaykchen, in the process of career
                                transfer into software engineering
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-4 sm:mt-0 justify-around sm:justify-start w-full sm:w-auto items-center">
                        <img className="w-10 mr-3" src="/Twitter.svg" alt="main image"/>
                        <img className="w-10 mr-3" src="/Discord.svg" alt="main image"/>
                        <img className="w-10 mr-3" src="/GitHub.svg" alt="main image"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home