import StreamrClient from "streamr-client"
import { useState } from "react"

declare var window: any

interface CreateStreamProps {
    streamrclient: StreamrClient
}

const CreateStream = (prop: CreateStreamProps) => {
    const [streamName, setStreamName] = useState("")

    async function handleCreation(streamName: string) {
        const streamr = prop.streamrclient

        const stream = await streamr.createStream({
            id: "/"+streamName,
        })

        alert("Stream created with ID: " + stream.id)
        setStreamName("")
    }

    return (
        <div className="absolute ml-10 flex flex-col items-center justify-center left-0 top-20 w-16 p-24">
            <form className="flex flex-col items-center justify-center p-3">
                <input
                    className="text-l text-center text-black bg-white rounded m-2 w-60 p-2"
                    type="text"
                    placeholder="Enter stream name"
                    value={streamName}
                    onChange={(e) => setStreamName(e.target.value)}
                />
                <button
                    className="text-l text-center text-white bg-blue-500 hover:bg-blue-700 p-2 rounded mt-4"
                    type="button"
                    onClick={() => handleCreation(streamName)}
                >
                    Create Stream
                </button>
            </form>
        </div>
    )
}

export default CreateStream
