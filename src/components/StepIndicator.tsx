"use client";

import React from "react";

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepChange: (stepId: number) => void;
}

export function StepIndicator({ steps, currentStep, onStepChange }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center w-full">
          {/* Step Button */}
          <button
            onClick={() => onStepChange(step.id)}
            className={`flex-1 text-center py-2 px-4 rounded-full font-medium transition-all duration-300 
              ${step.id === currentStep 
                ? "bg-red-600 text-white shadow-md" 
                : "bg-gray-200 text-gray-600 hover:bg-red-100"}`}
          >
            {step.title}{" "}
          </button>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 transition-all duration-300 
                ${step.id < currentStep ? "bg-red-600" : "bg-gray-300"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
