import { useEffect, useState } from "react";

function useLanguage() {
  const [language, setLanguage] = useState("中文");

  useEffect(() => {
    chrome?.storage?.sync?.get("language").then((res) => {
      if (res.language) {
        setLanguage(res.language);
      }
    });
    const storageChange = ({
      language,
    }: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (language?.newValue !== language?.oldValue) {
        setLanguage(language?.newValue);
      }
    };
    chrome?.storage?.onChanged?.addListener(storageChange);
    return () => {
      chrome?.storage?.onChanged?.removeListener(storageChange);
    };
  }, []);
  return language;
}

export default useLanguage;
