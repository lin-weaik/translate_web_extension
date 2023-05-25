import useLanguage from "@/hooks/useLanguage";
import useOpenAIKey from "@/hooks/useOpenAIKey";
import useTranslate from "@/hooks/useTranslate";
import { useEffect, useState } from "react";

function calculateButtonPosition(selection: Selection): [number, number] {
  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();
  return [rect.right - (rect.right - rect.left) * 0.5, rect.bottom];
}

function Popover() {
  const language = useLanguage()
  const t = useTranslate(language);
  const [selectText, setSelectText] = useState("");
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');
  useOpenAIKey()

  useEffect(() => {
    const handleMouseupChange = () => {
      const selection = window?.getSelection();
      const selectedText = selection?.toString();
      if (selectedText && selection) {
        setSelectText(selectedText);
        setPos(calculateButtonPosition(selection));
        setShow(true);
        setOpen(false);
      }
    };
    document.addEventListener("mouseup", handleMouseupChange);
    return () => {
      document.removeEventListener("mouseup", handleMouseupChange);
    };
  }, []);

  useEffect(() => {
    const handleSelectionChange = () => {
      const selectedText = window?.getSelection()?.toString();
      if (!selectedText) {
        setShow(false);
      }
    }
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true)
    setLoading(true)
    t(selectText).then(res => setOutput(res || '')).catch((error) => {
      setOutput(error.toString())
    }).finally(() => setLoading(false))
  }


  return (
    <div style={{ display: show ? "block" : "none" }}>
      <button
        style={{
          position: "fixed",
          left: `${pos[0]}px`,
          top: `${pos[1]}px`,
          display: open ? "none" : "block",
          zIndex: 9999,
          backgroundColor: 'blanchedalmond',
          borderRadius: '8px',
          border: 'none',
          color: '#000',
          fontSize: '14px',
          padding: '8px 10px'
        }}
        onClick={handleOpen}
      >
        翻译
      </button>
      <div
        style={{
          position: "fixed",
          left: `${pos[0]}px`,
          top: `${pos[1]}px`,
          display: open ? "block" : "none",
          background: '#fff',
          padding: '10px 18px',
          boxShadow: 'rgba(93, 67, 119, 0.25) 0px 4px 8px',
          zIndex: 9999,
          fontSize: '14px',
          color: '#000'
        }}
      >
        {
          loading ? 'loading...' : output
        }
      </div>
    </div>
  );
}

export default Popover;
