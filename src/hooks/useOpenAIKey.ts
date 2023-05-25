import { ChatGPTContext } from "@/context/ChatGPTContext";
import { useContext, useEffect } from "react";

function useOpenAIKey() {
  const { client } = useContext(ChatGPTContext);
  useEffect(() => {
    chrome?.storage?.sync?.get("apiKey").then((res) => {
      if (res.apiKey) {
        client.setApiKey(res.apiKey);
      }
    });
    const storageChange = ({
      apiKey,
    }: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (apiKey?.newValue !== apiKey?.oldValue) {
        client.setApiKey(apiKey?.newValue);
      }
    };
    chrome?.storage?.onChanged?.addListener(storageChange);
    return () => {
      chrome?.storage?.onChanged?.removeListener(storageChange);
    };
  }, []);
}

export default useOpenAIKey;
