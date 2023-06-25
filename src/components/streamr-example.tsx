import { useSubscribe } from "streamr-client-react"

const StreamrExample = (prop: { sId: string; connected: boolean }) => {
    const streamId = prop.sId
    const connected = prop.connected
    const user = window.ethereum.selectedAddress
    
    var placeholder = "Messages from the stream will appear here"
    if (!connected) {
        placeholder = "Not connected to any stream"
    }

    useSubscribe(streamId, {
        onMessage: (msg) => {
            if (!connected) {
                placeholder = "Not connected to any stream"
                return
            }
            const textArea = document.querySelector("textarea")
            if (textArea) {
                const val = msg.getContent()
                const sender = msg.getPublisherId()
                const senderShort = `${sender.slice(0, 3)}...${sender.slice(-3)}`

                if (sender === user) {
                    textArea.value += `You: ${val}\n`
                } else {
                    textArea.value += `${senderShort}: ${val}\n`
                }
            }
        },
    })

    return (
        <div className="flex flex-col items-center justify-center p-0 mt-0">
            <textarea
                readOnly={true}
                className="text-l text-left text-black bg-white rounded m-2 w-96 h-96"
                placeholder={placeholder}
            />
        </div>
    )
}

export default StreamrExample
