import type { DetectionResult } from "@/lib/constellations";
import { Star, Sparkles, BookOpen, AlertCircle } from "lucide-react";

interface ConstellationResultProps {
  result: DetectionResult;
}

const ConstellationResult = ({ result }: ConstellationResultProps) => {
  const { constellation, confidence, imageUrl, error, reason } = result;

  if (error) {
    return (
      <div className="animate-fade-in flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4">
        <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="font-display font-semibold text-foreground">Analysis failed</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
          <p className="text-xs text-muted-foreground mt-1">Make sure the backend server is running on port 5000.</p>
        </div>
      </div>
    );
  }

  if (!constellation) {
    return (
      <div className="animate-fade-in">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden border border-border">
            <img src={imageUrl} alt="Uploaded image" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
            <p className="font-display font-bold text-xl text-foreground">No constellation detected</p>
            <p className="text-sm text-muted-foreground">{reason ?? "Try uploading a clearer night sky image with visible stars."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img src={imageUrl} alt="Uploaded night sky" className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-background/70 backdrop-blur-sm rounded-md px-3 py-1.5">
            <Sparkles className="w-4 h-4 text-constellation-gold" />
            <span className="text-sm font-display font-semibold text-constellation-gold">{confidence}% match</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Detected Constellation</p>
            <h2 className="text-3xl font-display font-bold text-foreground">{constellation.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {constellation.starCount} main stars · Best seen in {constellation.season}
            </p>
          </div>

          <div className="flex items-start gap-3 bg-muted/40 rounded-lg p-3">
            <Star className="w-5 h-5 text-constellation-gold mt-0.5 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Brightest Star</p>
              <p className="font-display font-semibold text-foreground">{constellation.brightestStar}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Mythology</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{constellation.mythology}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstellationResult;
