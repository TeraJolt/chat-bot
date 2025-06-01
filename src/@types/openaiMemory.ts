export type Message = {
    role: "system" | "user" | "assistant",
    content: string,
}
export type OpenAiMemory = {
    model: "gpt-4o-mini",
    messages: Message[]
}