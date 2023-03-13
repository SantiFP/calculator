import { useState } from "react";

const useShowOperation = () => {
  const [operation, setOperation] = useState("");
  const [textState, setTextState] = useState("");

  let signsArray = ["+", "-", "x", "÷"];

  const showOperation = (text) => {
    setTextState(text);

    if (text.match(/[0-9]+/)) {
      setOperation((prevState) =>
        !prevState || signsArray.includes(text) ? `${text}` : `${prevState}${text}`
      );
    }

    if (signsArray.includes(text) && operation) {
      if (signsArray.includes(textState)) {
        setOperation((prevState) => {
          let arr = prevState.split("");
          arr.splice(prevState.length - 2, 1, text);
          return arr.join("");
        });
      } else if(text !== '=' && textState !== '='){
        setOperation((prevState) => `${prevState} ${text} `);
      }
    }
  };
  return {
    operation,
    showOperation,
  };
};

export default useShowOperation;