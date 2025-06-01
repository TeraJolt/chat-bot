"use client"

import { useRef } from "react"
import { HiOutlinePaperAirplane, HiOutlinePaperClip } from "react-icons/hi";

type Props = {
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
    onClick: () => void;
    disabled?: boolean;
}
export const TextArea = ({placeholder, value, setValue, onClick}:Props) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }
    return (
        <>
            <textarea 
                ref={textareaRef}
                className={`
                    flex
                    flex-1
                    px-[16px]
                    py-[8px]
                    bg-white
                    rounded-3xl   
                    shadow-sm
                    text-base
                    leading-6
                    font-normal
                    text-custom-coolGray-500
                    resize-none
                    scrollbar-thin
                    self-center
                `}
                value={value}
                onInput={handleInput}
                onChange={(e)=> setValue(e.currentTarget.value)}
                placeholder={placeholder}
                rows={1}
                
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        e.preventDefault();
                        onClick();
                    }
                }}
            />
            <button
                className={`
                    flex
                    bg-custom-brand-two-700
                    p-[14px]
                    rounded-full
                `}
                onClick={() => onClick()}
            >
                <HiOutlinePaperAirplane/>
            </button>
        </>
    )
}

export const TextArea2 = ({placeholder, value, disabled, setValue, onClick}:Props) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }
    return (
        <div
            className={`
                flex
                flex-1
                flex-row
                items-end
                bg-white
                border-[1px]
                border-custom-coolGray-300
                rounded-3xl  
                px-[16px]
                py-[8px]
                gap-[16px]
            `}
        >
            <textarea 
                ref={textareaRef}
                className={`
                    flex
                    flex-1
                    flex-row
                    bg-transparent
                    border-transparent
                    text-base
                    leading-6
                    font-normal
                    text-custom-coolGray-500
                    resize-none
                    overflow-hidden
                    overflow-y-scroll
                    scrollbar-thin 
                    self-center
                    px-[3px]
                    py-[6px]
                    scrollbar-none
                `}
                value={value}
                onInput={handleInput}
                onChange={(e) => setValue(e.currentTarget.value)}
                placeholder={placeholder}
                rows={1}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        e.preventDefault();
                        onClick();
                    }
                }}
            />
            <div className={`flex flex-row items-center gap-[16px]`}>
                <div className="text-custom-brand-one-900 text-lg">
                    <HiOutlinePaperClip/>
                </div>
                <button
                    className={`
                        flex
                        bg-custom-brand-two-700
                        text-white
                        p-[14px]
                        rounded-full
                    `}
                    onClick={() => onClick()}
                    disabled={disabled}
                >
                    <HiOutlinePaperAirplane/>
                </button>
            </div>
        </div>
    )
}