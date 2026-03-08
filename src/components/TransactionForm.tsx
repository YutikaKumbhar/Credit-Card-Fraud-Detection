import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Scan, Loader2 } from "lucide-react";

interface TransactionFormProps {
  onAnalyze: (data: Record<string, number>) => void;
  isLoading: boolean;
}

const fields = [
  { name: "Amount", placeholder: "149.62", key: "amount" },
  { name: "V1", placeholder: "-1.3598", key: "v1" },
  { name: "V2", placeholder: "-0.0728", key: "v2" },
  { name: "V3", placeholder: "2.5363", key: "v3" },
  { name: "V4", placeholder: "1.3782", key: "v4" },
  { name: "V5", placeholder: "-0.3383", key: "v5" },
  { name: "V7", placeholder: "0.2396", key: "v7" },
  { name: "V10", placeholder: "-0.1684", key: "v10" },
  { name: "V12", placeholder: "-0.6427", key: "v12" },
  { name: "V14", placeholder: "-0.3134", key: "v14" },
  { name: "V17", placeholder: "-0.0003", key: "v17" },
];

const TransactionForm = ({ onAnalyze, isLoading }: TransactionFormProps) => {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValues: Record<string, number> = {};
    for (const f of fields) {
      numericValues[f.key] = parseFloat(values[f.key] || "0");
    }
    onAnalyze(numericValues);
  };

  const fillSample = (type: "legit" | "fraud") => {
    if (type === "legit") {
      setValues({ amount: "149.62", v1: "1.19", v2: "0.27", v3: "0.17", v4: "0.45", v5: "0.06", v7: "-0.08", v10: "-0.17", v12: "-0.64", v14: "-0.31", v17: "-0.0003" });
    } else {
      setValues({ amount: "2125.87", v1: "-3.04", v2: "-3.16", v3: "1.09", v4: "2.29", v5: "-2.38", v7: "-5.57", v10: "-7.29", v12: "-18.00", v14: "-5.21", v17: "-9.49" });
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 gradient-border">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Scan className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Analyze Transaction</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => fillSample("legit")} className="text-xs">
            Sample: Legit
          </Button>
          <Button variant="outline" size="sm" onClick={() => fillSample("fraud")} className="text-xs">
            Sample: Fraud
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
          {fields.map((f) => (
            <div key={f.key}>
              <Label className="text-xs text-muted-foreground font-mono">{f.name}</Label>
              <Input
                type="number"
                step="any"
                placeholder={f.placeholder}
                value={values[f.key] || ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="mt-1 font-mono text-sm bg-secondary border-border"
              />
            </div>
          ))}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Scan className="w-4 h-4 mr-2" />}
          {isLoading ? "Analyzing..." : "Run Fraud Detection"}
        </Button>
      </form>
    </div>
  );
};

export default TransactionForm;
