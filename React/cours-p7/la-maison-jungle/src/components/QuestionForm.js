import { useState } from "react";

function QuestionForm() {
  const [inputValue, setInputValue] = useState("Posez votre question ici");
  const isInputError = inputValue.includes("f");
  return (
    <div>
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => alert(inputValue)}>Alertez moi 🚨</button>
      {isInputError && (
        <div>🔥 Vous n'avez pas le droit d'utiliser la lettre "f" ici.</div>
      )}
    </div>
  );
}

export default QuestionForm;
