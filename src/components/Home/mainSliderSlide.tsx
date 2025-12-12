import React from 'react'
import MainSliderText from './mainSliderText'

function MainSliderSlide({img ,slider}: {img: string, slider: any}) {
  return (
    <div className="slide-item w-full flex-shrink-0 relative slide-clone bg-cover bg-center bg-no-repeat flex"   style={{
        backgroundImage: `url("${img}")`,
        height: "100%",
        minHeight: "100%",
        width: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
                <div className="absolute inset-0 z-10 hero-overlay" style={{ backgroundColor: 'rgb(255, 255, 255)', opacity: 0, pointerEvents: 'none' }}></div>
    
               <MainSliderText slider={slider} />
    
            </div>
  )
}

export default MainSliderSlide
