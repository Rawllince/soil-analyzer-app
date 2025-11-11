import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const CropRecommendations = ({ crops }) => {
  const getSuitabilityColor = (suitability) => {
    switch (suitability) {
      case "excellent":
        return "bg-accent text-accent-foreground";
      case "good":
        return "bg-primary text-primary-foreground";
      case "fair":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle2 className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-bold">Recommended Crops for Your Soil</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {crops.map((crop, index) => (
          <Card
            key={index}
            className="p-5 hover:shadow-card transition-shadow duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-bold text-foreground">{crop.name}</h3>
                <Badge className={getSuitabilityColor(crop.suitability)}>
                  {crop.suitability}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {crop.description}
              </p>

              <div className="space-y-2 pt-2">
                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">
                  Key Benefits:
                </p>
                <ul className="space-y-1">
                  {crop.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-accent mt-0.5">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CropRecommendations;