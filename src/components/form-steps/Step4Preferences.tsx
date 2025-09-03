// Step4Preferences.tsx
//@ts-nocheck
import { FormData } from '@/types/form';
import { Home, Utensils, Heart, User, Phone, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from 'react';

interface Step4PreferencesProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

const accommodationOptions = [
  'Host Family',
  'Student Residence',
  'Shared Apartment',
  'Private Room',
  'Hotel',
  'No preference'
];

const dietOptions = [
  'No restrictions',
  'Vegetarian',
  'Vegan',
  'Halal',
  'Kosher',
  'Gluten-free',
  'Dairy-free',
  'Other'
];

export function Step4Preferences({ formData, updateFormData, onPrev, onNext }: Step4PreferencesProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const canProceed = formData.accommodation && formData.diet && 
                   formData.emergencyContact.name && formData.emergencyContact.relation && 
                   formData.emergencyContact.phone && formData.emergencyContact.email;

  const updateEmergencyContact = (field: keyof FormData['emergencyContact'], value: string) => {
    updateFormData({
      emergencyContact: {
        ...formData.emergencyContact,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-2">
          <CheckCircle className="w-8 h-8" /> Preferences & Emergency Contact
        </h2>
        <p className="text-red-600 text-xl">Final details to complete your application</p>
      </div>

      {/* Accommodation Preferences */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <Home className="w-6 h-6" /> Accommodation Preference
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Where would you prefer to stay during the program?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="accommodation" className="text-red-800 text-lg">Accommodation Preference *</Label>
            <Select
              value={formData.accommodation}
              onValueChange={(value) => updateFormData({ accommodation: value })}
            >
              <SelectTrigger id="accommodation" className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg placeholder:text-gray-500 font-faculty">
                <SelectValue placeholder="Select accommodation type" className="font-faculty" />
              </SelectTrigger>
              <SelectContent className="text-lg">
                {accommodationOptions.map((option) => (
                  <SelectItem key={option} value={option} className="focus:bg-red-50 text-lg font-faculty">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dietary Preferences */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <Utensils className="w-6 h-6" /> Dietary Requirements
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Let us know about any dietary restrictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="diet" className="text-red-800 text-lg">Dietary Requirements *</Label>
            <Select
              value={formData.diet}
              onValueChange={(value) => updateFormData({ diet: value })}
            >
              <SelectTrigger id="diet" className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg placeholder:text-gray-500 font-faculty">
                <SelectValue placeholder="Select dietary preference" className="font-faculty" />
              </SelectTrigger>
              <SelectContent className="text-lg">
                {dietOptions.map((option) => (
                  <SelectItem key={option} value={option} className="focus:bg-red-50 text-lg font-faculty">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Allergies & Medical Conditions */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <Heart className="w-6 h-6" /> Health Information
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Important information for your safety and comfort
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="allergies" className="text-red-800 text-lg">Allergies or Medical Conditions</Label>
            <Textarea
              id="allergies"
              value={formData.allergies}
              onChange={(e) => updateFormData({ allergies: e.target.value })}
              rows={3}
              className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white resize-none text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
              placeholder="Please list any allergies, medical conditions, or special requirements we should be aware of..."
            />
            <p className="text-md text-red-600">
              This information helps us ensure your safety and comfort during the program.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <User className="w-6 h-6" /> Emergency Contact
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Please provide details of someone we can contact in case of emergency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="emergencyName" className="text-red-800 text-lg">Full Name *</Label>
              <Input
                id="emergencyName"
                type="text"
                value={formData.emergencyContact.name}
                onChange={(e) => updateEmergencyContact('name', e.target.value)}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyRelation" className="text-red-800 text-lg">Relationship *</Label>
              <Input
                id="emergencyRelation"
                type="text"
                value={formData.emergencyContact.relation}
                onChange={(e) => updateEmergencyContact('relation', e.target.value)}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="e.g., Parent, Spouse, Friend"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone" className="text-red-800 flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5" /> Phone Number *
              </Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) => updateEmergencyContact('phone', e.target.value)}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyEmail" className="text-red-800 flex items-center gap-2 text-lg">
                <Mail className="w-5 h-5" /> Email Address *
              </Label>
              <Input
                id="emergencyEmail"
                type="email"
                value={formData.emergencyContact.email}
                onChange={(e) => updateEmergencyContact('email', e.target.value)}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter email address"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-between pt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 px-7 py-3 text-lg h-12"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Skills & Experience
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 text-lg font-medium h-12 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Review Application
        </Button>
      </div>
    </div>
  );
}