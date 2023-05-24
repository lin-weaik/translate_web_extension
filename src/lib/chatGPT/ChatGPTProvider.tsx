import { ChatGPTContext } from "@/context/ChatGPTContext";
import { ReactNode } from "react";
import { ChatGPTClient } from "./client";

export function ChatGPTProvider({ children, client }: { children: ReactNode, client: ChatGPTClient }) {
    return (
        <ChatGPTContext.Provider value={{ client }}>
            {children}
        </ChatGPTContext.Provider>
    )
}