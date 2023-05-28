/*digitButton*/

import { DUTIES } from "./App"

// DigitButton component represents a button for a specific digit.

export default function DigitButton({ dispatch, digit }) {
  return (
    <button onClick={() => dispatch({ type: DUTIES.DIGITADD, PLD: { digit } })} >{digit}</button>
  )
}