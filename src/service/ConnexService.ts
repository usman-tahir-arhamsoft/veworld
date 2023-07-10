import { Connex } from "@mutopad/connex"
import { Certificate } from "thor-devkit"
import { Network, NetworkInfo, WalletSource } from "../model/enums"
import storageService from "./LocalStorageService"

let connex: Connex | undefined

const initialise = (
  walletSource: WalletSource,
  network: Network,
  ext_id?: string | undefined
) => {
  console.log("initialise with ID: ", ext_id)
  const enhancedNetwork = NetworkInfo[network]
  console.log("Network info", walletSource, network, enhancedNetwork)
  console.log("Current connex Instance: ", connex)
  clear()
  connex = new Connex({
    node: enhancedNetwork.url, // Network URL
    network, // "Test/Main" Network type
    noExtension: walletSource === WalletSource.SYNC2, // true/false if no browser wallet extension available
    mutopadId: ext_id, // If current host have the Mutopad Installed than pass the extension id
  })
  console.log("Connex Instance", connex)
  return connex
}

const getConnex = async () => {
  const acconutData = storageService.getAccount()
  const networkData = storageService.getNetwork()
  console.log(
    "Connex Data in localstorage>>>>: ",
    acconutData,
    "network data:",
    networkData
  )
  if (acconutData && networkData) {
    console.log(
      acconutData.source === WalletSource.MUTOPAD,
      WalletSource.MUTOPAD
    )
    if (acconutData.source === WalletSource.MUTOPAD) {
      const id = await window.mutopad?.enable()
      initialise(acconutData.source, networkData, id)
    } else {
      console.log("I am in else block")
      initialise(acconutData.source, networkData, undefined)
    }
  }
  if (!connex) throw new Error("Connex not initialised")
  console.log("Connex Instance", connex)
  return connex
}

const clear = () => {
  console.log("Clear Instance of connex")
  connex = undefined
  console.log("Cleared Instance of connex", connex)
}

export const connectToWalletHandler = async (
  source: WalletSource,
  network: Network,
  ext_id: string | undefined
): Promise<Certificate> => {
  console.log("Source: ", source, ext_id)
  const connex = initialise(
    source,
    network,
    source === WalletSource.MUTOPAD ? ext_id : undefined
  )

  const message: Connex.Vendor.CertMessage = {
    purpose: "identification",
    payload: {
      type: "text",
      content: "Sign a certificate to prove your identity",
    },
  }
  // window.open(
  //   "chrome-extension://nikbhgpnljiehcfpikebjcmgpjlolnma/www/index.html#/sign?src=https%3A%2F%2Ftos.vecha.in%2F7cd7089e7f5f794b0ade732b6bb1e3a9bb844b4ca5f38559aba2ef22193bb21b"
  // )
  const certResponse = await connex.vendor.sign("cert", message).request()

  const cert: Certificate = {
    purpose: message.purpose,
    payload: message.payload,
    domain: certResponse.annex.domain,
    timestamp: certResponse.annex.timestamp,
    signer: certResponse.annex.signer,
    signature: certResponse.signature,
  }

  console.log("Signed cert", cert)
  Certificate.verify(cert)
  console.log("Cert verified")
  // console.log("Instance ID: ", connex.mutopad)

  return cert
}

const getAccount = async (
  accountAddress: string
): Promise<Connex.Thor.Account> => {
  const connex = await getConnex()
  return await connex.thor.account(accountAddress).get()
}

export default {
  getConnex,
  getAccount,
  initialise,
  clear,
}
