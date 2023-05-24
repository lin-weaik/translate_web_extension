import { useEffect, useState } from 'react';
import './popup.css'
function Popup() {
  const [value, setValue] = useState()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const keyInput = document.querySelector('input[name=key]') as HTMLInputElement;
    const languageSelect = document.querySelector('select[name=language]') as HTMLSelectElement;
    chrome?.storage?.sync?.set({ language: languageSelect.value }, () => {
      alert('保存成功')
    })
  }

  useEffect(() => {
    chrome?.storage?.sync?.get('language', (res) => {
      setValue(res.language || '中文')
    })
  }, [])

  return (
    <div className="App_pop">
      <form style={{ width: '100%' }} onSubmit={handleSubmit}>
        <div className="title">welcome</div>
        {/* <input name='key' type="text" placeholder="enter your openAI key" /> */}
        {
          value && (
            <select name='language' defaultValue={value}>
              <option>中文</option>
              <option>英文</option>
              <option>日文</option>
            </select>
          )
        }
        <button type='submit'>save</button>
      </form>
    </div>
  );
}

export default Popup;
