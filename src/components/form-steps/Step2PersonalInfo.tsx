//@ts-nocheck
"use client"
import React, { useEffect } from 'react';
import { FormData } from '@/types/form';
import { User, Mail, Phone, MapPin, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Step2PersonalInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}
  const genders = ['Männlich', 'Weiblich', 'Andere', 'Keine Angabe']; // German genders

export function Step2PersonalInfo({ formData, updateFormData, onNext, onPrev }: Step2PersonalInfoProps) {


// Replace your existing useEffect with this enhanced version:




  const canProceed = formData.firstName && formData.lastName && 
                    formData.gender && formData.birthDate && formData.nationality && 
                    formData.address && formData.postalCode && formData.city && 
                    formData.phone && formData.email;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto p-3 sm:p-0">
      <div className="text-center">
        <h2 className="font-bold text-red-800 mb-2 sm:mb-3 flex items-center justify-center gap-2 text-2xl sm:text-3xl md:text-4xl">
          <User className="w-6 h-6 sm:w-8 sm:h-8" /> Personal Information
        </h2>
        <p className="text-red-600 text-base sm:text-lg md:text-xl" translate='no'>Bitte gib hier deine persönlichen Daten an</p>
      </div>

      <Card className="bg-white">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-red-900 text-lg sm:text-xl md:text-2xl">Deine Informationen</CardTitle>

        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-red-800 text-base sm:text-lg">Gender *</Label>
              <Select
                value={formData.gender || ""}
                onValueChange={(value) => updateFormData({ gender: value })}
              >
                <SelectTrigger id="gender" className="border-red-300 focus:ring-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-gray-500 font-faculty">
                <SelectValue placeholder="Geschlecht auswählen">
        {formData.gender || "Geschlecht auswählen"}
      </SelectValue>
                </SelectTrigger>
                <SelectContent className="text-base sm:text-lg">
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender} className="focus:bg-red-50 text-base sm:text-lg font-faculty">
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-red-800 text-base sm:text-lg">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Gebe deinen Vornamen ein"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-red-800 text-base sm:text-lg">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
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
                value={formData.birthDate}
                onChange={(e) => updateFormData({ birthDate: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg font-faculty"
                placeholder="tt/mm/jjjj"
                pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality" className="text-red-800 text-base sm:text-lg">Nationality *</Label>
              <Input
                id="nationality"
                type="text"
                value={formData.nationality}
                onChange={(e) => updateFormData({ nationality: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Gebe deine Nationalität an"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-red-900 flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" /> Contact Information
          </CardTitle>
          <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
           Wie können wir dich am besten erreichen ?
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-red-800 text-base sm:text-lg flex items-center gap-2">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Gebe deine Telefonnummer ein"
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
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Gebe deine E-Mail-Adresse ein"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-red-900 flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6" /> Address Information
          </CardTitle>
          <CardDescription className="text-red-700 text-sm sm:text-base md:text-lg">
            Where do you live?
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="address" className="text-red-800 text-base sm:text-lg">Strasse *</Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => updateFormData({ address: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Gebe deine Strasse & Hausnummer ein"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-red-800 text-base sm:text-lg">City *</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Gebe deine Stadt ein"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-red-800 text-base sm:text-lg">Postal Code *</Label>
              <Input
                id="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) => updateFormData({ postalCode: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-11 sm:h-12 text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Gebe deine Postleitzahl ein"
              />
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between pt-4 sm:pt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 px-5 sm:px-7 py-2 sm:py-3 text-base sm:text-lg h-11 sm:h-12"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> Back to Program Details
        </Button>
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-red-700 hover:bg-red-800 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg font-medium h-11 sm:h-12 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Weiter zu Schritt 3 <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}