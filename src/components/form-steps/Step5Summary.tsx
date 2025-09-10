// Step5Summary.tsx
//@ts-nocheck
import { FormData } from '@/types/form';
import { CreditCard, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Summary } from './Summary';

interface Step5SummaryProps {
  formData: FormData;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string;
  updateFormData?: (data: Partial<FormData>) => void; // Make it optional
}

export function Step5Summary({ formData, onPrev, onSubmit, isSubmitting, submitError, updateFormData }: Step5SummaryProps) {
  // Calculate price based on duration
  const getPrice = () => {
    return formData.duration === 15 ? 2800 : 4200;
  };

  const canSubmit = formData.termsAccepted;

  // Safe handler for checkbox changes
  const handleTermsChange = (checked: boolean) => {
    if (updateFormData) {
      updateFormData({ termsAccepted: checked });
    } else {
      console.error('updateFormData function is not available');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-red-800 mb-3 flex items-center justify-center gap-2">
          <CheckCircle className="w-8 h-8" /> Review & Submit
        </h2>
        <p className="text-red-600 text-xl">Review your application and proceed to payment</p>
      </div>

      {/* Application Summary */}
      <Summary formData={formData} />

      {/* Payment Information */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-900 flex items-center gap-2 text-2xl">
            <CreditCard className="w-6 h-6" /> Payment Information
          </CardTitle>
          <CardDescription className="text-red-700 text-lg">
            Complete your application with payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-red-100 rounded-lg">
              <span className="text-red-800 font-medium text-lg">Program Fee</span>
              <span className="text-red-700 font-bold text-xl font-faculty">{getPrice()}</span>
            </div>
            
            {submitError && (
              <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg text-lg">
                {submitError}
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="p-4 bg-white border border-red-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted || false}
                  onCheckedChange={(checked) => handleTermsChange(checked === true)}
                  className="mt-1 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <div className="space-y-2">
                  <Label htmlFor="terms" className="text-red-800 text-lg cursor-pointer">
                    I accept the terms and conditions *
                  </Label>
                  <p className="text-red-700 text-sm">
                    By checking this box, I confirm that I have read, understood, and agree to the 
                    program terms and conditions, cancellation policy, and privacy policy. I understand 
                    that my personal data will be processed in accordance with your privacy policy and 
                    that program fees are subject to the cancellation terms outlined.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <p className="text-md text-red-600 mb-4">
                Your payment will be processed securely through our payment gateway.
              </p>
              
              <Button
                onClick={onSubmit}
                disabled={isSubmitting || !canSubmit}
                className="w-full bg-red-700 hover:bg-red-800 text-white py-3 text-lg font-medium h-12 transition-all shadow-lg hover:shadow-xl disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : `Submit & Pay ${getPrice()}`}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex sm:flex-row justify-between pt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800 px-7 py-3 text-lg h-12"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Preferences
        </Button>
      </div>
    </div>
  );
}