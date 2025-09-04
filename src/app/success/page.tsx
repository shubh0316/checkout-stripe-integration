// app/success/page.tsx
import { Suspense } from 'react';
import Success from './success-screen';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Success />
    </Suspense>
  );
}
