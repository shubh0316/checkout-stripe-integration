//@ts-nocheck
import { useState, useEffect } from "react";
import { FormData } from '@/types/form';
import { Check, Crown, Star, Calendar, MapPin, Zap, AlertCircle, Users, Moon, ChevronRight, ChevronLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from 'sonner';

interface Step1ProgramProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const countries = ['Morocco'];

const allModules = [
  { id: "module1", name: "Module 1", title: "Sport, Ernährung und Gesundheit", description: "Focus on physical health and wellness" },
  { id: "module2", name: "Module 2", title: "Mentale Gesundheit und Stärke", description: "Develop mental resilience and strength" },
  { id: "module3", name: "Module 3", title: "Wie baue ich ein Unternehmen auf?", description: "Entrepreneurship fundamentals" },
  { id: "module4", name: "Module 4", title: "Steuern, Finanzen und Recht", description: "Financial and legal knowledge" },
  { id: "module5", name: "Module 5", title: "Teamwork & Soziales Projekt", description: "Collaboration and social impact" },
  { id: "module6", name: "Module 6", title: "Coaching: Was ist dein way of living?", description: "Personal development coaching" }
];

const pricingPlans = [
  {
    duration: 15,
    price: 2800,
    features: ['Accommodation', 'Meals', 'Activities', 'Local Guide', 'Transportation'],
    popular: false,
  },
  {
    duration: 30,
    price: 4200,
    features: ['Accommodation', 'Meals', 'Activities', 'Local Guide', 'Transportation', 'Extended Support', 'Certificate'],
    popular: true,
  },
];

export function Step1Program({ formData, updateFormData, onNext }: Step1ProgramProps) {
  const [selectionError, setSelectionError] = useState("");
  const [selectedModuleGroup, setSelectedModuleGroup] = useState<"first" | "second">("first");
  const selectedPlan = pricingPlans.find(plan => plan.duration === formData.duration);
  
  useEffect(() => {
    console.log("Current formData:", formData);
  }, [formData]);
  
  // Handle duration changes
  const handleDurationChange = (duration: number) => {
    if (duration === 30) {
      // For 30-day plan, include all modules
      updateFormData({ 
        duration,
        modules: allModules.map(m => m.id)
      });
    } else {
      // For 15-day plan, set default to first 3 modules
      updateFormData({ 
        duration,
        modules: allModules.slice(0, 3).map(m => m.id)
      });
    }
    setSelectionError("");
  };

  // Handle module group selection for 15-day program
  const handleModuleGroupSelection = (group: "first" | "second") => {
    if (formData.duration !== 15) return;
    
    if (group === "first") {
      // Select all modules from first group (1-3)
      updateFormData({ 
        modules: allModules.slice(0, 3).map(m => m.id)
      });
      setSelectedModuleGroup("first");
    } else {
      // Select all modules from second group (4-6)
      updateFormData({ 
        modules: allModules.slice(3, 6).map(m => m.id)
      });
      setSelectedModuleGroup("second");
    }
  };

  const canProceed = formData.duration > 0 && formData.country && 
                    (formData.duration === 30 || 
                    (formData.duration === 15 && formData.modules && formData.modules.length === 3));

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-2">
          <Crown className="w-8 h-8" /> Choose Your Program
        </h2>
        <p className="text-red-600 text-xl">Select your preferred program, destination, and duration</p>
      </div>

      {/* Country Selection */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <MapPin className="w-6 h-6" /> Destination Country
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Where would you like to experience your program?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="country" className="text-red-800 text-lg">Select Country *</Label>
            <Select
              value={formData.country}
              onValueChange={(value) => {
                updateFormData({ country: value });
              }}
            >
              <SelectTrigger id="country" className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg placeholder:text-gray-500 font-faculty">
                <SelectValue placeholder="Select a country" className="font-faculty" />
              </SelectTrigger>
              <SelectContent className="text-lg">
                {countries.map((country) => (
                  <SelectItem key={country} value={country} className="focus:bg-red-50 text-lg font-faculty">
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Group Size Information */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <Users className="w-6 h-6" /> Group Size
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Information about your travel group
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-red-100 p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-red-800 font-medium text-xl">Maximum Group Size:</span>
              </div>
              <Badge className="bg-red-600 text-white px-3 py-1 text-md">40 People</Badge>
            </div>
            <p className="text-red-700 mt-2 text-lg">
              Our programs are designed for intimate group experiences with a maximum of 40 participants to ensure personalized attention.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Duration Selection */}
      <div className="space-y-4">
        <Label className="text-red-800 flex items-center gap-2 text-2xl">
          <Calendar className="w-6 h-6" /> Program Duration *
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.duration}
              className={`cursor-pointer transition-all border-2 ${
                formData.duration === plan.duration
                  ? 'border-red-600 bg-red-50 shadow-lg'
                  : 'border-red-200 hover:border-red-400 bg-white'
              }`}
              onClick={() => handleDurationChange(plan.duration)}
            >
              <CardHeader className="pb-3 relative">
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-3 py-1 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" /> Most Popular
                  </Badge>
                )}
                <CardTitle className="text-red-900 text-xl flex justify-between items-start">
                  <div>
                    <span className="font-faculty">{plan.duration} Days</span>
                    <div className="flex items-center gap-1 font-normal text-xl text-red-700 mt-1">
                      <Moon className="w-4 h-4" />
                      <span className="font-faculty">{plan.duration - 1} Nights</span>
                    </div>
                  </div>
                  <span className="text-red-700 font-faculty">${plan.price}</span>
                </CardTitle>
                <CardDescription className="text-red-700 text-lg">
                  {plan.duration === 30 
                    ? "Complete program with all 6 modules" 
                    : "Custom program with 3 modules of your choice"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="text-red-800 text-lg space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-red-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Module Selection - Only show if 15-day duration is selected */}
      {formData.duration === 15 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900 text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6" /> Program Modules
            </CardTitle>
            <CardDescription className="text-red-700 text-lg">
              Select a module group for your 15-day program
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectionError && (
              <Alert variant="destructive" className="mb-4 bg-red-100 border-red-300 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{selectionError}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center mb-6">
              <div className="flex bg-red-100 rounded-lg p-1">
                <Button
                  variant={selectedModuleGroup === "first" ? "default" : "ghost"}
                  className={`px-4 ${selectedModuleGroup === "first" ? "bg-white hover:bg-white shadow text-red-800" : "text-red-600"}`}
                  onClick={() => handleModuleGroupSelection("first")}
                >
                  Modules 1-3
                </Button>
                <Button
                  variant={selectedModuleGroup === "second" ? "default" : "ghost"}
                  className={`px-4 ${selectedModuleGroup === "second" ? "bg-white hover:bg-white shadow text-red-800" : "text-red-600"}`}
                  onClick={() => handleModuleGroupSelection("second")}
                >
                  Modules 4-6
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {allModules
                .filter(module => {
                  const moduleIndex = allModules.findIndex(m => m.id === module.id);
                  return selectedModuleGroup === "first" ? moduleIndex < 3 : moduleIndex >= 3;
                })
                .map((module) => {
                  const isSelected = formData.modules && formData.modules.includes(module.id);
                  return (
                    <div
                      key={module.id}
                      className={`border-2 rounded-lg p-4 transition-all ${
                        isSelected
                          ? 'border-red-600 bg-red-100 shadow-md cursor-default'
                          : 'border-red-200 bg-white cursor-default opacity-80'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge 
                          className={
                            isSelected 
                              ? "bg-red-600 text-white" 
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {module.name}
                        </Badge>
                        {isSelected ? (
                          <Check className="w-5 h-5 text-red-600" />
                        ) : (
                          <Lock className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <h3 className="font-semibold text-red-900 mb-1 text-lg">{module.title}</h3>
                      <p className="text-red-700">{module.description}</p>
                      {isSelected && (
                        <div className="mt-3 text-sm text-red-600 flex items-center">
                          <Check className="w-4 h-4 mr-1" /> Included in selected group
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="mt-6 text-center text-red-700 text-lg">
              {selectedModuleGroup === "first" 
                ? "Modules 1-3 are selected as a complete group" 
                : "Modules 4-6 are selected as a complete group"}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module Display for 30-day plan */}
      {formData.duration === 30 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900 text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6" /> Program Modules
            </CardTitle>
            <CardDescription className="text-red-700 text-lg">
              All 6 modules are included in the 30-day program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allModules.map((module) => (
                <div
                  key={module.id}
                  className="border-2 border-red-300 rounded-lg p-4 bg-red-100"
                >
                  <Badge className="bg-red-600 text-white mb-2">
                    {module.name}
                  </Badge>
                  <h3 className="font-semibold text-red-900 mb-1 text-lg">{module.title}</h3>
                  <p className="text-red-700">{module.description}</p>
                  <div className="flex items-center mt-3 text-red-600">
                    <Check className="w-5 h-5 mr-1" /> Included
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
        <Button
          onClick={() => {
            if (canProceed) {
              onNext();
              toast.success('Program selection completed!');
            } else {
              toast.error('Please complete all required fields');
            }
          }}
          disabled={!canProceed}
          className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg font-medium h-12 transition-all shadow-lg hover:shadow-xl"
        >
          Continue 
        </Button>
      </div>
    </div>
  );
}