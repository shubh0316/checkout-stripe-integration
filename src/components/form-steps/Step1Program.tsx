//@ts-nocheck
import { useState, useEffect } from "react";
import { FormData } from '@/types/form';
import { Check, Crown, Star, Calendar, MapPin, Zap, AlertCircle, Users, Moon } from "lucide-react";
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

const moduleOptions = [
  { id: "module1", name: "Module 1", description: "Cultural & Adventure activities" },
  { id: "module2", name: "Module 2", description: "Culinary & Historical experiences" },
  { id: "module3", name: "Module 3", description: "Complete program with all modules" }
];

const pricingPlans = [
  {
    duration: 15,
    price: 2800,
    features: ['Accommodation', 'Meals', 'Activities', 'Local Guide', 'Transportation'],
    popular: false,
    includedModule: "module1", // Default for 15-day
  },
  {
    duration: 30,
    price: 4200,
    features: ['Accommodation', 'Meals', 'Activities', 'Local Guide', 'Transportation', 'Extended Support', 'Certificate'],
    popular: true,
    includedModule: "module3", // Fixed for 30-day
  },
];

export function Step1Program({ formData, updateFormData, onNext }: Step1ProgramProps) {
  const [selectionError, setSelectionError] = useState("");
  const selectedPlan = pricingPlans.find(plan => plan.duration === formData.duration);
  
  useEffect(() => {
    console.log("Current formData:", formData);
    console.log("Module value:", formData.module);
  }, [formData]);
  
  // Handle duration changes
  const handleDurationChange = (duration: number) => {
    const plan = pricingPlans.find(p => p.duration === duration);
    if (plan) {
      if (duration === 30) {
        // For 30-day plan, automatically set to module 3
        updateFormData({ 
          duration,
          module: plan.includedModule
        });
        setSelectionError("");
      } else {
        // For 15-day plan, set to default module but allow change
        updateFormData({ 
          duration,
          module: plan.includedModule
        });
        setSelectionError("");
      }
    }
  };

  // Handle module selection change
  const handleModuleChange = (moduleId: string) => {
    if (formData.duration === 30) {
      toast.info('Module 3 is automatically included with the 30-day program');
      return; // Can't change modules for 30-day plan
    }
    
    updateFormData({ module: moduleId });
    setSelectionError("");
    toast.success(`Module ${moduleId.replace('module', '')} selected`);
  };

  const canProceed = formData.duration > 0 && formData.country && 
                    (formData.duration === 30 || 
                    (formData.duration === 15 && formData.module));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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
                    ? "Module 3: Complete Experience" 
                    : `Module: ${plan.includedModule === "module1" ? "Cultural & Adventure" : "Culinary & History"}`}
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
              <Zap className="w-6 h-6" /> Program Module
            </CardTitle>
            <CardDescription className="text-red-700 text-lg">
              Select your preferred module for the 15-day program
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectionError && (
              <Alert variant="destructive" className="mb-4 bg-red-100 border-red-300 text-red-800">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{selectionError}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="module" className="text-red-800 text-lg">Select Module *</Label>
              <Select
                value={formData.module}
                onValueChange={(value) => handleModuleChange(value)}
              >
                <SelectTrigger id="module" className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg placeholder:text-gray-500 font-faculty">
                  <SelectValue placeholder="Select a module" className="font-faculty" />
                </SelectTrigger>
                <SelectContent className="text-lg">
                  {moduleOptions
                    .filter(module => module.id !== "module3") // Exclude module 3 for 15-day plans
                    .map((module) => (
                    <SelectItem key={module.id} value={module.id} className="focus:bg-red-50 text-lg font-faculty">
                      <div className="flex flex-col">
                        <span className="font-medium">{module.name}{" "}{module.description}</span>                        
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module Display for 30-day plan */}
      {formData.duration === 30 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-900 text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6" /> Program Module
            </CardTitle>
            <CardDescription className="text-red-700 text-lg">
              Included module for the 30-day program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg border-2 border-red-600 bg-red-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-600 border-red-600 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-red-900 text-lg">{moduleOptions[2].name}</h3>
                  <p className="text-red-700 mt-1 text-lg">{moduleOptions[2].description}</p>
                  <p className="text-md text-red-600 mt-2 italic">
                    This module is automatically included with the 30-day program and cannot be changed.
                  </p>
                </div>
              </div>
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