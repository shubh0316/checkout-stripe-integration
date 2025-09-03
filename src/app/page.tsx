'use client';

import { useState } from 'react';
import { MultiStepForm } from '@/components/MultiStepForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
        </div>
        <MultiStepForm />
      </div>
    </div>
  );
}
