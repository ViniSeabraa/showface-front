import "./toggle.css";

type ToggleSwitchProps = {
  enabled: boolean; // Controlled state from parent
  onToggle: (enabled: boolean) => void; // Callback to update parent state
  disabled?: boolean; // New optional prop to disable the toggle
};

export default function ToggleSwitch({
  enabled,
  onToggle,
  disabled = false, // Default to false
}: ToggleSwitchProps) {
  const handleClick = () => {
    if (!disabled) {
      onToggle(!enabled); // Only toggle if not disabled
    }
  };

  return (
    <div
      className={`toggle-switch ${enabled ? "enabled" : ""} ${
        disabled ? "disabled" : ""
      }`}
      onClick={handleClick}
      style={{ cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1 }} // Visual feedback
    >
      <div className="toggle-ball"></div>
    </div>
  );
}
