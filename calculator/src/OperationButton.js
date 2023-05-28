/*operationButon*/

import { DUTIES } from "./App"

// operationButton component represents a button for a specific operation.

export default function OperationButton({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: DUTIES.OPERATIONCHOOSE, PLD: { operation } })}>{operation}</button>
  )
}