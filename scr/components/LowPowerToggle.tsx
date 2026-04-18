import { Battery, BatteryCharging } from 'lucide-react';

interface LowPowerToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

const LowPowerToggle = ({ enabled, onToggle }: LowPowerToggleProps) => {
  // Don't show on touch devices (already in low power mode)
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <button
      onClick={onToggle}
      data-cursor-hover
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full transition-all duration-300 ${
        enabled
          ? 'bg-yellow-500/20 border border-yellow-500/50'
          : 'bg-[#00FFC2]/10 border border-[#00FFC2]/50'
      }`}
      title={enabled ? 'Disable Low Power Mode' : 'Enable Low Power Mode'}
    >
      {enabled ? (
        <Battery className="w-5 h-5 text-yellow-500" />
      ) : (
        <BatteryCharging className="w-5 h-5 text-[#00FFC2]" />
      )}
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-[#0a0a0a] border border-white/10 rounded text-xs font-body text-white whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        {enabled ? 'Low Power: ON' : 'Low Power: OFF'}
      </span>
    </button>
  );
};

export default LowPowerToggle;
