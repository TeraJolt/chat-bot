type Props = {
    value: string;
    type: "user"|"ai";
}
export const ChatBallon = ({value, type}:Props) => {
    return (
        <div
            className={`
                flex
                relative
                items-end
                ${type === "user" && `
                    flex-row-reverse
                `}    
                ${type === "ai" && `
                    flex-row
                `}
            `}
        >
            <div
                className={`
                    absolute
                    flex
                    bottom-0
                    w-[16px]
                    h-[16px]
                    ${type === "user" && `
                        bg-custom-brand-one-100
                    `}    
                    ${type === "ai" && `
                        bg-custom-brand-two-50
                    `}
                    shadow-sm
                `}
            >
                <div
                    className={`
                        absolute
                        flex
                        bg-custom-brand-one-50    
                        bottom-0
                        w-[16px]
                        h-[16px]
                        ${type === "user" && "rounded-bl-full"}
                        ${type === "ai" && "rounded-br-full"}
                    `}
                />
            </div>
            <div
                className={`
                    flex
                    lg:max-w-6xl   
                    p-4
                    rounded-2xl
                    text-base
                    font-normal
                    text-custom-brand-one-900
                    ${type === "user" && `
                        bg-custom-brand-one-100
                        rounded-br-none
                        mr-[16px]
                    `}
                    ${type === "ai" && `
                        bg-custom-brand-two-50
                        rounded-bl-none
                        ml-[16px]
                    `}
                    shadow-sm
                `}
            >
                {value}
            </div>
        </div>
    )
}