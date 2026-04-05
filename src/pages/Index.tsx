import { useState, useEffect, useCallback } from "react";
import { Telescope } from "lucide-react";
import StarryBackground from "@/components/StarryBackground";
import ImageUpload from "@/components/ImageUpload";
import ConstellationResult from "@/components/ConstellationResult";
import DetectionHistory from "@/components/DetectionHistory";
import { detectConstellation, type DetectionResult } from "@/lib/constellations";

const STORAGE_KEY = "skylens-history";

const loadHistory = (): DetectionResult[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<DetectionResult[]>(loadHistory);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const handleImageUploaded = useCallback(async (file: File, imageUrl: string) => {
    setIsAnalyzing(true);
    setCurrentResult(null);
    try {
      const result = await detectConstellation(file, imageUrl);
      setCurrentResult(result);
      setHistory((prev) => [result, ...prev].slice(0, 20));
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <div className="relative min-h-screen">
      <StarryBackground />
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
              <Telescope className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">Skylens</h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto">
            Upload a photo of the night sky and discover the constellations hidden among the stars.
          </p>
        </header>

        <section className="mb-8">
          <ImageUpload onImageUploaded={handleImageUploaded} isAnalyzing={isAnalyzing} />
        </section>

        {isAnalyzing && (
          <div className="text-center py-8 animate-fade-in">
            <div className="inline-flex items-center gap-3 bg-muted/50 rounded-full px-5 py-2.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-display text-foreground">Scanning star patterns...</span>
            </div>
          </div>
        )}

        {currentResult && !isAnalyzing && (
          <section className="mb-10">
            <ConstellationResult result={currentResult} />
          </section>
        )}

        <section>
          <DetectionHistory history={history} onClear={handleClearHistory} onSelect={setCurrentResult} />
        </section>
      </div>
    </div>
  );
};

export default Index;
