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

// COMMENTED OUT - Accommodation preferences
// const accommodationOptions = [
//   'Host Family',
//   'Student Residence',
//   'Shared Apartment',
//   'Private Room',
//   'Hotel',
//   'No preference'
// ];

const dietOptions = [
  "Keine Besonderheiten", 
  "Vegetarisch",
   "Vegan",
 "Glutenfrei",
 "Laktosefrei",
 "Halal",
 "Koscher",
];

export function Step4Preferences({ formData, updateFormData, onPrev, onNext }: Step4PreferencesProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const canProceed = formData.insurance && formData.diet && 
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
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto p-3 sm:p-0">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-800 mb-2 sm:mb-3 flex items-center justify-center gap-2">
          <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" /> Preferences & Emergency Contact
        </h2>
        <p className="text-red-600 text-base sm:text-lg md:text-xl">Letzte Angaben zur Vervollständigung Deiner Bewerbung</p>
      </div>

      {/* COMMENTED OUT - Accommodation Preferences */}
      {/* <Card className="bg-white">
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
              value={formData.accommodation || ""}
              onValueChange={(value) => updateFormData({ accommodation: value })}
            >
              <SelectTrigger id="accommodation" className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg placeholder:text-gray-500 font-faculty">
                <SelectValue placeholder="Select accommodation type" className="font-faculty">
                  {formData.accommodation || ""}
                </SelectValue>
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
      </Card> */}

      {/* Insurance Information */}
      <Card className="bg-white">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-red-900 flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" /> Insurance Information
          </CardTitle>
          <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
           Bitte treffe hier deine Auswahl
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-2">
            <Label htmlFor="insurance" className="text-red-800 text-base sm:text-lg">Insurance Status *</Label>
            <Select
              value={formData.insurance || ""}
              onValueChange={(value) => updateFormData({ insurance: value })}
            >
              <SelectTrigger id="insurance" className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-gray-500 font-faculty">
                <SelectValue placeholder="Select insurance status" className="font-faculty">
                  {formData.insurance || ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="text-base sm:text-lg">
                <SelectItem value="I have travel insurance" className="focus:bg-red-50 text-base sm:text-lg font-faculty">
                  I have travel insurance
                </SelectItem>
                <SelectItem value="I need help finding insurance" className="focus:bg-red-50 text-base sm:text-lg font-faculty">
                  I need help finding insurance
                </SelectItem>
                <SelectItem value="I will purchase insurance later" className="focus:bg-red-50 text-base sm:text-lg font-faculty">
                  I will purchase insurance later
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Dietary Preferences */}
      <Card className="bg-white">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-red-900 flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <Utensils className="w-5 h-5 sm:w-6 sm:h-6" /> Emährung
          </CardTitle>
          <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
            Welche Ernährungsform evorzugst du?
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-2">
            <Label htmlFor="diet" className="text-red-800 text-base sm:text-lg">Ernährungsaneorderung *</Label>
            <Select
              value={formData.diet || ""}
              onValueChange={(value) => updateFormData({ diet: value })}
            >
              <SelectTrigger id="diet" className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-gray-500 font-faculty">
                <SelectValue placeholder="Select dietary preference" className="font-faculty">
                   { formData.diet || ""}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="text-base sm:text-lg">
                {dietOptions.map((option) => (
                  <SelectItem key={option} value={option} className="focus:bg-red-50 text-base sm:text-lg font-faculty">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Allergies & Medical Conditions */}
      <Card className="bg-white">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-red-900 flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6" /> Health Information
          </CardTitle>
          <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
          Wichtige Informationen für deine Sicherheit und deinen Komfort
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="space-y-2">
            <Label htmlFor="allergies" className="text-red-800 text-base sm:text-lg">Allergies or Medical Conditions</Label>
            <Textarea
              id="allergies"
              value={formData.allergies}
              onChange={(e) => updateFormData({ allergies: e.target.value })}
              rows={3}
              className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white resize-none text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
              placeholder=""
            />
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card className="bg-white">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-red-900 flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <User className="w-5 h-5 sm:w-6 sm:h-6" /> Emergency Contact
          </CardTitle>
          {/* <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
          Bitte gebe die Kontaktdaten einer Person an, die wir im Notfall kontaktieren können.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-2">
              <Label htmlFor="emergencyName" className="text-red-800 text-base sm:text-lg">Full Name *</Label>
              <Input
                id="emergencyName"
                type="text"
                value={formData.emergencyContact.name}
                onChange={(e) => updateEmergencyContact('name', e.target.value)}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Gebe den vollständigen Namen ein"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyRelation" className="text-red-800 text-base sm:text-lg">Relationship *</Label>
              <Input
                id="emergencyRelation"
                type="text"
                value={formData.emergencyContact.relation}
                onChange={(e) => updateEmergencyContact('relation', e.target.value)}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="zB Eltern, Ehepartner, Freund, Freundin"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone" className="text-red-800 flex items-center gap-2 text-base sm:text-lg">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Phone Number *
              </Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) => updateEmergencyContact('phone', e.target.value)}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyEmail" className="text-red-800 flex items-center gap-2 text-base sm:text-lg">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> Email Address *
              </Label>
              <Input
                id="emergencyEmail"
                type="email"
                value={formData.emergencyContact.email}
                onChange={(e) => updateEmergencyContact('email', e.target.value)}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter email address"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between pt-4 sm:pt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 px-5 sm:px-7 py-2 sm:py-3 text-base sm:text-lg h-11 sm:h-12"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Back to Personal Info
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-red-700 hover:bg-red-800 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium h-11 sm:h-12 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Weiter zu Schritt 5
        </Button>
      </div>
    </div>
  );
}