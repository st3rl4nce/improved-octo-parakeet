import StreamrClient from "streamr-client"
import { StreamPermission } from "streamr-client"
import { useState } from "react"
declare var window: any

interface CreateContactProps {
    sId: string
    connected: boolean
    streamrclient: StreamrClient
}

const CreateContact = (prop: CreateContactProps) => {
    const [contact, setContact] = useState("")
    const streamId = prop.sId
    const connected = prop.connected

    var placeholder = "Not connected to any stream"

    if (connected) {
        placeholder = "Enter contact's ethereum address"
    }

    async function handleCreateContact(streamId: string, contact: string) {
        if (!connected) {
            alert("Not connected to any stream")
            return
        }

        const streamr = prop.streamrclient

        const stream = await streamr.getStream(streamId)

        const check = await stream.hasPermission({
            permission: StreamPermission.PUBLISH,
            user: contact,
            allowPublic: true,
        })

        if (check) {
            alert("Contact already added")
            return
        }

        await stream.grantPermissions({
            user: contact,
            permissions: [StreamPermission.PUBLISH, StreamPermission.SUBSCRIBE],
        })

        alert("Contact added")
        setContact("")
    }

    return (
        <div className="absolute mr-10 flex flex-col items-center justify-center right-0 bottom-20 w-16 p-24">
            <form className="flex flex-col items-center justify-center p-3">
                <input
                    className="text-l text-center text-black bg-white rounded m-2 w-60 p-2"
                    type="text"
                    placeholder={placeholder}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                />
                <button
                    className="text-l text-center text-white bg-blue-500 hover:bg-blue-700 p-2 rounded mt-4"
                    type="button"
                    onClick={() => handleCreateContact(streamId, contact)}
                >
                    Add Contact
                </button>
            </form>
        </div>
    )
}

export default CreateContact
