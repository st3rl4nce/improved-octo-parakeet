import { useState } from "react"
declare var window: any

interface ConnectWalletProps {
    wallet: boolean
    setWallet: any
}
const ConnectWallet = (prop: ConnectWalletProps) => {
    const wallet = prop.wallet
    const setWallet = prop.setWallet
    var walletPlaceholder = "Connect Wallet"
    if (wallet) {
        walletPlaceholder = "Disconnect Wallet"
    }

    async function handleWallet() {
        if (!wallet) {
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                })
                setWallet(!wallet)
            } catch (error) {
                alert("You need to allow access to your accounts")
            }
        } else {
            setWallet(!wallet)
            return
        }
    }

    return (
        <div className="absolute mr-20 flex flex-col items-center justify-center right-0 top-0 w-32 p-6">
            <button
                className="text-l text-center text-white bg-blue-500 hover:bg-blue-700 w-32 p-2 rounded mt-4"
                type="button"
                onClick={() => handleWallet()}
            >
                {walletPlaceholder}
            </button>
        </div>
    )
}

export default ConnectWallet
