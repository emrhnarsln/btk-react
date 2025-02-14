import { useState } from "react";

export default function useInput(initalValue, validationFn) {
  const [value, setValue] = useState(initalValue);
  const [isEdited, setIsEdited] = useState(false);

  const isValid = validationFn(value);

  function handleInputBlur() {
    setIsEdited(true);
  }
  function handleInputChange(e) {
    setValue(e.target.value);
    setIsEdited(false);
  }
  function reset() {
    setValue(initalValue);
    setIsEdited(false);
  }
  return {
    value,
    handleInputBlur,
    handleInputChange,
    setValue,
    hasError: isEdited && !isValid,
    reset,
  };
}
