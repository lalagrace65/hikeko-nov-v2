import TravelAgencyCredentialsHome from '@/components/layout/TravelAgency/TravelAgencyCredentialsHome'
import React, { useEffect } from 'react'

export default function TravelAgencySignUp() {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='min-h-screen'>
        <TravelAgencyCredentialsHome />
    </div>
  )
}
