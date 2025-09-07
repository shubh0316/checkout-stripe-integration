// components/TimelifeApplicationForm.jsx
//@ts-nocheck
"use client"
import React, { useEffect, useState } from "react";
import { Crown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const TimelifeApplicationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    expectations: "",
    currentSituation: "",
    motivation: "",
    themeFocus: "",
    communityTeam: "",
    schoolStudyTime: "",
    openness: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  


  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Basic validation
    const requiredFields = ['expectations', 'currentSituation', 'motivation'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    
    if (emptyFields.length > 0) {
      toast.error('Please fill out all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/form2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: formData,
          email: "shubhankersaxena5@gmail.com" // Replace with dynamic email if needed
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Application submitted successfully!');
        router.push("/meeting");
        // Reset form
        setFormData({
          expectations: "",
          currentSituation: "",
          motivation: "",
          themeFocus: "",
          communityTeam: "",
          schoolStudyTime: "",
          openness: ""
        });
        
      } else {
        toast.error(data.message || 'Error submitting application');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error submitting application');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6 bg-white rounded-lg">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-2">
          <Crown className="w-8 h-8" /> Timelife Club Application
        </h2>
        <p className="text-red-600 text-xl">Please answer the following questions thoughtfully</p>
      </div>

      {/* Question 1: Expectations */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 text-2xl flex items-center gap-2">
            <span className="bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center">1</span>
            Erwartungen
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Was erhoffst du dir ganz persönlich von den 30 Tagen im Timelife Club?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-32 text-lg font-faculty border-red-300 focus:ring-red-500"
            placeholder="Share your personal expectations..."
            value={formData.expectations}
            onChange={(e) => handleChange(e, 'expectations')}
            required
          />
        </CardContent>
      </Card>

      {/* Question 2: Current Situation */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 text-2xl flex items-center gap-2">
            <span className="bg-red-700 text-2xl text-white rounded-full w-6 h-6 flex items-center justify-center">2</span>
            Aktuelle Situation
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Wie würdest du deine aktuelle Lebenssituation beschreiben – wo stehst du gerade, was beschäftigt dich?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-32 text-lg font-faculty border-red-300 focus:ring-red-500"
            placeholder="Describe your current life situation..."
            value={formData.currentSituation}
            onChange={(e) => handleChange(e, 'currentSituation')}
            required
          />
        </CardContent>
      </Card>

      {/* Question 3: Motivation */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 text-xl flex items-center gap-2">
            <span className="bg-red-700 text-2xl text-white rounded-full w-6 h-6 flex items-center justify-center">3</span>
            Motivation
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Warum möchtest du genau jetzt Teil des Timelife Clubs werden?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-32 text-lg font-faculty border-red-300 focus:ring-red-500"
            placeholder="Explain your motivation for joining now..."
            value={formData.motivation}
            onChange={(e) => handleChange(e, 'motivation')}
            required
          />
        </CardContent>
      </Card>

      {/* Question 4: Theme Focus */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 text-xl flex items-center gap-2">
            <span className="bg-red-700 text-2xl text-white rounded-full w-6 h-6 flex items-center justify-center">4</span>
            Themenschwerpunkt
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Welches der sechs Module spricht dich am meisten an – und warum?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-32 font-faculty text-lg border-red-300 focus:ring-red-500"
            placeholder="Which module appeals to you most and why?"
            value={formData.themeFocus}
            onChange={(e) => handleChange(e, 'themeFocus')}
          />
        </CardContent>
      </Card>

      {/* Question 5: Community & Team */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 text-xl flex items-center gap-2">
            <span className="bg-red-700 text-2xl text-white rounded-full w-6 h-6 flex items-center justify-center">5</span>
            Community & Team
          </CardTitle>
          <CardDescription className="text-red-700  text-lg">
            Was bedeutet für dich Gemeinschaft, und wie bringst du sich normalerweise in eine Gruppe ein?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-32 text-lg border-red-300 font-faculty focus:ring-red-500"
            placeholder="Share your thoughts on community and how you contribute..."
            value={formData.communityTeam}
            onChange={(e) => handleChange(e, 'communityTeam')}
          />
        </CardContent>
      </Card>

      {/* Question 6: School & Study Time */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 text-xl flex items-center gap-2">
            <span className="bg-red-700 text-2xl text-white rounded-full w-6 h-6 flex items-center justify-center">6</span>
            Deine Schul- & Studienzeit
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Wie hast du deine Schul- oder Studienzeit erlebt? Was hat dir besonders gefallen – und was hat dir gefehlt?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-32 text-lg font-faculty border-red-300 focus:ring-red-500"
            placeholder="Reflect on your school or study experiences..."
            value={formData.schoolStudyTime}
            onChange={(e) => handleChange(e, 'schoolStudyTime')}
          />
        </CardContent>
      </Card>

      {/* Question 7: Openness */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 text-xl flex items-center gap-2">
            <span className="bg-red-700 text-2xl text-white rounded-full w-6 h-6 flex items-center justify-center">7</span>
            Offenheit
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Gibt es einen Bereich in deinem Leben, in dem du dir schon lange Veränderung wünschst – und glaubst du, dass der Timelife Club dir dabei helfen kann?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-32 text-lg font-faculty border-red-300 focus:ring-red-500"
            placeholder="Share areas where you desire change and how the club might help..."
            value={formData.openness}
            onChange={(e) => handleChange(e, 'openness')}
          />
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg font-medium h-12 transition-all shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </div>
    </div>
  );
};

export default TimelifeApplicationForm;