import { ChatGPTClient } from "@/lib/chatGPT/client";
import { createContext } from "react";

export const ChatGPTContext =  createContext<{client: ChatGPTClient}>({
    client: new ChatGPTClient({})
})