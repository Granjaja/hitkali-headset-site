"use client"

import { ResultsPageContent } from '@/components/ResultsPageContent';
import React, { Suspense} from 'react'



export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultsPageContent/>    
    </Suspense>
  )
}
