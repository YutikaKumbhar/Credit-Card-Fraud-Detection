import { Shield, AlertTriangle } from "lucide-react";

interface PredictionResultProps {
  result: { prediction: "fraud" | "legit"; confidence: number } | null;
}

const PredictionResult = ({ result }: PredictionResultProps) => {
  if (!result) return null;

  const isFraud = result.prediction === "fraud";

  return (
    <div
      className={`rounded-xl p-6 border animate-slide-up ${
        isFraud
          ? "bg-destructive/10 border-destructive/30 glow-destructive"
          : "bg-success/10 border-success/30 glow-success"
      }`}
    >
      <div className="flex items-center gap-3">
        {isFraud ? (
          <AlertTriangle className="w-8 h-8 text-destructive animate-pulse-glow" />
        ) : (
          <Shield className="w-8 h-8 text-success" />
        )}
        <div>
          <h3 className={`text-xl font-bold ${isFraud ? "text-destructive" : "text-success"}`}>
            {isFraud ? "⚠ Fraudulent Transaction Detected" : "✓ Legitimate Transaction"}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">
            Confidence: <span className="font-mono font-bold">{(result.confidence * 100).toFixed(1)}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
