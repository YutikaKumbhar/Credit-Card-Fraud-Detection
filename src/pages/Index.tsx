import { useState } from "react";
import { Shield } from "lucide-react";
import StatCard from "@/components/StatCard";
import TransactionForm from "@/components/TransactionForm";
import PredictionResult from "@/components/PredictionResult";
import RecentTransactions from "@/components/RecentTransactions";
import FraudCharts from "@/components/FraudCharts";

const Index = () => {
  const [prediction, setPrediction] = useState<{ prediction: "fraud" | "legit"; confidence: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = (data: Record<string, number>) => {
    setIsLoading(true);
    // Simulated prediction based on feature patterns from the notebook
    setTimeout(() => {
      const suspiciousScore =
        Math.abs(data.v1 || 0) * 0.15 +
        Math.abs(data.v3 || 0) * 0.1 +
        Math.abs(data.v10 || 0) * 0.2 +
        Math.abs(data.v12 || 0) * 0.25 +
        Math.abs(data.v14 || 0) * 0.15 +
        Math.abs(data.v17 || 0) * 0.15;

      const isFraud = suspiciousScore > 3.5;
      const confidence = isFraud
        ? Math.min(0.99, 0.75 + suspiciousScore * 0.03)
        : Math.min(0.99, 0.8 + (3.5 - suspiciousScore) * 0.05);

      setPrediction({
        prediction: isFraud ? "fraud" : "legit",
        confidence: parseFloat(confidence.toFixed(3)),
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center glow-primary">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">FraudShield</h1>
              <p className="text-xs text-muted-foreground">ML-Powered Fraud Detection</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
            <span className="text-xs text-muted-foreground font-mono">Model: Active</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Transactions" value="284,807" subtitle="Dataset records" icon="activity" />
          <StatCard title="Fraud Detected" value="492" subtitle="0.17% of total" icon="alert" trend="+12%" />
          <StatCard title="Model Accuracy" value="99.2%" subtitle="Logistic Regression" icon="check" />
          <StatCard title="Protected" value="$78.4M" subtitle="Transaction volume" icon="shield" />
        </div>

        {/* Charts */}
        <FraudCharts />

        {/* Transaction Analyzer */}
        <TransactionForm onAnalyze={handleAnalyze} isLoading={isLoading} />

        {/* Prediction Result */}
        <PredictionResult result={prediction} />

        {/* Recent Transactions */}
        <RecentTransactions />
      </main>
    </div>
  );
};

export default Index;
