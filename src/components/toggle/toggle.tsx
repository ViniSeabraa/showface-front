import { useState } from "react";

import "./toggle.css";

type ToggleSwitchProps = {
  onToggle?: (enabled: boolean) => void; // Prop para notificar o estado
};

export default function ToggleSwitch({ onToggle }: ToggleSwitchProps) {
  const [enabled, setEnabled] = useState(false);

  const handleClick = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (onToggle) {
      onToggle(newState); // Chama a função passada pelo componente pai
    }
  };

  return (
    <div
      className={`toggle-switch ${enabled ? "enabled" : ""}`} // Fixed syntax
      onClick={handleClick}
    >
      <div className="toggle-ball"></div>
    </div>
  );
}