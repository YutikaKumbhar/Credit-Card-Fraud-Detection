import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  time: string;
  amount: string;
  status: "fraud" | "legit";
  confidence: number;
}

const mockTransactions: Transaction[] = [
  { id: "TXN-4829", time: "12:45:03", amount: "$2,125.87", status: "fraud", confidence: 0.97 },
  { id: "TXN-4828", time: "12:44:51", amount: "$14.99", status: "legit", confidence: 0.99 },
  { id: "TXN-4827", time: "12:44:38", amount: "$349.00", status: "legit", confidence: 0.92 },
  { id: "TXN-4826", time: "12:43:19", amount: "$8,450.00", status: "fraud", confidence: 0.89 },
  { id: "TXN-4825", time: "12:42:55", amount: "$67.30", status: "legit", confidence: 0.98 },
  { id: "TXN-4824", time: "12:41:12", amount: "$1,200.00", status: "legit", confidence: 0.85 },
  { id: "TXN-4823", time: "12:40:47", amount: "$5,999.99", status: "fraud", confidence: 0.94 },
  { id: "TXN-4822", time: "12:39:30", amount: "$22.50", status: "legit", confidence: 0.99 },
];

const RecentTransactions = () => {
  return (
    <div className="bg-card rounded-xl gradient-border overflow-hidden">
      <div className="p-5 border-b border-border">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <p className="text-muted-foreground text-sm">Live monitoring feed</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-muted-foreground text-xs uppercase tracking-wider">
              <th className="text-left p-3 pl-5">ID</th>
              <th className="text-left p-3">Time</th>
              <th className="text-right p-3">Amount</th>
              <th className="text-right p-3">Confidence</th>
              <th className="text-right p-3 pr-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                <td className="p-3 pl-5 font-mono text-sm">{tx.id}</td>
                <td className="p-3 font-mono text-sm text-muted-foreground">{tx.time}</td>
                <td className="p-3 text-right font-mono text-sm font-medium">{tx.amount}</td>
                <td className="p-3 text-right font-mono text-sm">{(tx.confidence * 100).toFixed(0)}%</td>
                <td className="p-3 pr-5 text-right">
                  <Badge
                    variant={tx.status === "fraud" ? "destructive" : "outline"}
                    className={tx.status === "legit" ? "border-success/50 text-success" : ""}
                  >
                    {tx.status === "fraud" ? "FRAUD" : "LEGIT"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
