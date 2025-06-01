"use client"


import { ChatBallon } from "@/components/chatBallon";
import { TextArea2 } from "@/components/textArea";
import { gptHandler } from "@/handler/gptHandler";
import { useRef, useState } from "react";

export default function Chat(){
    const [userInput, setUserInput] = useState<string>("");
    const [userInputList, setUserInputList] = useState<string[]>([]);
    const [aiResponseList, setAiResponseList] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if(chatEndRef.current) {
            chatEndRef.current.scrollTop = chatEndRef.current.scrollHeight;
        }
    }
    
    const handleSendButton = async() => {
        if(userInput.length > 0){
            const input = userInput;
            setUserInput("");
            setUserInputList((prev) => [...prev, input]);
            setLoading(true);
            const output = await gptHandler(input);
            if(output){
                setAiResponseList(prev=>[...prev, output])
            }
            scrollToBottom();
            setLoading(false);
        }
    };
    
    return(
        <div className="flex fixed inset-0 overflow-hidden overflow-y-scroll bg-custom-brand-one-50">
            <div
                className={`
                    flex
                    flex-1
                    flex-col
                    px-[24px]
                    lg:px-32
                    pt-28
                    lg:pt-24
                    pb-10 
                    gap-[16px]
                `}
            >
                <div
                    ref={chatEndRef}
                    className={`
                        flex
                        flex-col
                        flex-1
                        w-full
                        overflow-hidden
                        overflow-y-scroll
                        scrollbar-thin
                        scrollbar-none
                        gap-[24px]  
                    `}
                >
                    {userInputList.map((userInput, index)=>(
                        <div key={index} className="flex flex-col gap-[24px]">
                            <ChatBallon type="user" value={userInput}/>
                            <ChatBallon type="ai" value={aiResponseList[index]}/>
                        </div>
                    ))}
                </div>
                <div
                    className="flex"
                >
                    <TextArea2
                        placeholder={"Escreva aqui"}
                        value={userInput}
                        setValue={setUserInput}
                        onClick={()=>{handleSendButton()}}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    )
}