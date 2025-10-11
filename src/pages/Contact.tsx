import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(255),
  phone: z.string().min(10, "Phone must be at least 10 digits").max(20).optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    setSubmitted(true);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    form.reset();
    
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const faqs = [
    {
      question: "How accurate are the crop recommendations?",
      answer: "Our recommendations are based on established agricultural research and soil science principles. While they provide a strong starting point, we always recommend consulting with local agricultural extension offices for region-specific advice and conducting your own soil tests for the most accurate results."
    },
    {
      question: "Can I use this tool for organic farming?",
      answer: "Absolutely! The soil assessment tool works for both conventional and organic farming. The crop recommendations take into account natural soil conditions, which is especially valuable for organic farmers who rely on soil health rather than synthetic inputs."
    },
    {
      question: "How often should I assess my soil?",
      answer: "We recommend assessing your soil at least once per growing season, ideally before planting. If you're making significant changes to your farming practices or notice issues with crop performance, more frequent assessments can be beneficial."
    },
    {
      question: "What if no crops are recommended for my soil?",
      answer: "If you receive no recommendations, it may indicate challenging soil conditions. Consider soil amendments like compost, lime (for acidic soil), or sulfur (for alkaline soil). Contact your local agricultural extension office for specific guidance on improving your soil quality."
    },
    {
      question: "Do I need professional soil testing?",
      answer: "While our tool provides valuable insights based on your inputs, professional soil testing offers more detailed analysis including micronutrient levels, heavy metal content, and other factors. We recommend professional testing every 2-3 years for the most comprehensive understanding of your soil."
    },
    {
      question: "Can I use this tool for container or greenhouse gardening?",
      answer: "Yes! The principles apply to all types of growing environments. However, container and greenhouse soils may have different characteristics than field soils, so adjust your inputs accordingly and consider the specific requirements of controlled environment agriculture."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have questions about soil assessment or need help using our tool? 
                We're here to support your farming journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 shadow-card">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold">Send Us a Message</h2>
                  </div>

                  {submitted ? (
                    <div className="py-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                        <Mail className="h-8 w-8 text-accent" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                      <p className="text-muted-foreground">
                        Your message has been sent successfully. We'll respond within 24-48 hours.
                      </p>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your full name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your soil concerns or questions..."
                                  className="min-h-[150px] resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full">
                          Send Message
                        </Button>
                      </form>
                    </Form>
                  )}
                </Card>
              </div>

              {/* FAQ Sidebar */}
              <div className="lg:col-span-1">
                <Card className="p-6 shadow-card sticky top-20">
                  <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                  
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left text-sm">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>

                {/* Contact Info */}
                <Card className="p-6 shadow-card mt-6">
                  <h3 className="text-lg font-bold mb-4">Other Ways to Reach Us</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Email</p>
                        <p className="text-sm text-muted-foreground">support@soilcheck.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Phone</p>
                        <p className="text-sm text-muted-foreground">(+254) 707010203 SOIL-123</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
