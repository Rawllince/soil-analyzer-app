import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const profileSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const Profile = () => {
  const [user, setUser] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    fetchProfile();
    fetchAssessments();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setValue("email", userData.email);
      } else {
        setError("Failed to load profile");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  const fetchAssessments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/assessments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAssessments(data);
      }
    } catch (err) {
      console.error("Failed to load assessments");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setUpdateError("");
    setUpdateSuccess("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setUpdateSuccess("Profile updated successfully");
      } else {
        const errorData = await response.json();
        setUpdateError(errorData.error || "Update failed");
      }
    } catch (err) {
      setUpdateError("Network error");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {updateError && (
                <Alert variant="destructive">
                  <AlertDescription>{updateError}</AlertDescription>
                </Alert>
              )}

              {updateSuccess && (
                <Alert>
                  <AlertDescription>{updateSuccess}</AlertDescription>
                </Alert>
              )}

              <Button type="submit">Update Profile</Button>
            </form>
          </CardContent>
        </Card>

        {/* Analysis History */}
        <Card>
          <CardHeader>
            <CardTitle>Analysis History</CardTitle>
            <CardDescription>Your soil assessment records</CardDescription>
          </CardHeader>
          <CardContent>
            {assessments.length === 0 ? (
              <p className="text-gray-500">No assessments found. Start by creating your first soil analysis!</p>
            ) : (
              <div className="space-y-4">
                {assessments.map((assessment) => (
                  <div key={assessment._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">Soil Assessment</h3>
                      <Badge variant="outline">
                        {new Date(assessment.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Type:</span> {assessment.soilType}
                      </div>
                      <div>
                        <span className="font-medium">Moisture:</span> {assessment.moisture}%
                      </div>
                      <div>
                        <span className="font-medium">Organic:</span> {assessment.organicContent}%
                      </div>
                      <div>
                        <span className="font-medium">pH:</span> {assessment.ph}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Recommendations:</h4>
                      <div className="space-y-2">
                        {assessment.recommendations.slice(0, 3).map((rec, index) => (
                          <div key={index} className="text-sm">
                            <span className="font-medium">{rec.name}</span> - {rec.suitability}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;