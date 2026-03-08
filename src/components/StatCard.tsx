import { Shield, AlertTriangle, CheckCircle, Activity } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: "shield" | "alert" | "check" | "activity";
  trend?: string;
}

const iconMap = {
  shield: Shield,
  alert: AlertTriangle,
  check: CheckCircle,
  activity: Activity,
};

const iconColorMap = {
  shield: "text-primary",
  alert: "text-destructive",
  check: "text-success",
  activity: "text-warning",
};

const glowMap = {
  shield: "glow-primary",
  alert: "glow-destructive",
  check: "glow-success",
  activity: "",
};

const StatCard = ({ title, value, subtitle, icon, trend }: StatCardProps) => {
  const Icon = iconMap[icon];

  return (
    <div className={`bg-card rounded-xl p-5 gradient-border animate-slide-up ${glowMap[icon]}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-muted-foreground text-sm font-medium">{title}</span>
        <Icon className={`w-5 h-5 ${iconColorMap[icon]}`} />
      </div>
      <p className="text-3xl font-bold font-mono tracking-tight">{value}</p>
      <div className="flex items-center gap-2 mt-1">
        {trend && (
          <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-destructive' : 'text-success'}`}>
            {trend}
          </span>
        )}
        <span className="text-muted-foreground text-xs">{subtitle}</span>
      </div>
    </div>
  );
};

export default StatCard;
