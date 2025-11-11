import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

const SoilAssessmentForm = ({ onSubmit, isLoading, error }) => {
  const [soilType, setSoilType] = useState("");
  const [moisture, setMoisture] = useState([50]);
  const [organicContent, setOrganicContent] = useState([3]);
  const [ph, setPh] = useState([7]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (soilType) {
      onSubmit({
        soilType,
        moisture: moisture[0],
        organicContent: organicContent[0],
        ph: ph[0],
      });
    }
  };

  return (
    <Card className="p-6 shadow-card">
      {error && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-sm text-destructive">{error.message}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="soilType" className="text-base font-semibold">
            Soil Type
          </Label>
          <Select value={soilType} onValueChange={setSoilType}>
            <SelectTrigger id="soilType" className="w-full">
              <SelectValue placeholder="Select your soil type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clay">Clay</SelectItem>
              <SelectItem value="sandy">Sandy</SelectItem>
              <SelectItem value="loam">Loam</SelectItem>
              <SelectItem value="silt">Silt</SelectItem>
              <SelectItem value="peat">Peat</SelectItem>
              <SelectItem value="chalky">Chalky</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="moisture" className="text-base font-semibold">
              Moisture Level
            </Label>
            <span className="text-sm font-medium text-muted-foreground">{moisture[0]}%</span>
          </div>
          <Slider
            id="moisture"
            value={moisture}
            onValueChange={setMoisture}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Dry</span>
            <span>Wet</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="organicContent" className="text-base font-semibold">
              Organic Content
            </Label>
            <span className="text-sm font-medium text-muted-foreground">{organicContent[0]}%</span>
          </div>
          <Slider
            id="organicContent"
            value={organicContent}
            onValueChange={setOrganicContent}
            max={10}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="ph" className="text-base font-semibold">
              pH Level
            </Label>
            <span className="text-sm font-medium text-muted-foreground">{ph[0]}</span>
          </div>
          <Slider
            id="ph"
            value={ph}
            onValueChange={setPh}
            min={4}
            max={10}
            step={0.5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Acidic (4)</span>
            <span>Neutral (7)</span>
            <span>Alkaline (10)</span>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!soilType || isLoading}
        >
          {isLoading ? "Analyzing..." : "Get Crop Recommendations"}
        </Button>
      </form>
    </Card>
  );
};

export default SoilAssessmentForm;