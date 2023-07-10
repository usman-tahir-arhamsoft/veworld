import React, {
  useReducer,
  useContext,
  createContext,
  useMemo,
  useEffect,
} from "react"
import LocalStorageService from "../service/LocalStorageService"
import ConnexService from "../service/ConnexService"
import { IAccount, INonFungibleToken, IToken } from "../model/State"

import { Network, WalletSource } from "../model/enums"

export enum ActionType {
  SET_ALL = "SET_ALL",
  SET_NETWORK = "SET_NETWORK",
  SET_ACCOUNT = "SET_ACCOUNT",
  ADD_TOKEN = "ADD_TOKEN",
  ADD_NFT = "ADD_NFT",
  CLEAR = "CLEAR",
}

type Action =
  | {
      type: ActionType.SET_ALL
      payload: { network: Network; account: IAccount }
    }
  | { type: ActionType.SET_NETWORK; payload: Network }
  | { type: ActionType.SET_ACCOUNT; payload: IAccount }
  | { type: ActionType.ADD_TOKEN; payload: IToken }
  | { type: ActionType.ADD_NFT; payload: INonFungibleToken }
  | { type: ActionType.CLEAR }

type Dispatch = (action: Action) => void

export type State = {
  account?: IAccount
  network?: Network
  tokens: IToken[]
  nfts: INonFungibleToken[]
}

type ContextStateProps = { state: State; dispatch: Dispatch }

const walletReducerDefaultValue = {
  account: LocalStorageService.getAccount(),
  network: LocalStorageService.getNetwork(),
  tokens: LocalStorageService.getTokens(),
  nfts: LocalStorageService.getNfts(),
}

const walletReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_ALL:
      LocalStorageService.setAccount(action.payload.account)
      LocalStorageService.setNetwork(action.payload.network)
      return { ...state, ...action.payload }
    case ActionType.SET_ACCOUNT:
      LocalStorageService.setAccount(action.payload)
      return { ...state, account: action.payload }
    case ActionType.ADD_TOKEN: {
      const updatedTokens = [...state.tokens, action.payload]
      LocalStorageService.setTokens(updatedTokens)
      return { ...state, tokens: updatedTokens }
    }
    case ActionType.ADD_NFT: {
      const updatedNfts = [...state.nfts, action.payload]
      LocalStorageService.setNfts(updatedNfts)
      return { ...state, nfts: updatedNfts }
    }
    case ActionType.SET_NETWORK:
      LocalStorageService.setNetwork(action.payload)
      return { ...state, network: action.payload }
    case ActionType.CLEAR:
      LocalStorageService.clear()
      ConnexService.clear()
      return { network: undefined, account: undefined, tokens: [], nfts: [] }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}

const WalletContext = createContext<ContextStateProps | undefined>(undefined)

interface IWalletProvider {
  children: React.ReactNode
}
const WalletProvider = ({ children }: IWalletProvider) => {
  const [state, dispatch] = useReducer(walletReducer, walletReducerDefaultValue)
  const { account, network } = state

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  )

  useEffect(() => {
    const initialiseConnex = async () => {
      if (account?.source && network) {
        window.mutopad?.enable().then(
          (id) => {
            console.log("Mutopad enabled with id " + id)
            console.log("Creating new account Instance: ", id, account, network)
            const connex = ConnexService.initialise(
              account.source,
              network,
              account.source === WalletSource.MUTOPAD ? id : undefined
            )
            console.log("connex initialised at end", connex)
          }
          // const acc = await ConnexService.getAccount(account.address)
          // console.log(acc)
        )
      }
    }
    initialiseConnex()
  }, [state])

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  )
}

function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a CountProvider")
  }
  return context
}

export { WalletProvider, useWallet }
