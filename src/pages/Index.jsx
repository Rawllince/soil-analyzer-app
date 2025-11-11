import { useState } from "react";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import SoilAssessmentForm from "@/components/SoilAssessmentForm.jsx";
import CropRecommendations from "@/components/CropRecommendations.jsx";
import { useMutation } from "@tanstack/react-query";
import { Sprout, TrendingUp, Droplets, Leaf } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { user } = useAuth();

  const submitAssessment = useMutation({
    mutationFn: async (data) => {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (user) {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      }
      const response = await fetch('http://localhost:5000/api/assessments', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to submit assessment');
      }
      return response.json();
    },
    onSuccess: (data) => {
      setRecommendations(data.recommendations);
      setHasSubmitted(true);
    },
  });

  const handleFormSubmit = (data) => {
    submitAssessment.mutate(data);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Sprout className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-accent">Smart Agriculture Technology</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Soil Quality <span className="text-primary">Assessment Tool</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Make data-driven decisions for your farm. Our advanced assessment tool analyzes your soil conditions
                and provides personalized crop recommendations to maximize yields and promote sustainable farming practices.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-soft">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Optimize Yields</h3>
                <p className="text-sm text-muted-foreground">Get crop recommendations tailored to your soil conditions</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-soft">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Droplets className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Smart Analysis</h3>
                <p className="text-sm text-muted-foreground">Advanced algorithms assess moisture, pH, and nutrients</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border shadow-soft">
                <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Sustainable Future</h3>
                <p className="text-sm text-muted-foreground">Promote soil health and environmental stewardship</p>
              </div>
            </div>
          </div>
        </section>

        {/* Assessment Form Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Assess Your Soil</h2>
                <p className="text-muted-foreground">
                  Enter your soil parameters below to receive personalized crop recommendations
                </p>
              </div>

              <SoilAssessmentForm
                onSubmit={handleFormSubmit}
                isLoading={submitAssessment.isPending}
                error={submitAssessment.error}
              />
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        {hasSubmitted && (
          <section className="py-16 bg-muted/30">
            <div className="container">
              <div className="max-w-6xl mx-auto">
                {recommendations.length > 0 ? (
                  <CropRecommendations crops={recommendations} />
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No specific recommendations available for these soil conditions.
                      Try adjusting your parameters or consult with a local agricultural extension office.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;