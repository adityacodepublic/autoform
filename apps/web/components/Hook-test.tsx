import { useState } from "react";
import { useFormContext } from "react-hook-form";

const HookTest = () => {
  const {
    formState: {
      dirtyFields,
      touchedFields,
      isValid,
      isSubmitSuccessful,
      errors,
    },
    trigger,
    watch,
    reset,
    setValue,
  } = useFormContext();

  const buttons: React.CSSProperties = {
    border: "1px solid black",
    borderRadius: "25px",
    padding: "5px 10px",
    margin: "10px",
  };

  // initialise test state
  const tests = {
    dirtyFields: "initial",
    touchedFields: "initial",
    isValid: "initial",
    isSubmitSuccessful: "initial",
    trigger: "initial",
    watch: "initial",
    clear: "initial",
    setValue: "initial",
  };
  const [test, setTest] = useState<typeof tests>(tests);
  const formFields = ["birthdate", "color", "name", "isStudent"] as const;

  // functions to test useForm-properties  
  function checkDirtyFields() {
    console.log("dirtyFields", dirtyFields);
    setTest((prev) => ({
      ...prev,
      dirtyFields: String(formFields.every((key) => dirtyFields[key] === true)),
    }));
  }

  function checkTouchedFields() {
    console.log("touchedFields", touchedFields);
    setTest((prev) => ({
      ...prev,
      touchedFields: String(
        formFields.every((key) => touchedFields[key] === true)
      ),
    }));
  }

  function checkIsValid() {
    console.log("isValid", isValid);
    setTest((prev) => ({
      ...prev,
      isValid: String(isValid),
    }));
  }

  function checkIsSubmitSuccessful() {
    console.log("isSubmitSuccessful", isSubmitSuccessful);
    setTest((prev) => ({
      ...prev,
      isSubmitSuccessful: String(isSubmitSuccessful),
    }));
  }

  function checkWatch() {
    const result = {
      name: "John Doe",
      age: 25,
      color: "green",
      birthdate: "1990-01-01",
      isStudent: true,
    };

    const watchValues = watch();
    console.log("checkWatch", watchValues);
    
    setTest((prev) => ({
      ...prev,
      watch: String(
        formFields.every((key) => watchValues[key] === result[key])
      ),
    }));
  }

  async function checkClear() {
    const result = {
      name: undefined,
      age: undefined,
      color: undefined,
      birthdate: undefined,
      isStudent: false,
    };
    reset();

    const watchValues = watch();
    console.log("checkClear", watchValues);
    
    setTest((prev) => ({
      ...prev,
      clear: String(
        formFields.every((key) => watchValues[key] === result[key])
      ),
    }));
  }

  async function checkTrigger() {
    await trigger();
    console.log("checkTrigger", errors);
    setTest((prev) => ({
      ...prev,
      trigger: String(formFields.every((key) => key in errors)),
    }));
  }

  function checkSetValue() {
    const result = {
      name: "John Doe",
      age: 25,
      color: "green",
      birthdate: "1990-01-01",
      isStudent: true,
    };

    setValue("name", "John Doe");
    setValue("age", 25);
    setValue("color", "green");
    setValue("birthdate", "1990-01-01");
    setValue("isStudent", true);
    const watchValues = watch();

    setTest((prev) => ({
      ...prev,
      setValue: String(
        formFields.every((key) => watchValues[key] === result[key])
      ),
    }));
  }

  return (
    <div>
      <button
        type="button"
        style={buttons}
        name="dirtyFields"
        onClick={checkDirtyFields}
        data-item={test.dirtyFields}
      >
        dirtyFields
      </button>
      <button
        type="button"
        style={buttons}
        name="touchedFields"
        onClick={checkTouchedFields}
        data-item={test.touchedFields}
      >
        touchedFields
      </button>
      <button
        type="button"
        style={buttons}
        name="isValid"
        onClick={checkIsValid}
        data-item={test.isValid}
      >
        isValid
      </button>
      <button
        type="button"
        style={buttons}
        name="isSubmitSuccessful"
        onClick={checkIsSubmitSuccessful}
        data-item={test.isSubmitSuccessful}
      >
        isSubmitSuccessful
      </button>
      <button
        type="button"
        style={buttons}
        name="watch"
        onClick={checkWatch}
        data-item={test.watch}
      >
        Watch
      </button>
      <button
        type="button"
        style={buttons}
        name="clear"
        onClick={checkClear}
        data-item={test.clear}
      >
        Clear
      </button>
      <button
        type="button"
        style={buttons}
        name="trigger"
        onClick={checkTrigger}
        data-item={test.trigger}
      >
        Trigger
      </button>
      <button
        type="button"
        style={buttons}
        name="setValue"
        onClick={checkSetValue}
        data-item={test.setValue}
      >
        SetValue
      </button>
    </div>
  );
};

export default HookTest;
