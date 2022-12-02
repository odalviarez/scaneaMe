import React from 'react'
import NavBar from '../../components/navBar/NavBar.jsx'
import Footer from '../../components/footer/Footer.jsx'
import Socials from '../../components/socials/Socials.jsx'
import ProfileCard from '../../components/profileCard/ProfileCard.jsx'

export default function Profile() {
  return (
    <div>
      <NavBar />
      <ProfileCard />
      <Footer />
    </div>
  )
}
