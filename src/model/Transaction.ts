import { Connex } from "@mutopad/connex"

export enum TxStage {
  NONE = "None",
  IN_EXTENSION = "Pending in extension",
  POLLING_TX = "Polling the chain for the transaction",
  REVERTED = "Transaction reverted",
  COMPLETE = "Transaction complete",
  FAILURE = "Transaction failed for some unknown reason",
}

export type ClauseType = Connex.VM.Clause & {
  comment?: string
  abi?: object
}
