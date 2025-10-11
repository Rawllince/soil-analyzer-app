interface FormData {
  soilType: string;
  moisture: number;
  organicContent: number;
  ph: number;
}

interface Crop {
  name: string;
  description: string;
  suitability: "excellent" | "good" | "fair";
  benefits: string[];
}

export const getCropRecommendations = (data: FormData): Crop[] => {
  const { soilType, moisture, organicContent, ph } = data;
  const recommendations: Crop[] = [];

  // Wheat - versatile crop
  if ((soilType === "loam" || soilType === "clay") && ph >= 6 && ph <= 7.5 && moisture >= 40) {
    recommendations.push({
      name: "Wheat",
      description: "A staple grain crop ideal for your soil conditions. Thrives in moderate climates with adequate moisture.",
      suitability: moisture >= 60 && organicContent >= 2.5 ? "excellent" : "good",
      benefits: ["High market value", "Multiple varieties available", "Good rotation crop", "Drought tolerant once established"]
    });
  }

  // Corn - nutrient demanding
  if ((soilType === "loam" || soilType === "silt") && moisture >= 60 && organicContent >= 3 && ph >= 5.5 && ph <= 7) {
    recommendations.push({
      name: "Corn (Maize)",
      description: "High-yielding crop perfect for nutrient-rich soils. Requires consistent moisture throughout growing season.",
      suitability: organicContent >= 4 && moisture >= 70 ? "excellent" : "good",
      benefits: ["High yield potential", "Multiple uses (grain, silage, fresh)", "Good for organic matter retention", "Excellent rotation crop"]
    });
  }

  // Rice - water-loving
  if (moisture >= 80 && (soilType === "clay" || soilType === "silt") && ph >= 5.5 && ph <= 7) {
    recommendations.push({
      name: "Rice",
      description: "Excellent for waterlogged conditions and clay soils. Requires flooded fields or very high moisture.",
      suitability: moisture >= 90 && soilType === "clay" ? "excellent" : "good",
      benefits: ["Thrives in wet conditions", "High caloric yield per acre", "Improves soil structure", "Stable market demand"]
    });
  }

  // Potatoes - versatile
  if ((soilType === "sandy" || soilType === "loam") && moisture >= 50 && ph >= 5 && ph <= 6.5 && organicContent >= 2) {
    recommendations.push({
      name: "Potatoes",
      description: "Root vegetable that performs well in slightly acidic, well-drained soils with good organic content.",
      suitability: soilType === "loam" && organicContent >= 3 ? "excellent" : "good",
      benefits: ["High yield per acre", "Short growing season", "Multiple harvests possible", "Good storage crop"]
    });
  }

  // Soybeans - nitrogen-fixing
  if ((soilType === "loam" || soilType === "silt" || soilType === "clay") && ph >= 6 && ph <= 7 && moisture >= 50) {
    recommendations.push({
      name: "Soybeans",
      description: "Legume crop that enriches soil with nitrogen. Excellent for crop rotation and soil health.",
      suitability: organicContent >= 2.5 && moisture >= 60 ? "excellent" : "good",
      benefits: ["Fixes nitrogen in soil", "High protein content", "Good market value", "Improves soil for next crop"]
    });
  }

  // Barley - hardy grain
  if (ph >= 6.5 && ph <= 8 && moisture >= 35 && (soilType === "loam" || soilType === "clay" || soilType === "chalky")) {
    recommendations.push({
      name: "Barley",
      description: "Hardy grain crop tolerant of various conditions. Good for alkaline soils and lower moisture.",
      suitability: soilType === "loam" && ph >= 7 ? "excellent" : "good",
      benefits: ["Drought tolerant", "Short growing season", "Multiple uses (feed, malt, food)", "Tolerates alkaline soils"]
    });
  }

  // Cotton - warm climate crop
  if ((soilType === "sandy" || soilType === "loam") && moisture >= 45 && ph >= 5.5 && ph <= 7.5 && organicContent >= 2) {
    recommendations.push({
      name: "Cotton",
      description: "Fiber crop requiring warm conditions and well-drained soil. Good economic returns in suitable climates.",
      suitability: moisture >= 55 && organicContent >= 3 ? "excellent" : "good",
      benefits: ["High economic value", "Long growing season", "Multiple products (fiber, seed oil)", "Deep root system improves soil"]
    });
  }

  // Carrots - root vegetable
  if ((soilType === "sandy" || soilType === "loam") && moisture >= 45 && ph >= 5.5 && ph <= 7 && organicContent >= 2.5) {
    recommendations.push({
      name: "Carrots",
      description: "Root vegetable that excels in loose, well-drained soils. Requires consistent moisture for straight roots.",
      suitability: soilType === "sandy" && organicContent >= 3 ? "excellent" : "good",
      benefits: ["High nutritional value", "Good market demand", "Multiple varieties", "Can be succession planted"]
    });
  }

  // Lettuce - leafy green
  if ((soilType === "loam" || soilType === "silt") && moisture >= 60 && ph >= 6 && ph <= 7 && organicContent >= 3) {
    recommendations.push({
      name: "Lettuce",
      description: "Quick-growing leafy green ideal for rich, moist soils. Perfect for short-season production.",
      suitability: organicContent >= 4 && moisture >= 70 ? "excellent" : "good",
      benefits: ["Fast harvest cycle", "High value per acre", "Multiple harvests possible", "Low maintenance"]
    });
  }

  // Sunflowers - drought tolerant
  if (moisture >= 30 && ph >= 6 && ph <= 7.5 && (soilType === "loam" || soilType === "sandy" || soilType === "clay")) {
    recommendations.push({
      name: "Sunflowers",
      description: "Versatile crop tolerant of various conditions. Produces oil seeds and improves soil structure.",
      suitability: organicContent >= 2 && moisture >= 40 ? "excellent" : "good",
      benefits: ["Drought tolerant", "Deep roots break up soil", "Oil seed production", "Attracts beneficial insects"]
    });
  }

  // Tomatoes - high value
  if ((soilType === "loam" || soilType === "sandy") && moisture >= 55 && ph >= 6 && ph <= 7 && organicContent >= 3) {
    recommendations.push({
      name: "Tomatoes",
      description: "High-value crop requiring nutrient-rich soil and consistent care. Excellent market returns.",
      suitability: organicContent >= 4 && moisture >= 65 ? "excellent" : "good",
      benefits: ["High market value", "Multiple varieties", "Long harvest season", "Fresh market and processing options"]
    });
  }

  // Alfalfa - perennial forage
  if (ph >= 6.5 && ph <= 7.5 && (soilType === "loam" || soilType === "clay") && moisture >= 40) {
    recommendations.push({
      name: "Alfalfa",
      description: "Perennial legume excellent for forage and soil improvement. Fixes nitrogen and has deep roots.",
      suitability: organicContent >= 2.5 && ph >= 7 ? "excellent" : "good",
      benefits: ["Fixes nitrogen", "Multiple cuttings per year", "Improves soil structure", "High protein forage"]
    });
  }

  // Sort by suitability
  const order = { excellent: 0, good: 1, fair: 2 };
  recommendations.sort((a, b) => order[a.suitability] - order[b.suitability]);

  // Return top 6 recommendations
  return recommendations.slice(0, 6);
};
