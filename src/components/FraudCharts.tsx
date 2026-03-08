import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const pieData = [
  { name: "Legitimate", value: 284315, color: "hsl(142, 60%, 45%)" },
  { name: "Fraudulent", value: 492, color: "hsl(0, 72%, 55%)" },
];

const barData = [
  { hour: "00", fraud: 12, legit: 4200 },
  { hour: "04", fraud: 8, legit: 2100 },
  { hour: "08", fraud: 23, legit: 8900 },
  { hour: "12", fraud: 45, legit: 12300 },
  { hour: "16", fraud: 67, legit: 15600 },
  { hour: "20", fraud: 38, legit: 9800 },
];

const FraudCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-card rounded-xl p-5 gradient-border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">Transaction Distribution</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" stroke="none">
              {pieData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-2">
          {pieData.map((d) => (
            <div key={d.name} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
              <span className="text-muted-foreground">{d.name}</span>
              <span className="font-mono font-bold">{d.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-xl p-5 gradient-border">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">Fraud by Hour</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData}>
            <XAxis dataKey="hour" tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "hsl(215, 12%, 50%)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(220, 18%, 10%)",
                border: "1px solid hsl(220, 14%, 18%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="fraud" fill="hsl(0, 72%, 55%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FraudCharts;
