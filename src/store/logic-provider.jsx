import CalcContext from "./calc-context";
import { useState } from "react";

let result = 0;
const CalcProvider = (props) => {
  const [numberInScreen, setNumberInScreen] = useState("");
  const [textState, setTextState] = useState("");
  const [keepOperating, setKeepOperating] = useState(false);
  const [prevOperation, setPrevOperation] = useState("");
  const [completed, setCompleted] = useState(true);
  const [operating, setOperating] = useState(false);
  const [done,setDone] = useState(false);

  let signs = ["+", "-", "x", "÷", "="];
  let parsedNumberInScreen = Number(numberInScreen);

  const showResult = (text) => {
    setTextState(text);

      if (text.match(/[0-9]+/)) {
        setOperating(true);
        if (textState === '=') {
          setDone(false)
        }
        setNumberInScreen((prevState) =>
          !prevState || signs.includes(textState) ? text : prevState + text
        );
      }
  
      const operationType = () => {
        if (!keepOperating && !done) {
          setKeepOperating(true);
          result = parsedNumberInScreen;
        } else {
          if (prevOperation === "+" && !completed) {
            result += parsedNumberInScreen;
          } else if (prevOperation === "-" && !completed) {
            result -= parsedNumberInScreen;
          } else if (prevOperation === "÷" && !completed) {
            result /= parsedNumberInScreen;
          } else if (prevOperation === "x" && !completed) {
            result *= parsedNumberInScreen;
          } else if (completed) {
            prevOperation === "+" && (result += parsedNumberInScreen);
            prevOperation === "-" && (result -= parsedNumberInScreen);
            prevOperation === "/" && (result /= parsedNumberInScreen);
            prevOperation === "*" && (result *= parsedNumberInScreen);
            setNumberInScreen(result);
          }
        }
      };
  
      const settingResult = () =>
        setNumberInScreen(result === Infinity ? "Cannot divide by zero" : result);
  
      if (!signs.includes(textState) && textState !== "AC" && operating) {
        textState === '=' && setDone(false)
        switch (text) {
          case "+":
            setCompleted(false);
            setPrevOperation(text);
            operationType();
            settingResult();
            break;
          case "-":
            setCompleted(false);
            setPrevOperation(text);
            operationType();
            settingResult();
            break;
          case "÷":
            setCompleted(false);
            setPrevOperation(text);
            operationType();
            settingResult();
            break;
          case "x":
            setCompleted(false);
            setPrevOperation(text);
            operationType();
            settingResult();
            break;
          default:
            break;
        }
      } else if (signs.includes(text) && text !== textState) {
        setCompleted(false);
        setPrevOperation(text);
      }
  
      if (text === "+/-") {
        setNumberInScreen(parsedNumberInScreen * -1);
      }
  
      if (text === "%") {
        setNumberInScreen(parsedNumberInScreen / 100);
      }
  
      if (
        text === "=" &&
        !completed &&
        !signs.includes(textState) &&
        textState !== "="
      ) {
        setPrevOperation("");
        setCompleted(true);
        operationType();
        settingResult();
        setOperating(false);
        setDone(true);
        setKeepOperating(false)
      }
  
      if (text === "." && textState !== ".") {
        if (
          numberInScreen.toString().includes(".") &&
          !signs.includes(textState)
        ) {
          setNumberInScreen((prevState) => prevState);
        } else {
          textState === '=' && setDone(false)
          setNumberInScreen((prevState) =>
            !prevState || signs.includes(textState) ? "0." : prevState + "."
          );
        }
      }
    

    if (text === "AC") {
      setNumberInScreen(0);
      setCompleted(true);
      setKeepOperating(false);
      setOperating(false);
      setDone(false)
    }
  };

  const calcContext = {
    numberInScreen,
    showResult,
  }

  return (
    <CalcContext.Provider value={calcContext}>
      {props.children}
    </CalcContext.Provider>
  );
  
};



export default CalcProvider;
