'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const  Success = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-16 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for submitting your travel program application. We've received your information and will review it shortly.
          </p>
          
          {sessionId && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Payment Session ID:</span> {sessionId}
              </p>
            </div>
          )}
          
          <div className="space-y-4 mb-8">
            <h2 className="text-xl font-semibold text-gray-900">What happens next?</h2>
            <div className="text-left space-y-3 text-gray-600">
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</span>
                <span>Our team will review your application within 24-48 hours</span>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</span>
                <span>You'll receive a confirmation email with additional details</span>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</span>
                <span>We'll contact you to discuss program details and next steps</span>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <p className="text-sm text-gray-500 mb-4">
              If you have any questions, please don't hesitate to contact us.
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
    
  );
}
export default Success;