import "./toggle.css";

type ToggleSwitchProps = {
  enabled: boolean; 
  onToggle: (enabled: boolean) => void; 
  disabled?: boolean; 
};

export default function ToggleSwitch({
  enabled,
  onToggle,
  disabled = false, 
}: ToggleSwitchProps) {
  const handleClick = () => {
    if (!disabled) {
      onToggle(!enabled); 
    }
  };

  return (
    <div
      className={`toggle-switch ${enabled ? "enabled" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={handleClick}
      style={{ cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }} 
    >
      <div className="toggle-ball"></div>
    </div>
  );
}
