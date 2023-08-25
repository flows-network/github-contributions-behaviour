import {useState} from "react";
import Lottie from "react-lottie";
import roundLoading from "../media/roundLoading.json";

export default function Button({onClick, className, disabled, type, size,notRounded,loading, text}) {
    const [buttonState, setButtonState] = useState(true)
    const [loadingState, setLoadingState] = useState(false)

    const buttonFunc = async (e) => {
        setButtonState(false)
        setLoadingState(true)
        try {
            await onClick(e)
            setButtonState(true)
            setLoadingState(false)
        } catch (e) {
            setButtonState(true)
            setLoadingState(false)
        }
    }

    return (<div className="relative">
        <button
            className={"flex justify-center items-center select-none " + (type && !disabled ? type : "") + (className ? " " + className : "") + (loadingState ? " cursor-not-allowed" : "") + (notRounded? "": " rounded")}
            onClick={(e) => disabled ? {} : (buttonState ? buttonFunc(e) : {})}>
            {loadingState || loading ?
                <Lottie.default style={{margin: 0}} width={size === "small" ? "1rem" : "2rem"}
                                height={size === "small" ? "1rem" : "2rem"} options={{
                    loop: true,
                    autoplay: true,
                    rendererSettings: {preserveAspectRatio: 'xMidYMid slice'},
                    animationData: roundLoading
                }}/>
                : <></>}
            {text}
        </button>
    </div>)
}