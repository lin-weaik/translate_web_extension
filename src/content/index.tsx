import ReactDOM from 'react-dom/client';
import Popover from './Popover';
import { ChatGPTProvider } from '@/lib/chatGPT/ChatGPTProvider';
import { ChatGPTClient } from '@/lib/chatGPT/client';

let popover = document.createElement('div')
document.body.appendChild(popover)
const root = ReactDOM.createRoot(popover)

root.render(
    <ChatGPTProvider client={new ChatGPTClient()}>
        <Popover />
    </ChatGPTProvider>
);