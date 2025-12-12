import React from 'react'

function EmblaGallerySlide({ img }: { img: string }) {
  return (
    <div className="embla__slide flex-none w-full min-w-0">
    <div className="zoom-container aspect-square">
        <img src={img} alt="Product Image 1" className="zoom-image w-full h-full object-cover" />
        <div className="zoom-lens"></div>
    </div>
</div>
  )
}

export default EmblaGallerySlide
