import React, { useState, MouseEvent } from 'react';
import Lottie from 'react-lottie';
import roundLoading from '../media/roundLoading.json';

interface ButtonProps {
    onClick?: (event: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
    className?: string;
    disabled?: boolean;
    type?: string;
    size?: 'small' | 'large';
    notRounded?: boolean;
    loading?: boolean;
    text?: string;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
    const { onClick, className, disabled, type, size, notRounded, loading, text, children } = props;
    const [buttonState, setButtonState] = useState<boolean>(true);
    const [loadingState, setLoadingState] = useState<boolean>(false);

    const buttonFunc = async (e: MouseEvent<HTMLButtonElement>) => {
        setButtonState(false);
        setLoadingState(true);
        try {
            if(onClick){
                await onClick(e);
            }
            setButtonState(true);
            setLoadingState(false);
        } catch (e) {
            setButtonState(true);
            setLoadingState(false);
        }
    };

    const lottieOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
        animationData: roundLoading,
    };

    return (
        <div className="relative">
            <button
                className={`flex justify-center items-center select-none ${type && !disabled ? type : ''}${
                    className ? ' ' + className : ''
                }${loadingState ? ' cursor-not-allowed' : ''}${notRounded ? '' : ' rounded'}`}
                onClick={(e) => (disabled ? undefined : buttonState ? buttonFunc(e) : undefined)}
            >
                {loadingState || loading ? (
                    <Lottie style={{ margin: 0 }} width={size === 'small' ? '1rem' : '2rem'} height={size === 'small' ? '1rem' : '2rem'} options={lottieOptions} />
                ) : (
                    <></>
                )}
                {children ? children : text}
            </button>
        </div>
    );
};

export default Button;