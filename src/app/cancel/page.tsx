'use client';

import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Cancelled</h1>
          <p className="text-lg text-gray-600 mb-6 font-arial">
            Your payment was cancelled. Don't worry, your application information has been saved and you can complete the payment process at any time.
          </p>
          
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-900">What you can do:</h2>
            <div className="text-left space-y-3 text-gray-600">
              <div className="flex items-start">
                <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                <span>Return to the application form to review your information</span>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                <span>Complete the payment process when you're ready</span>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-red-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                <span>Contact us if you need assistance</span>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6 space-y-4">
            <p className="text-sm text-gray-500">
              Your application data is safe and will be processed once payment is completed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Return to Application
              </Link>
              <Link
                href="/"
                className="inline-block border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
