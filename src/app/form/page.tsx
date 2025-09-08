// components/TimelifeApplicationForm.jsx
//@ts-nocheck
"use client"
import React, { useState } from "react";
import { Crown, User, Mail, Phone, MapPin, Calendar, Shield, Star, Moon, Zap, Users, ArrowRight, ArrowLeft, Check, Lock, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TimelifeApplicationForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedModuleGroup, setSelectedModuleGroup] = useState("first");
  const [selectionError, setSelectionError] = useState("");
  
  const [formData, setFormData] = useState({
    // Program Selection
    duration: 0,
    country: "",
    modules: [],
    
    // Personal Questions
    expectations: "",
    currentSituation: "",
    motivation: "",
    themeFocus: "",
    communityTeam: "",
    schoolStudyTime: "",
    openness: "",
    
    // Personal Info
    salutation: "",
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
    nationality: "",
    address: "",
    postalCode: "",
    city: "",
    countryOfResidence: "",
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
      'duration', 'country', 'salutation', 'firstName', 'lastName', 
      'gender', 'birthDate', 'nationality', 'address', 'postalCode', 
      'city', 'countryOfResidence', 'phone', 'email',
      'expectations', 'currentSituation', 'motivation'
    ];
    
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      toast.error('Please fill out all required fields');
      setIsSubmitting(false);
      return;
    }
    
    // Validate modules for 15-day program
    if (formData.duration === 15 && formData.modules.length !== 3) {
      toast.error('Please select a module group for the 15-day program');
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
        toast.success('Application submitted successfully!');
        router.push("/meeting");
      } else {
        toast.error(data.message || 'Error submitting application');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting application');
    }
    setIsSubmitting(false);
  };

  // Program data
  const countries = ['Morocco'];
  const salutations = ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.'];
  const genders = ['Male', 'Female', 'Other', 'Prefer not to say'];
  
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
      features: ['Accommodation', 'Meals', 'Activities', 'Local Guide', 'Transportation', 'Extended Support'],
      popular: true,
    },
  ];

  // Handle duration changes
  const handleDurationChange = (duration) => {
    if (duration === 30) {
      // For 30-day plan, include all modules
      updateFormData({ 
        duration,
        modules: allModules.map(m => m.id)
      });
      setSelectedModuleGroup("");
    } else {
      // For 15-day plan, set default to first 3 modules
      updateFormData({ 
        duration,
        modules: allModules.slice(0, 3).map(m => m.id)
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white py-8">
      <div className="max-w-5xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-2">
            <Crown className="w-8 h-8" /> Timelife Club Application
          </h1>
          <p className="text-red-600 text-xl">Complete your application in one simple form</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Program Selection Section */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 text-2xl">Program Selection</CardTitle>
              <CardDescription className="text-red-700 text-lg">
                Choose your preferred program options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Country Selection */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-red-800 text-lg z-[9999]">Destination Country *</Label>
                <Select
                  className="z-[9999] font-faculty"
                  value={formData.country}
                  onValueChange={(value) => handleChange("country", value)}
                >
                  <SelectTrigger id="country" className="border-red-300 font-faculty focus:ring-red-500 bg-white h-12 text-lg">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="text-lg font-faculty">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country} className="focus:bg-red-50 font-faculty text-lg">
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Group Size Information */}
              <div className="bg-red-100 p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-red-800 font-medium text-xl">Maximum Group Size:</span>
                  </div>
                  <Badge className="bg-red-600 text-white px-3 py-1 text-md font-faculty">40 People</Badge>
                </div>
                <p className="text-red-700 mt-2 text-lg">
                  Our programs are designed for intimate group experiences with a maximum of 40 participants.
                </p>
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
                            <div className="flex items-center gap-1 font-faculty text-xl text-red-700 mt-1">
                              <Moon className="w-4 h-4" />
                              <span>{plan.duration - 1} Nights</span>
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
            </CardContent>
          </Card>

          {/* Personal Information Section */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 text-2xl">Personal Information</CardTitle>
              <CardDescription className="text-red-700 text-lg">
                Please provide your personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="salutation" className="text-red-800 text-lg">Salutation *</Label>
                  <Select
                    value={formData.salutation}
                    onValueChange={(value) => handleChange('salutation', value)}
                  >
                    <SelectTrigger id="salutation" className="border-red-300 font-faculty focus:ring-red-500 bg-white h-12 text-lg">
                      <SelectValue placeholder="Select salutation">
                        {formData.salutation || "Select salutation"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="text-lg font-faculty">
                      {salutations.map((sal) => (
                        <SelectItem key={sal} value={sal} className="focus:bg-red-50 text-lg">
                          {sal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-red-800 text-lg">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleChange('gender', value)}
                  >
                    <SelectTrigger id="gender" className="border-red-300 focus:ring-red-500 font-faculty bg-white h-12 text-lg">
                      <SelectValue placeholder="Select gender">
                        {formData.gender || "Select gender"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="text-lg">
                      {genders.map((gender) => (
                        <SelectItem key={gender} value={gender} className="focus:bg-red-50 font-faculty text-lg">
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-red-800 text-lg">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-red-800 text-lg">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                    placeholder="Enter your last name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate" className="text-red-800 flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5" /> Date of Birth *
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleChange('birthDate', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality" className="text-red-800 text-lg">Nationality *</Label>
                  <Input
                    id="nationality"
                    type="text"
                    value={formData.nationality}
                    onChange={(e) => handleChange('nationality', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                    placeholder="Enter your nationality"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-red-800 flex items-center gap-2 text-lg">
                    <Phone className="w-5 h-5" /> Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-red-800 flex items-center gap-2 text-lg">
                    <Mail className="w-5 h-5" /> Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address" className="text-red-800 text-lg">Street Address *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                    placeholder="Enter your street address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-red-800 text-lg">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                    placeholder="Enter your city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode" className="text-red-800 text-lg">Postal Code *</Label>
                  <Input
                    id="postalCode"
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                    placeholder="Enter your postal code"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="countryOfResidence" className="text-red-800 text-lg">Country of Residence *</Label>
                  <Input
                    id="countryOfResidence"
                    type="text"
                    value={formData.countryOfResidence}
                    onChange={(e) => handleChange('countryOfResidence', e.target.value)}
                    className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
                    placeholder="Enter your country of residence"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Questions Section */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-900 text-2xl">Application Questions</CardTitle>
              <CardDescription className="text-red-700 text-lg">
                Please answer the following questions thoughtfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Question 1: Expectations */}
              <div className="space-y-2">
                <Label htmlFor="expectations" className="text-red-900 text-xl">
                  1. Erwartungen *
                </Label>
                <p className="text-red-700 text-lg">
                  Was erhoffst du dir ganz persönlich von den 30 Tagen im Timelife Club?
                </p>
                <Textarea
                  id="expectations"
                  className="min-h-32 text-lg border-red-300 focus:ring-red-500 bg-white font-faculty"
                  placeholder="Share your personal expectations..."
                  value={formData.expectations}
                  onChange={(e) => handleChange('expectations', e.target.value)}
                  required
                />
              </div>

              {/* Question 2: Current Situation */}
              <div className="space-y-2">
                <Label htmlFor="currentSituation" className="text-red-900 text-xl">
                  2. Aktuelle Situation *
                </Label>
                <p className="text-red-700 text-lg">
                  Wie würdest du deine aktuelle Lebenssituation beschreiben – wo stehst du gerade, was beschäftigt dich?
                </p>
                <Textarea
                  id="currentSituation"
                  className="min-h-32 text-lg border-red-300 focus:ring-red-500 bg-white font-faculty"
                  placeholder="Describe your current life situation..."
                  value={formData.currentSituation}
                  onChange={(e) => handleChange('currentSituation', e.target.value)}
                  required
                />
              </div>

              {/* Question 3: Motivation */}
              <div className="space-y-2">
                <Label htmlFor="motivation" className="text-red-900 text-xl">
                  3. Motivation *
                </Label>
                <p className="text-red-700 text-lg">
                  Warum möchtest du genau jetzt Teil des Timelife Clubs werden?
                </p>
                <Textarea
                  id="motivation"
                  className="min-h-32 text-lg border-red-300 focus:ring-red-500 bg-white font-faculty"
                  placeholder="Explain your motivation for joining now..."
                  value={formData.motivation}
                  onChange={(e) => handleChange('motivation', e.target.value)}
                  required
                />
              </div>

              {/* Question 4: Theme Focus */}
              <div className="space-y-2">
                <Label htmlFor="themeFocus" className="text-red-900 text-xl">
                  4. Themenschwerpunkt
                </Label>
                <p className="text-red-700 text-lg">
                  Welches der sechs Module spricht dich am meisten an – und warum?
                </p>
                <Textarea
                  id="themeFocus"
                  className="min-h-32 text-lg border-red-300 focus:ring-red-500 bg-white font-faculty"
                  placeholder="Which module appeals to you most and why?"
                  value={formData.themeFocus}
                  onChange={(e) => handleChange('themeFocus', e.target.value)}
                />
              </div>

              {/* Question 5: Community & Team */}
              <div className="space-y-2">
                <Label htmlFor="communityTeam" className="text-red-900 text-xl">
                  5. Community & Team
                </Label>
                <p className="text-red-700 text-lg">
                  Was bedeutet für dich Gemeinschaft, und wie bringst du dich normalerweise in eine Gruppe ein?
                </p>
                <Textarea
                  id="communityTeam"
                  className="min-h-32 text-lg border-red-300 focus:ring-red-500 bg-white font-faculty"
                  placeholder="Share your thoughts on community and how you contribute..."
                  value={formData.communityTeam}
                  onChange={(e) => handleChange('communityTeam', e.target.value)}
                />
              </div>

              {/* Question 6: School & Study Time */}
              <div className="space-y-2">
                <Label htmlFor="schoolStudyTime" className="text-red-900 text-xl">
                  6. Deine Schul- & Studienzeit
                </Label>
                <p className="text-red-700 text-lg">
                  Wie hast du deine Schul- oder Studienzeit erlebt? Was hat dir besonders gefallen – und was hat dir gefehlt?
                </p>
                <Textarea
                  id="schoolStudyTime"
                  className="min-h-32 text-lg border-red-300 focus:ring-red-500 bg-white font-faculty"
                  placeholder="Reflect on your school or study experiences..."
                  value={formData.schoolStudyTime}
                  onChange={(e) => handleChange('schoolStudyTime', e.target.value)}
                />
              </div>

              {/* Question 7: Openness */}
              <div className="space-y-2">
                <Label htmlFor="openness" className="text-red-900 text-xl">
                  7. Offenheit
                </Label>
                <p className="text-red-700 text-lg">
                  Gibt es einen Bereich in deinem Leben, in dem du dir schon lange Veränderung wünschst – und glaubst du, dass der Timelife Club dir dabei helfen kann?
                </p>
                <Textarea
                  id="openness"
                  className="min-h-32 text-lg border-red-300 focus:ring-red-500 bg-white font-faculty"
                  placeholder="Share areas where you desire change and how the club might help..."
                  value={formData.openness}
                  onChange={(e) => handleChange('openness', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg font-medium h-12 transition-all shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimelifeApplicationForm;