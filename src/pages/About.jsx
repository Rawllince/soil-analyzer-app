import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";
import { Target, Users, TrendingUp, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-primary">SoilCheck</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                SoilCheck was created to bridge the gap between traditional farming knowledge and modern agricultural science.
                We believe that every farmer deserves access to data-driven insights that can transform their land's productivity
                while promoting sustainable practices for future generations.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-8">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To empower farmers worldwide with accessible, accurate soil assessment technology that enables informed
                    decision-making, increases crop yields, and promotes environmentally sustainable farming practices.
                    We strive to make agricultural science accessible to everyone, regardless of farm size or location.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center">Our Objectives</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 hover:shadow-card transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Improve Crop Yields</h3>
                      <p className="text-sm text-muted-foreground">
                        Help farmers select the most suitable crops for their soil conditions, maximizing productivity
                        and return on investment.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-card transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Enhance Soil Health</h3>
                      <p className="text-sm text-muted-foreground">
                        Promote practices that improve soil quality over time, ensuring long-term agricultural
                        sustainability and ecosystem health.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-card transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Support Farmers</h3>
                      <p className="text-sm text-muted-foreground">
                        Provide accessible tools and knowledge that empower farmers to make confident, informed
                        decisions about their land.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-card transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Promote Sustainability</h3>
                      <p className="text-sm text-muted-foreground">
                        Encourage farming methods that protect natural resources, reduce environmental impact,
                        and ensure food security for future generations.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Why Soil Quality Matters Section */}
        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Why Soil Quality Assessment Matters</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Soil is the foundation of agriculture, yet it's one of the most overlooked resources in farming.
                  Understanding your soil's composition, pH levels, moisture content, and organic matter percentage
                  is crucial for making informed decisions about crop selection and land management.
                </p>
                <p>
                  Poor soil quality can lead to reduced crop yields, increased susceptibility to pests and diseases,
                  higher fertilizer costs, and environmental degradation. Conversely, healthy soil supports robust
                  plant growth, improves water retention, reduces erosion, and contributes to biodiversity.
                </p>
                <p>
                  By regularly assessing soil quality and following data-driven recommendations, farmers can:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Select crops that naturally thrive in their soil conditions</li>
                  <li>Reduce the need for chemical inputs and amendments</li>
                  <li>Improve soil health over time through appropriate crop rotation</li>
                  <li>Increase profitability by maximizing yields and reducing costs</li>
                  <li>Contribute to environmental conservation and climate resilience</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;