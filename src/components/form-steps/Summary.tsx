// Summary.tsx
//@ts-nocheck
import { FormData } from '@/types/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryProps {
  formData: FormData;
}

export function Summary({ formData }: SummaryProps) {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-red-900 text-2xl">Summary</CardTitle>
        <CardDescription className="text-red-700 text-lg">
          Überprüfe deinen Angaben vor der Buchen
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg text-red-700">
          <div><b className="text-red-800">Duration:</b> {formData.duration} days / {formData.duration - 1} nights</div>
          <div className="md:col-span-2"><b className="text-red-800"></b> {formData.firstName} {formData.lastName}</div>
          <div><b className="text-red-800">Gender:</b> {formData.gender}</div>
          <div><b className="text-red-800">Birth Date:</b> {formData.birthDate}</div>
          <div><b className="text-red-800">Nationality:</b> {formData.nationality}</div>
          <div className="md:col-span-2"><b className="text-red-800">Address:</b> {formData.address}, {formData.city}, {formData.postalCode}</div>
          <div><b className="text-red-800">Phone:</b> {formData.phone}</div>
          <div><b className="text-red-800">Email:</b> {formData.email}</div>
          {formData.moduleTitles && formData.moduleTitles.length > 0 && (
            <div className="md:col-span-2"><b className="text-red-800">Selected Modules:</b> {formData.moduleTitles.join(', ')}</div>
          )}
          <div className="md:col-span-2"><b className="text-red-800">Insurance Status:</b>{formData.insurance}</div>
          <div><b className="text-red-800">Accommodation:</b> {formData.accommodation}</div>
          <div><b className="text-red-800">Diet:</b> {formData.diet}</div>
          {formData.allergies && (
            <div className="md:col-span-2"><b className="text-red-800">Allergies:</b> {formData.allergies}</div>
          )}
          <div className="md:col-span-2"><b className="text-red-800">Emergency Contact:</b> {formData.emergencyContact.name} ({formData.emergencyContact.relation}) — {formData.emergencyContact.phone}, {formData.emergencyContact.email}</div>
          <div className="md:col-span-2"><b className="text-red-800">Terms and Conditions:</b> {formData.termsAccepted ? 'Accepted' : 'Not accepted'}</div>

        </div>
      </CardContent>
    </Card>
  );
}