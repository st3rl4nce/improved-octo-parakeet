import StreamrClient from "streamr-client"
import { StreamPermission } from "streamr-client"
import { useState } from "react"

interface ConnectStreamProps {
    sId: string
    setSId: (sId: string) => void
    connected: boolean
    setConnected: (connected: boolean) => void
    streamrclient: StreamrClient
}

declare var window: any

const ConnectStream = (prop: ConnectStreamProps) => {
    const streamId = prop.sId
    const setStreamId = prop.setSId
    const connected = prop.connected
    const setConnected = prop.setConnected
    const [tempStreamId, setTempStreamId] = useState("")
    const streamr = prop.streamrclient
    var placeholderInput = "Enter stream name"
    var placeholderButton = "Connect"
    if (connected) {
        const name = streamId.split("/")
        placeholderInput = `Connected to ${streamId.slice(0, 5)}...${name[0].slice(-3)}/${
            name[name.length - 1]
        }`
        placeholderButton = "Disconnect"
    }
    async function handleConnection() {
        if (!connected) {
            setStreamId(tempStreamId)
            setConnected(!connected)
        } else {
            setConnected(!connected)
            return
        }

        const stream = await streamr.getStream(tempStreamId)
        const check = await stream.hasPermission({
            permission: StreamPermission.SUBSCRIBE,
            user: window.ethereum.selectedAddress,
            allowPublic: true,
        })

        if (!check) {
            alert("You do not have permission to subscribe to this stream")
            return
        }

        streamr.subscribe(tempStreamId, (message) => {
            console.log(message)
        })
        setTempStreamId("")
    }

    return (
        <div className="absolute mr-10 flex flex-col items-center justify-center right-0 top-20 w-16 p-24">
            <form className="flex flex-col items-center justify-center p-3">
                <input
                    className="text-l text-center text-black bg-white rounded m-0 w-60 p-2"
                    type="text"
                    placeholder={placeholderInput}
                    value={tempStreamId}
                    onChange={(e) => setTempStreamId(e.target.value)}
                />
                <button
                    className="text-l text-center text-white bg-blue-500 hover:bg-blue-700 p-2 rounded mt-4"
                    type="button"
                    onClick={() => handleConnection()}
                >
                    {placeholderButton}
                </button>
            </form>
        </div>
    )
}

export default ConnectStream
