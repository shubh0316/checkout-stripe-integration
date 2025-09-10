//@ts-nocheck
import { useEffect } from 'react';
import { FormData } from '@/types/form';
import { Star, Target, ArrowLeft, ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Step3SkillsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const experienceLevels = ['No experience', 'Some experience', 'Moderate experience', 'Experienced', 'Very experienced'];

export function Step3Skills({ formData, updateFormData, onNext, onPrev }: Step3SkillsProps) {
  // Replace your existing useEffect with this enhanced version:
// Replace your current useEffect with this minimal version:


  const canProceed = formData.insurance && formData.experience && formData.motivation;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-2">
          <Shield className="w-8 h-8" /> Additional Information
        </h2>
        <p className="text-red-600 text-xl">Tell us about your insurance and background</p>
      </div>

      {/* Insurance Section */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <Shield className="w-6 h-6" /> Insurance
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Please indicate if you require insurance coverage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="insurance" className="text-red-800 text-lg">Do you require insurance? *</Label>
            <div className="space-y-2">
  <Label htmlFor="insurance" className="text-red-800 text-lg">Versicherung *</Label>
  <Select
    value={formData.insurance || ""}
    onValueChange={(value) => updateFormData({ insurance: value })}
  >
    <SelectTrigger 
      id="insurance" 
      className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg font-faculty"
    >
      <SelectValue placeholder="Versicherungsoption auswählen">
        {formData.insurance || ""}
      </SelectValue>
    </SelectTrigger>
    <SelectContent className="text-lg">
      <SelectItem 
        value="yes" 
        className="focus:bg-red-50 text-lg font-faculty"
      >
        Ja, ich benötige eine Versicherung
      </SelectItem>
      <SelectItem 
        value="no" 
        className="focus:bg-red-50 text-lg font-faculty"
      >
        Nein, ich habe eine eigene Versicherung
      </SelectItem>
    </SelectContent>
  </Select>
</div>

          </div>
        </CardContent>
      </Card>

      {/* Travel Experience */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <Star className="w-6 h-6" /> Travel Experience
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Tell us about your previous travel or program experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="experience" className="text-red-800 text-lg">Travel/Program Experience *</Label>
            <Select
              value={formData.experience || ""}
              onValueChange={(value) => updateFormData({ experience: value })}
            >
              <SelectTrigger id="experience" className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg placeholder:text-gray-500 font-faculty">
                <SelectValue placeholder="Select your experience level" className="font-faculty">
                  {formData.experience || ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="text-lg">
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level} className="focus:bg-red-50 text-lg font-faculty">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Motivation & Goals */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <Target className="w-6 h-6" /> Motivation & Goals
          </CardTitle>

        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="motivation" className="text-red-800 text-lg">
              Why do you want to join this program? *
            </Label>
            <Textarea
              id="motivation"
              value={formData.motivation}
              onChange={(e) => updateFormData({ motivation: e.target.value })}
              rows={6}
              className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white resize-none text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
              placeholder="Please tell us about your motivation, goals, and what you hope to achieve from this program..."
            />
            <p className="text-md text-red-600">
              Please provide a detailed explanation of your motivation and goals for joining this program.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 px-7 py-3 text-lg h-12"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Personal Information
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg font-medium h-12 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Continue to Preferences <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}