import React from 'react'
import NavBar from '../NavBar'
import HowSnaptripWork from "../images/Snaptrip_-_How_It_Works 1.png"
import HowSnaptripHeading from "../images/Untitled_Artwork 1.png"

const HowSnaptripWorks = ({user,setUser}) => {
  return (
    <div >
          <NavBar user={user} setUser={setUser}/>
          <div className='d-flex justify-content-center'>
          <img src={HowSnaptripHeading}/>
          </div>
          <div className=' container py-3'>
            <img src={HowSnaptripWork}/>
          </div>

    </div>
  )
}

export default HowSnaptripWorks