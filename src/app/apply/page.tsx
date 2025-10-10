// components/TimelifeApplicationForm.jsx
//@ts-nocheck
"use client"
import React, {useEffect, useState  } from "react";
import { Crown, User, Mail, Phone, MapPin, Calendar, Shield, Star, Moon, Zap, Users, ArrowRight, ArrowLeft, Check, Lock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TimelifeApplicationForm = () => {

  // Re-protect on state changes

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModuleGroup, setSelectedModuleGroup] = useState("first");
  const [selectionError, setSelectionError] = useState("");
  
  const [formData, setFormData] = useState({
    // Program Selection
    duration: 0,
    modules: [],
    moduleTitles: [],
    
    // Personal Questions
    expectations: "",
    currentSituation: "",
    themeFocus: "",
    communityTeam: "",
    schoolStudyTime: "",
    openness: "",
    
    // Personal Info
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    nationality: "",
    address: "",
    postalCode: "",
    city: "",
    phone: "",
    email: ""
  });

  const updateFormData = (updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates
    }));
  };

  const handleChange = (field, value) => {
    console.log(`Field: ${field}, Value: ${value}`);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate all required fields
    const requiredFields = [
      'duration', 'firstName', 'lastName', 
       'birthDate', 'nationality', 'address', 'postalCode', 
      'city', 'phone', 'email',
      'expectations', 'currentSituation'
    ];
    
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      setIsSubmitting(false);
      return;
    }
    
    // Validate modules for 15-day program
    if (formData.duration === 15 && formData.modules.length !== 3) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      const response = await fetch('/api/form2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: formData,
          email: formData.email || "shubhankersaxena5@gmail.com"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/meeting");
      } else {
        // Handle error silently or with inline error display
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error silently or with inline error display
    }
    setIsSubmitting(false);
  };

  // Program data
  const countries = ['Marokko']; // German name
  const genders = ['Männlich', 'Weiblich', 'Andere', 'Keine Angabe']; // German genders
  
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
      ],
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

  // Handle duration changes
  const handleDurationChange = (duration) => {
    if (duration === 30) {
      // For 30-day plan, include all modules
      updateFormData({ 
        duration,
        modules: allModules.map(m => m.id),
        moduleTitles: allModules.map(m => m.title)
      });
      setSelectedModuleGroup("");
    } else {
      // For 15-day plan, set default to first 3 modules
      updateFormData({ 
        duration,
        modules: allModules.slice(0, 3).map(m => m.id),
        moduleTitles: allModules.slice(0, 3).map(m => m.title)
      });
      setSelectedModuleGroup("first");
    }
    setSelectionError("");
  };

  // Handle module group selection for 15-day program
  const handleModuleGroupSelection = (group) => {
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-8">
      <div className="max-w-5xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-2">
            <Crown className="w-8 h-8" /> Deine Bewerbung für die TimeLife Club Reise
          </h1>
          <p className="text-red-600 text-xl">Vervollständige deine Bewerbung ganz easy im Formular.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Program Selection Section */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-red-900 text-lg sm:text-xl md:text-2xl">Auswahl</CardTitle>
              <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
                Wähle deine bevorzugte Editionsdauer 
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">

              {/* Group Size Information */}
              <div className="bg-red-100 p-3 sm:p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-red-800 font-medium text-base sm:text-lg md:text-xl">Eine Kliene Info:</span>
                  </div>
                </div>
                <p className="text-red-700 mt-2 text-sm sm:text-base md:text-lg">
                  Keine Sorge: Mit der Bewerbung gehst du noch keine Buchung ein. Die Bewerbung ist wichtig, damit wir dich schon vor der Buchung kennenlernen können. Nachdem Durchsehen deiner Bewerbung erhältst du den Booking-Link
                </p>
              </div>

              {/* Duration Selection */}
              <div className="space-y-3 sm:space-y-4">
                <Label className="text-red-800 flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />PROGRAM DAUER AUSWÄHLEN *
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
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
                      <CardHeader className={`pb-3 relative ${plan.popular ? 'pt-8 sm:pt-6' : 'pt-4 sm:pt-6'}`}>
                        {plan.popular && (
                          <Badge className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 sm:px-3 py-1 flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap">
                            <Star className="w-3 h-3 fill-current" /> Unsere Empfehlung
                          </Badge>
                        )}
                        <CardTitle className="text-red-900 text-base sm:text-lg md:text-xl">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div>
                              <span className="font-faculty text-lg sm:text-xl">{plan.duration} Days</span>
                              <div className="flex items-center gap-1 font-faculty text-base sm:text-lg md:text-xl text-red-700 mt-1">
                                <Moon className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>{plan.duration - 1} Nights</span>
                              </div>
                            </div>
                            <span className="text-red-700 font-faculty text-xl sm:text-2xl font-bold">{plan.price}</span>
                          </div>
                        </CardTitle>
                        <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg mt-2">
                          {plan.duration === 30 
                            ? "(Unsere Empfehlung)" 
                            : "(MODUL 1 BIS 3 ODER MODUL 4 BIS 6)"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-4 px-4 sm:px-6">
                        <ul className="text-red-800 text-sm sm:text-base md:text-lg space-y-1.5 sm:space-y-2">
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
                <div className="text-center mb-4 sm:mb-6">
                  <div className="bg-white rounded-lg p-3 sm:p-4 border border-red-200 max-w-md mx-auto">
                    <p className="text-red-800 text-base sm:text-lg font-medium font-faculty">
                      {formData.duration === 15 ? 
                        (selectedModuleGroup === "first" ? "29. Juli bis 13. August 2026" : "13. bis 28. August 2026") 
                        : "Vom 29. Juli bis zum 28. August 2026"}
                    </p>
                  </div>
                </div>
              )}

              {/* Module Selection - Only show if 15-day duration is selected */}
              {formData.duration === 15 && (
                <Card className="border-red-200 bg-red-50">
                  <CardHeader className="px-4 sm:px-6">
                    <CardTitle className="text-red-900 text-lg sm:text-xl md:text-2xl flex items-center gap-2">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6" /> Modulauswahl
                    </CardTitle>
                    <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
                      Wähle deine Module und Reisezeit für dein 15-Tage-Programm
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-4 sm:px-6">
                    {selectionError && (
                      <Alert variant="destructive" className="mb-4 bg-red-100 border-red-300 text-red-800">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{selectionError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex justify-center mb-4 sm:mb-6">
                      <div className="flex bg-red-100 rounded-lg p-1 w-full sm:w-auto">
                        <button
                          type="button" // This prevents form submission
                          className={`px-3 sm:px-4 py-2 rounded-md transition-all flex-1 sm:flex-none text-sm sm:text-base ${
                            selectedModuleGroup === "first" 
                              ? "bg-white text-red-800 shadow" 
                              : "text-red-600 hover:bg-red-200"
                          }`}
                          onClick={() => handleModuleGroupSelection("first")}
                        >
                          Modules 1-3
                        </button>
                        <button
                          type="button" // This prevents form submission
                          className={`px-3 sm:px-4 py-2 rounded-md transition-all flex-1 sm:flex-none text-sm sm:text-base ${
                            selectedModuleGroup === "second" 
                              ? "bg-white text-red-800 shadow" 
                              : "text-red-600 hover:bg-red-200"
                          }`}
                          onClick={() => handleModuleGroupSelection("second")}
                        >
                          Modules 4-6
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {allModules
                        .filter((module, index) => {
                          return selectedModuleGroup === "first" ? index < 3 : index >= 3;
                        })
                        .map((module) => {
                          const isSelected = formData.modules && formData.modules.includes(module.id);
                          return (
                            <div
                              key={module.id}
                              className={`border-2 rounded-lg p-3 sm:p-4 transition-all ${
                                isSelected
                                  ? 'border-red-600 bg-red-100 shadow-md cursor-default'
                                  : 'border-red-200 bg-white cursor-default opacity-80'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <Badge 
                                  className={`text-xs sm:text-sm ${
                                    isSelected 
                                      ? "bg-red-600 text-white" 
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {module.name}
                                </Badge>
                                {isSelected ? (
                                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                                ) : (
                                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" />
                                )}
                              </div>
                              <h3 className="font-semibold text-red-900 mb-1 text-base sm:text-lg">{module.title}</h3>
                              <p className="text-red-700 text-sm sm:text-base">{module.description}</p>
                              {isSelected && (
                                <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-red-600 flex items-center">
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" /> Included in selected group
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
            </CardContent>
          </Card>

          {/* Application Questions Section */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-red-900 text-lg sm:text-xl md:text-2xl">Ein paar Fragen an dich</CardTitle>
              <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
                Bitte beantworte die folgenden Fragen sorgfältig.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              {/* Question 1: Expectations */}
              <div className="space-y-2">
                <Label htmlFor="expectations" className="text-red-900 text-base sm:text-lg md:text-xl">
                  1. Expectations *
                </Label>
                <p className="text-red-700 text-sm sm:text-base md:text-lg">
                  Was erhoffst du dir ganz persönlich von den 30 Tagen im Timelife Club?
                </p>
                <Textarea
                  id="expectations"
                  className="min-h-32 text-base sm:text-lg border-red-300 focus:ring-red-500 bg-white"
                  value={formData.expectations}
                  onChange={(e) => handleChange('expectations', e.target.value)}
                  required
                />
              </div>

              {/* Question 2: Current Situation */}
              <div className="space-y-2">
                <Label htmlFor="currentSituation" className="text-red-900 text-base sm:text-lg md:text-xl">
                  2. Aktuelle Situation *
                </Label>
                <p className="text-red-700 text-sm sm:text-base md:text-lg">
                  Wie würdest du deine aktuelle Lebenssituation beschreiben – wo stehst du gerade, was beschäftigt dich?
                </p>
                <Textarea
                  id="currentSituation"
                  className="min-h-32 text-base sm:text-lg border-red-300 focus:ring-red-500 bg-white"
                  value={formData.currentSituation}
                  onChange={(e) => handleChange('currentSituation', e.target.value)}
                  required
                />
              </div>

              {/* Question 3: Theme Focus */}
              <div className="space-y-2">
                <Label htmlFor="themeFocus" className="text-red-900 text-base sm:text-lg md:text-xl">
                  3. Themenschwerpunkt
                </Label>
                <p className="text-red-700 text-sm sm:text-base md:text-lg">
                  Welches der sechs Module spricht dich am meisten an – und warum?
                </p>
                <Textarea
                  id="themeFocus"
                  className="min-h-32 text-base sm:text-lg border-red-300 focus:ring-red-500 bg-white"
                  value={formData.themeFocus}
                  onChange={(e) => handleChange('themeFocus', e.target.value)}
                />
              </div>

              {/* Question 4: Community & Team */}
              <div className="space-y-2">
                <Label htmlFor="communityTeam" className="text-red-900 text-base sm:text-lg md:text-xl">
                  4. Community & Team
                </Label>
                <p className="text-red-700 text-sm sm:text-base md:text-lg">
                  Was bedeutet für dich Gemeinschaft, und wie bringst du dich normalerweise in eine Gruppe ein?
                </p>
                <Textarea
                  id="communityTeam"
                  className="min-h-32 text-base sm:text-lg border-red-300 focus:ring-red-500 bg-white"
                  value={formData.communityTeam}
                  onChange={(e) => handleChange('communityTeam', e.target.value)}
                />
              </div>

              {/* Question 5: School & Study Time */}
              <div className="space-y-2">
                <Label htmlFor="schoolStudyTime" className="text-red-900 text-base sm:text-lg md:text-xl">
                  5. Deine Schul- & Studienzeit
                </Label>
                <p className="text-red-700 text-sm sm:text-base md:text-lg">
                  Wie hast du deine Schul- oder Studienzeit erlebt? Was hat dir besonders gefallen – und was hat dir gefehlt?
                </p>
                <Textarea
                  id="schoolStudyTime"
                  className="min-h-32 text-base sm:text-lg border-red-300 focus:ring-red-500 bg-white"
                  value={formData.schoolStudyTime}
                  onChange={(e) => handleChange('schoolStudyTime', e.target.value)}
                />
              </div>

              {/* Question 6: Openness */}
              <div className="space-y-2">
                <Label htmlFor="openness" className="text-red-900 text-base sm:text-lg md:text-xl">
                  6. Veränderung
                </Label>
                <p className="text-red-700 text-sm sm:text-base md:text-lg">
                  Gibt es einen Bereich in deinem Leben, in dem du dir schon lange Veränderung wünschst – und glaubst du, dass der Timelife Club dir dabei helfen kann?
                </p>
                <Textarea
                  id="openness"
                  className="min-h-32 text-base sm:text-lg border-red-300 focus:ring-red-500 bg-white"
                  value={formData.openness}
                  onChange={(e) => handleChange('openness', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Personal Information Section */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="text-red-900 text-lg sm:text-xl md:text-2xl">Personal Information</CardTitle>
              <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
                Trage hier deine persönlichen Daten ein.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-red-800 text-base sm:text-lg">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                    placeholder="Gebe deinen Vornamen ein"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-red-800 text-base sm:text-lg">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                    placeholder="Gebe deinen Nachnamen ein"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-red-800 flex items-center gap-2 text-base sm:text-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" /> Date of Birth *
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    placeholder="tt/mm/jjjj"
                    value={formData.birthDate}
                    onChange={(e) => handleChange('birthDate', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                    pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality" className="text-red-800 text-base sm:text-lg">Nationality *</Label>
                  <Input
                    id="nationality"
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                    placeholder="Gebe deinen Nationalität ein"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-red-800 flex items-center gap-2 text-base sm:text-lg">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                    placeholder="Gebe deinen Handynummer ein"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-red-800 flex items-center gap-2 text-base sm:text-lg">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                    placeholder="Gebe deinen E-Mail Adresse ein"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address" className="text-red-800 text-base sm:text-lg">Street Address *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                    placeholder="Gebe deinen Adresse ein"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-red-800 text-base sm:text-lg">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                    placeholder="Gebe deinen Stadt ein"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-red-800 text-base sm:text-lg">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                    placeholder="Gebe deinen Postleitzahl ein"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex flex-col justify-center pt-4 sm:pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-700 hover:bg-red-800 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium h-11 sm:h-12 transition-all shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
            <p className="text-center text-red-800 mt-2 text-sm sm:text-base">Mit dem Absenden der Bewerbung gehst du noch keine Buchung ein.</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimelifeApplicationForm;