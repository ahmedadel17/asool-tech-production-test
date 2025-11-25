
interface SettingProps {
    label: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
  }
  
  // Reusable toggle component
  function SettingToggle({
    label,
    description,
    checked,
    onChange,
  }: SettingProps) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
  
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
        </label>
      </div>
    );
  }
  export default SettingToggle;