import Provider from "streamr-client-react"
import SubscribeStream from "./components/subscribe-stream"
import CreateStream from "./components/create-stream"
import CreateContact from "./components/add-contact"
import { useState } from "react"
import SendMessage from "./components/send-message"
import StreamrExample from "./components/streamr-example"
import ConnectStream from "./components/connect-stream"
import StreamrClient from "streamr-client"
import ConnectWallet from "./components/connect-wallet"

// my stream: 0x3e1edd9085b432a33b469d96d54184beff835c4c/break
function App() {
    const [streamId, setStreamId] = useState("")
    const [connected, setConnected] = useState(false)
    const [wallet, setWallet] = useState(false)
    const options = {
        auth: { ethereum: window.ethereum },
    }
    const streamr = new StreamrClient(options)
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24">
            <h1 className="absolute text-6xl top-5 mb-0 font-bold text-center text-white">
                StreamrChat
            </h1>
            <p className="text-2xl text-center mt-0 text-white">A chat app built on Streamr</p>
            <Provider {...options}>
                <ConnectWallet wallet={wallet} setWallet={setWallet}></ConnectWallet>
                <SubscribeStream streamrclient={streamr}></SubscribeStream>
                <CreateStream streamrclient={streamr}></CreateStream>
                <CreateContact
                    sId={streamId}
                    connected={connected}
                    streamrclient={streamr}
                ></CreateContact>
                <SendMessage
                    sId={streamId}
                    connected={connected}
                    streamrclient={streamr}
                ></SendMessage>
                <StreamrExample sId={streamId} connected={connected}></StreamrExample>
                <ConnectStream
                    sId={streamId}
                    setSId={setStreamId}
                    connected={connected}
                    setConnected={setConnected}
                    streamrclient={streamr}
                ></ConnectStream>
            </Provider>
        </main>
    )
}

export default App
