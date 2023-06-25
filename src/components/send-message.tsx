import StreamrClient from "streamr-client"
import { StreamPermission } from "streamr-client"
import { useState } from "react"
declare var window: any

interface SendMessageProps {
    sId: string
    connected: boolean
    streamrclient: StreamrClient
}

const SendMessage = (prop: SendMessageProps) => {
    const [msg, setMsg] = useState("")
    const streamId = prop.sId
    const connected = prop.connected
    const user = window.ethereum.selectedAddress
    const streamr = prop.streamrclient
    var placeholder = "Not connected to any stream"
    if (connected) {
        placeholder = "Enter your message"
    }
    async function handleSendMessage() {
        if (!connected) {
            alert("Not connected to any stream, please connect to a stream to send messages")
            return
        }

        const stream = await streamr.getStream(streamId)

        const check = await stream.hasPermission({
            permission: StreamPermission.PUBLISH,
            user: user,
            allowPublic: true,
        })

        if (!check) {
            alert("You do not have permission to publish to this stream")
            return
        }

        streamr.publish(streamId, msg)
        setMsg("")
    }

    return (
        <div className="flex flex-col items-left justify-left p-6">
            <form className="relative p-3">
                <input
                    className="relative text-m text-center text-black bg-white rounded m-2 w-80 h-12 right-8"
                    type="text"
                    placeholder={placeholder}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button
                    className="absolute text-m text-center text-white bg-blue-500 hover:bg-blue-700 p-3 rounded mt-4 bottom-5 right-0"
                    type="button"
                    onClick={() => handleSendMessage()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.72 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 010-1.06zm6 0a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default SendMessage
