import { ChatGPTContext } from "@/context/ChatGPTContext";
import getTranslatePrompt from "@/utils/getTranslatePrompt";
import { useContext, useEffect } from "react";

export default function useTranslate(language: string) {
    const { client } = useContext(ChatGPTContext)
    useEffect(() => {
        client.setPrompt(getTranslatePrompt(language))
    }, [language])
    return client.sendZeroMessage.bind(client)
}