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

interface Step1ProgramProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

  // Program data
  const countries = ['Marokko']; // German name
  const allModules = [
    { 
      id: "module1", 
      name: "Modul 1", 
      title: "SSport und Ernährung", 
      description: "Fokus auf körperliche Gesundheit und Wohlbefinden" 
    },
    { 
      id: "module2", 
      name: "Modul 2", 
      title: "Mentale Stärke", 
      description: "Entwicklung mentaler Widerstandsfähigkeit und Stärke" 
    },
    { 
      id: "module3", 
      name: "Modul 3", 
      title: "Teamwork", 
      description: "Zusammenarbeit und gesellschaftliche Wirkung" 
    },
    { 
      id: "module4", 
      name: "Modul 4", 
      title: "Wie baue ich ein Unternehmen auf?", 
      description: "Grundlagen für erfolgreiche Projekte"
    },
    { 
      id: "module5", 
      name: "Modul 5", 
      title: "Steuern und Finanzen", 
      description: "Finanz- und Steuerwissen" 
    },
    { 
      id: "module6", 
      name: "Modul 6", 
      title: "Coaching: Was ist der weg der zu mir passt?", 
      description: "Persönlichkeitsentwicklung und Coaching" 
    }
  ];
  

  const pricingPlans = [
    {
      duration: 15,
      price: "2800€",
      features: [
  "15 Teaching-Tage (3 Module)",
  "Täglicher Brunch & Abendessen",
  "Zimmer im 2–3er Bungalow",
  "Eigenes Bett",
  "Transfer vom Flughafen zum Resort",
  "Abendprogramm"
]
,
      popular: false,
    },
    {
      duration: 30,
      price: "4200€",
      features: [
  "30 Teaching-Tage (6 Module)",
  "Täglicher Brunch & Abendessen",
  "Zimmer im 2–3er Bungalow",
  "Eigenes Bett",
  "Transfer vom Flughafen zum Resort",
  "Abendprogramm"
],
      popular: true,
    },
  ];

export function Step1Program({ formData, updateFormData, onNext }: Step1ProgramProps) {
  const [selectionError, setSelectionError] = useState("");
  const [selectedModuleGroup, setSelectedModuleGroup] = useState<"first" | "second">("first");
  const selectedPlan = pricingPlans.find(plan => plan.duration === formData.duration);
// Replace your current useEffect with this minimal version:


  useEffect(() => {
    console.log("Current formData:", formData);
  }, [formData]);
  
  // Handle duration changes
  const handleDurationChange = (duration: number) => {
    if (duration === 30) {
      // For 30-day plan, include all 6 modules
      updateFormData({ 
        duration,
        modules: allModules.map(m => m.id),
        moduleTitles: allModules.map(m => m.title)
      });
      setSelectedModuleGroup("first"); // Reset module group selection
    } else {
      // For 15-day plan, set default to first 3 modules
      updateFormData({ 
        duration,
        modules: allModules.slice(0, 3).map(m => m.id),
        moduleTitles: allModules.slice(0, 3).map(m => m.title)
      });
      setSelectedModuleGroup("first"); // Set to first group by default
    }
    setSelectionError("");
  };

  // Handle module group selection for 15-day program
  const handleModuleGroupSelection = (group: "first" | "second") => {
    if (formData.duration !== 15) return;
    
    if (group === "first") {
      // Select all modules from first group (1-3)
      updateFormData({ 
        modules: allModules.slice(0, 3).map(m => m.id),
        moduleTitles: allModules.slice(0, 3).map(m => m.title)
      });
      setSelectedModuleGroup("first");
    } else {
      // Select all modules from second group (4-6)
      updateFormData({ 
        modules: allModules.slice(3, 6).map(m => m.id),
        moduleTitles: allModules.slice(3, 6).map(m => m.title)
      });
      setSelectedModuleGroup("second");
    }
  };

  const canProceed = formData.duration > 0 && 
                    (formData.duration === 30 || 
                    (formData.duration === 15 && formData.modules && formData.modules.length === 3));

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-2">
          <Crown className="w-8 h-8" /> Choose Your Program
        </h2>
        <p className="text-red-600 text-xl">Select your preferred program and duration</p>
      </div>



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
                  <span className="text-red-700 font-faculty">{plan.price}</span>
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

      {/* Date Information - Show for selected duration */}
      {formData.duration > 0 && (
        <div className="text-center mb-6">
          <div className="bg-white rounded-lg p-4 border border-red-200 max-w-md mx-auto">
            <p className="text-red-800 text-lg font-medium font-faculty">
              {formData.duration === 15 ? "13 bis 28 August 2026" : "Vom 30 Juli bis zum 28 August 2026"}
            </p>
            <p className="text-red-600 text-sm mt-1">Reisedaten</p>
          </div>
        </div>
      )}

      {/* Module Selection - Only show if 15-day duration is selected */}
      {formData.duration === 15 && (
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-red-900 text-2xl flex items-center gap-2">
              <Zap className="w-6 h-6" /> Modulauswahl
            </CardTitle>
            <CardDescription className="text-red-700 text-lg">
              Wähle deine Module und Reisezeit für dein 15-Tage-Programm
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
                .filter((module, index) => {
                  return selectedModuleGroup === "first" ? index < 3 : index >= 3;
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

        
          </CardContent>
        </Card>
      )}

      {/* Module Display for 30-day plan */}
      {formData.duration === 30 && (
        <Card className="bg-white">
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