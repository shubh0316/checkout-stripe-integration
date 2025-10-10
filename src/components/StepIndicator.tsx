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
    <div className="flex items-center justify-between w-full px-2 sm:px-0">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center w-full">
          {/* Step Button */}
          <button
            onClick={() => onStepChange(step.id)}
            className={`flex-1 text-center py-1.5 sm:py-2 px-2 sm:px-4 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base
              ${step.id === currentStep 
                ? "bg-red-600 text-white shadow-md" 
                : "bg-white text-gray-600 hover:bg-red-100"}`}
          >
            <span className="hidden sm:inline">{step.title}</span>
            <span className="sm:hidden">S{step.id}</span>
          </button>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 transition-all duration-300 
                ${step.id < currentStep ? "bg-red-600" : "bg-white"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
