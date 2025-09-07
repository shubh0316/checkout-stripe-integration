//@ts-nocheck
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertCircle, Crown } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form schema
const formSchema = {
  expectations: "",
  currentSituation: "",
  motivation: "",
  focusTopic: "",
  community: "",
  schoolTime: "",
  openness: ""
};

export default function AdditionalInfoForm() {
  const [formData, setFormData] = useState(formSchema);
  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form data:", formData);
      // Here you would typically send the data to your backend
      setIsOpen(false);
      // Reset form
      setFormData(formSchema);
    }
  };

  const questions = [
    {
      id: "expectations",
      label: "Erwartungen",
      description: "Was erhoffst du dir ganz persönlich von den 30 Tagen im Timelife Club?"
    },
    {
      id: "currentSituation",
      label: "Aktuelle Situation",
      description: "Wie würdest du deine aktuelle Lebenssituation beschreiben – wo stehst du gerade, was beschäftigt dich?"
    },
    {
      id: "motivation",
      label: "Motivation",
      description: "Warum möchtest du genau jetzt Teil des Timelife Clubs werden?"
    },
    {
      id: "focusTopic",
      label: "Themenschwerpunkt",
      description: "Welches der sechs Module spricht dich am meisten an – und warum?"
    },
    {
      id: "community",
      label: "Community & Team",
      description: "Was bedeutet für dich Gemeinschaft, und wie bringst du dich normalerweise in eine Gruppe ein?"
    },
    {
      id: "schoolTime",
      label: "Deine Schul- & Studienzeit",
      description: "Wie hast du deine Schul- oder Studienzeit erlebt? Was hat dir besonders gefallen – und was hat dir gefehlt?"
    },
    {
      id: "openness",
      label: "Offenheit",
      description: "Gibt es einen Bereich in deinem Leben, in dem du dir schon lange Veränderung wünschst – und glaubst du, dass der Timelife Club dir dabei helfen kann?"
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-2">
          <Crown className="w-8 h-8" /> Choose Your Program
        </h2>
        <p className="text-red-600 text-xl">Select your preferred program, destination, and duration</p>
      </div>

      {/* Your existing form components would go here */}

      {/* Additional Information Modal Trigger */}
      <div className="flex justify-center pt-6">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg font-medium h-12 transition-all shadow-lg hover:shadow-xl font-faculty">
              Provide Additional Information
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto font-faculty">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-red-800 flex items-center gap-2">
                <Crown className="w-8 h-8" /> Additional Information
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <Alert className="bg-red-50 border-red-200">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <AlertDescription className="text-red-700 text-lg">
                  Please provide detailed answers to help us better understand your needs and expectations.
                </AlertDescription>
              </Alert>

              {questions.map((question) => (
                <Card key={question.id} className="border-red-200 bg-red-50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-900 text-2xl">
                      {question.label}
                    </CardTitle>
                    <CardDescription className="text-red-700 text-lg">
                      {question.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Textarea
                        value={formData[question.id]}
                        onChange={(e) => handleChange(question.id, e.target.value)}
                        className={`min-h-32 text-lg border-red-300 focus:ring-red-500 bg-white placeholder:text-gray-500 font-faculty ${
                          errors[question.id] ? "border-red-500" : ""
                        }`}
                        placeholder="Type your answer here..."
                      />
                      {errors[question.id] && (
                        <p className="text-red-500 text-sm">{errors[question.id]}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="border-red-300 text-red-700 hover:bg-red-50 px-6 py-2 text-lg h-12 font-faculty"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg h-12 font-faculty"
                >
                  Submit Information
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}