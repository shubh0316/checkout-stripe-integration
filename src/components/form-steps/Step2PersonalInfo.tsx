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
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="font-bold text-red-800 mb-3 flex items-center justify-center gap-2 text-4xl md:text-5xl">
          <User className="w-8 h-8 md:w-9 md:h-9" /> Personal Information
        </h2>
        <p className="text-red-600 text-xl md:text-2xl">Please provide your personal details</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-red-900 text-2xl md:text-3xl">Basic Information</CardTitle>
          <CardDescription className="text-red-700 text-lg md:text-xl">
            Tell us about yourself
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-red-800 text-lg md:text-xl">Gender *</Label>
              <Select
                value={formData.gender || ""}
                onValueChange={(value) => updateFormData({ gender: value })}
              >
                <SelectTrigger id="gender" className="border-red-300 focus:ring-red-500 bg-white h-12 text-lg placeholder:text-gray-500 font-faculty">
                <SelectValue placeholder="Geschlecht auswählen">
        {formData.gender || "Geschlecht auswählen"}
      </SelectValue>
                </SelectTrigger>
                <SelectContent className="text-lg">
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender} className="focus:bg-red-50 text-lg font-faculty">
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-red-800 text-lg md:text-xl">First Name *</Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData({ firstName: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-red-800 text-lg md:text-xl">Last Name *</Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData({ lastName: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter your last name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate" className="text-red-800 flex items-center gap-2 text-lg md:text-xl">
                <Calendar className="w-5 h-5" /> Date of Birth *
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => updateFormData({ birthDate: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg font-faculty"
                placeholder="tt/mm/jjjj"
                pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality" className="text-red-800 text-lg md:text-xl">Nationality *</Label>
              <Input
                id="nationality"
                type="text"
                value={formData.nationality}
                onChange={(e) => updateFormData({ nationality: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter your nationality"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl md:text-3xl">
            <Phone className="w-6 h-6" /> Contact Information
          </CardTitle>
          <CardDescription className="text-red-700 text-lg md:text-xl">
            How can we reach you?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-red-800 text-lg md:text-xl flex items-center gap-2">
                <Phone className="w-5 h-5" /> Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-red-800 flex items-center gap-2 text-lg md:text-xl">
                <Mail className="w-5 h-5" /> Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter your email address"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl md:text-3xl">
            <MapPin className="w-6 h-6" /> Address Information
          </CardTitle>
          <CardDescription className="text-red-700 text-lg md:text-xl">
            Where do you live?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="address" className="text-red-800 text-lg md:text-xl">Street Address *</Label>
              <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={(e) => updateFormData({ address: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter your street address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city" className="text-red-800 text-lg md:text-xl">City *</Label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => updateFormData({ city: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter your city"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-red-800 text-lg md:text-xl">Postal Code *</Label>
              <Input
                id="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={(e) => updateFormData({ postalCode: e.target.value })}
                className="border-red-300 focus:ring-red-500 focus:border-red-500 bg-white h-12 text-lg placeholder:text-lg placeholder:text-gray-500 font-faculty"
                placeholder="Enter your postal code"
              />
            </div>

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
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Program Details
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