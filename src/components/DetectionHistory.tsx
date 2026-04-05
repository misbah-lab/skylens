import type { DetectionResult } from "@/lib/constellations";
import { Clock, Trash2 } from "lucide-react";

interface DetectionHistoryProps {
  history: DetectionResult[];
  onClear: () => void;
  onSelect: (result: DetectionResult) => void;
}

const DetectionHistory = ({ history, onClear, onSelect }: DetectionHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-display font-semibold text-foreground">Detection History</h3>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="group relative rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all"
          >
            <img src={item.imageUrl} alt={item.constellation?.name ?? "Unknown"} className="w-full h-24 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-xs font-display font-semibold text-foreground truncate">
                {item.constellation?.name ?? "Unknown"}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {new Date(item.detectedAt).toLocaleDateString()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DetectionHistory;
