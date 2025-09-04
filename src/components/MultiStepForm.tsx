'use client';

import { useState } from 'react';
import { Step1Program } from './form-steps/Step1Program';
import { Step2PersonalInfo } from './form-steps/Step2PersonalInfo';
import { Step3Skills } from './form-steps/Step3Skills';
import { Step4Preferences } from './form-steps/Step4Preferences';
import { StepIndicator } from './StepIndicator';
import { FormData } from '@/types/form';
import { Step5Summary } from './form-steps/Step5Summary';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'step1', description: 'Select your program and dates' },
  { id: 2, title: 'step2', description: 'Fill in your details' },
  { id: 3, title: 'step3', description: 'Tell us about your background' },
  { id: 4, title: 'step4', description: 'Choose accommodation and dietary needs' },
  { id: 5, title: 'step5', description: 'Review and submit' },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    country: '',
    duration: 0,
    module: '',
    
    salutation: '',
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    nationality: '',
    address: '',
    postalCode: '',
    city: '',
    countryOfResidence: '',
    phone: '',
    email: '',
    insurance: '',
    experience: '',
    motivation: '',
    
    accommodation: '',
    diet: '',
    allergies: '',
    emergencyContact: {
      name: '',
      relation: '',
      phone: '',
      email: '',
    },
    termsAccepted: false,
  });

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      toast.success(`Moving to step ${currentStep + 1}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      toast.info(`Returning to step ${currentStep - 1}`);
    }
  };
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');
        
    try {
      console.log("Data being sent to API:", formData);
      
      // First try to send the email
      console.log('About to call email API');
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData: formData,
          email: formData.email || "shubhankersaxena5@gmail.com", // Use form email or fallback
        }),
      });
      
      console.log('Email response status:', emailResponse.status);
      
      // Check if response is OK before trying to parse it
      if (!emailResponse.ok) {
        // Try to get error message from response
        let errorMessage = 'Failed to send application email';
        try {
          const errorData = await emailResponse.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = emailResponse.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      // Parse successful response
      const emailResponseData = await emailResponse.json();
      console.log("Email API response:", emailResponseData);
  

  
      // Finally create checkout session
      const checkoutToast = toast.loading('Creating checkout session...');
      
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          duration: formData.duration === 15 ? 15 : 30,
        }),
      });
  
      if (!checkoutResponse.ok) {
        throw new Error('Failed to create checkout session');
      }
  
      const result = await checkoutResponse.json();
      
      toast.success('Checkout link sent to your email!', { id: checkoutToast });
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      
      toast.error(errorMessage, { id: submitToast });
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Program
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2PersonalInfo
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <Step3Skills
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <Step4Preferences
            formData={formData}
            updateFormData={updateFormData}
            onPrev={prevStep}
            onNext={nextStep}
          />
        );
      case 5:
        return (
          <Step5Summary 
          formData={formData}
          onPrev={prevStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitError={submitError}
          updateFormData={updateFormData} // Add this line
        />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 lg:p-8 mx-2 md:mx-0">
      {/* Mobile step indicator (simplified for mobile) */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-red-800">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-xs text-red-600">
            {steps[currentStep - 1]?.description}
          </span>
        </div>
        <div className="w-full bg-red-100 rounded-full h-2 mt-2">
          <div 
            className="bg-red-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop step indicator */}
      <div className="hidden md:block">
        <StepIndicator 
          steps={steps} 
          currentStep={currentStep} 
          onStepChange={(stepId) => {
            if (stepId < currentStep) {
              setCurrentStep(stepId);
              toast.info(`Returning to step ${stepId}`);
            } else if (stepId === currentStep + 1) {
              const canProceed = validateCurrentStep(currentStep, formData);
              if (canProceed) {
                setCurrentStep(stepId);
                toast.success(`Moving to step ${stepId}`);
              } else {
                toast.error('Please complete all required fields before proceeding');
              }
            } else if (stepId > currentStep + 1) {
              toast.error('Please complete the current step first');
            }
          }} 
        />
      </div>
      
      <div className="mt-4 md:mt-6 lg:mt-8">
        {renderStep()}
      </div>
    </div>
  );
}

// Helper function to validate current step
function validateCurrentStep(step: number, formData: FormData): boolean {
  switch (step) {
    case 1:
      return !!(formData.country && formData.duration > 0);
    case 2:
      return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
    case 3:
      return !!(formData.experience && formData.motivation);
    case 4:
      return !!(formData.accommodation && formData.diet && 
                formData.emergencyContact.name && formData.emergencyContact.relation && 
                formData.emergencyContact.phone && formData.emergencyContact.email);
    default:
      return true;
  }
}
