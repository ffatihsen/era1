import React from 'react'
import PrimarySearchAppBar from '../components/Navbar'

import HeroSection from '../components/HeroSection';
import EventSection from '../components/EventSection';
import Footer from '../components/Footer';
import JoinMeetup from '../components/JoinMeetup';
import HowMeetupWorks from '../components/HowMeetupWorks';
import FriendshipsOnMeetup from '../components/FriendshipsOnMeetup';

const Home = () => {
  return (
    <div>
        <PrimarySearchAppBar />

        <HeroSection />

        <EventSection />

        <JoinMeetup />
        <HowMeetupWorks />
        <FriendshipsOnMeetup/>

        <Footer />


      
    </div>
  )
}

export default Home
