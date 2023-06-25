import StreamrClient from "streamr-client"
import { StreamPermission } from "streamr-client"
import { useState } from "react"
declare var window: any

interface SubscribeStreamProps {
    streamrclient: StreamrClient
}

const SubscribeStream = (prop: SubscribeStreamProps) => {
    const [streamId, setStreamId] = useState("")

    async function handleSubscribe() {
        const streamr = prop.streamrclient
        const stream = await streamr.getStream(streamId)
        const check = await stream.hasPermission({
            permission: StreamPermission.SUBSCRIBE,
            user: window.ethereum.selectedAddress,
            allowPublic: true,
        })

        if (!check) {
            alert("You do not have permission to subscribe to this stream")
            return
        }

        streamr.subscribe(streamId, (message) => {
            console.log(message)
        })

        alert(`Succesfully subscribed to ${streamId}`)
        setStreamId("")
    }

    return (
        // return a div containing a form with a text input and a button styled with tailwind
        <div className="absolute ml-10 flex flex-col items-center justify-center left-0 bottom-20 w-16 p-24">
            <form className="flex flex-col items-center justify-center p-3">
                <input
                    className="text-l text-center text-black bg-white rounded m-2 w-60 p-2"
                    type="text"
                    placeholder="Enter stream ID"
                    value={streamId}
                    onChange={(e) => setStreamId(e.target.value)}
                />
                <button
                    className="text-l text-center text-white bg-blue-500 hover:bg-blue-700 p-2 rounded mt-4"
                    type="button"
                    onClick={() => handleSubscribe()}
                >
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default SubscribeStream
