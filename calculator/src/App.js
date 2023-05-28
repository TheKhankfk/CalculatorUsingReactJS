/*app.js*/
import backgroundImage from './maths.jpg';
import { useReducer } from "react"
import DigitButton from "./DigitButton"
import OperationButton from "./OperationButton"
import "./styles.css"

// Define action types

export const DUTIES = {
  DIGITADD: "add-digit",
  OPERATIONCHOOSE: "choose-operation",
  CLR: "CLR",
  DIGITDELETE: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer(state, { type, PLD }) {
  switch (type) {
    case DUTIES.DIGITADD:
      if (state.OFN) { // Check if overwrite mode is active
        return {
          // Replace the current operand with the new digit
          ...state,
          COP: PLD.digit,
          OFN: false,
        }
      }
      if (PLD.digit === "0" 
      && state.COP === "0") {  // Ignore leading zeros
        return state
      }
      if (PLD.digit === "." && 
      state.COP.includes(".")) {// Ignore multiple decimal points
        return state
      }

      return {  // Append the digit to the current operand
        ...state,
        COP: `${state.COP || ""}${PLD.digit}`,
      }
    case DUTIES.OPERATIONCHOOSE:
      if (state.COP == null 
        && state.POPR == null) {  // Check if both operands are null
        return state
      }

      if (state.COP == null) { // Check if the current operand is null
        return {
           // Update the operation without changing operands
          ...state,
          operation: PLD.operation,
        }
      }
// Check if the previous operand is null
      if (state.POPR == null) {
        return {  // Update the operation and set the previous operand to the current operand
          ...state,
          operation: PLD.operation,
          POPR: state.COP,
          COP: null,
        }
      }

      return {
        ...state,
        POPR: evaluate(state), // Evaluate the expression and update the state
        operation: PLD.operation,
        COP: null,
      }
    case DUTIES.CLR:
      return {}
    case DUTIES.DIGITDELETE:
      if (state.OFN) { // Check if overwrite mode is active
        return {
          // Reset the current operand
          ...state,
          OFN: false,
          COP: null,
        }
      }
        // Check if current operand is null
      if (state.COP == null) return state
      if (state.COP.length === 1) {
        return { 
          ...state,
           COP: null 
          }
      }

      return {
        ...state,
        COP: state.COP.slice(0, -1),  // Remove the last character from the current operand
      }
    case DUTIES.EVALUATE:
      if (
        state.operation == null ||
        state.COP == null ||
        state.POPR == null
      ) {
        return state
      }

      return {// Evaluate the expression and update the current operand
        ...state,
        OFN: true,
        POPR: null,
        operation: null,
        COP: evaluate(state),
      }
  }
}

function evaluate({ COP, POPR, operation }) {
  const prev = parseFloat(POPR)
  const current = parseFloat(COP)
  if (isNaN(prev) || isNaN(current)) return ""
  let result = ""
  switch (operation) {
    case "+":
      result = prev + current
      break
    case "-":
      result = prev - current
      break
    case "*":
      result = prev * current
      break
    case "÷":
      result = prev / current
      break
  }

  return result.toString()
}

const intformat = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function fop(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return intformat.format(integer)
  return `${intformat.format(integer)}.${decimal}`
}

function App() {
  const [{ COP, POPR, operation }, dispatch] = useReducer(
    reducer,
    {}
  )

  return (
    
    <div className="calculator-grid"> 
      <div className="output" placeholder='Enter Number' >
        <div className="previous-operand">
          {fop(POPR)} {operation}
        </div>
        <div className="current-operand">{fop(COP)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => 
          dispatch({ type: DUTIES.CLR })}
      >
        AC
      </button>
      <button onClick={() => 
        dispatch({ type: DUTIES.DIGITDELETE })}>
        DEL
      </button>
      <OperationButton operation="÷" 
      dispatch={dispatch} />
      <DigitButton digit="1" 
      dispatch={dispatch} />
      <DigitButton digit="2" 
      dispatch={dispatch} />
      <DigitButton digit="3" 
      dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" 
      dispatch={dispatch} />
      <DigitButton digit="5" 
      dispatch={dispatch} />
      <DigitButton digit="6" 
      dispatch={dispatch} />
      <OperationButton operation="+" 
      dispatch={dispatch} />
      <DigitButton digit="7" 
      dispatch={dispatch} />
      <DigitButton digit="8" 
      dispatch={dispatch} />
      <DigitButton digit="9" 
      dispatch={dispatch} />
      <OperationButton operation="-" 
      dispatch={dispatch} />
      <DigitButton digit="." 
      dispatch={dispatch} />
      <DigitButton digit="0" 
      dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => 
          dispatch({ type: DUTIES.EVALUATE })}
      >
        =
      </button>
    </div>
  )
}

export default App