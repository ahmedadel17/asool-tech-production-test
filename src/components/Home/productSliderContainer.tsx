import React from 'react'

function ProductSliderContainer({children}: {children: React.ReactNode}) {
  return (
    <div className="embla__slide flex-shrink-0 py-1 
    [flex:0_0_calc(50%-0.75rem)] 
    md:[flex:0_0_calc(33.333%-0.75rem)] 
    lg:[flex:0_0_calc(25%-1.2rem)] 
    xl:[flex:0_0_calc(20%-1.5rem)]">
    {children}
    </div>
  )
}

export default ProductSliderContainer
