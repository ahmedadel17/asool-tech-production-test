import React from 'react'

function EmblaThumb({ img }: { img: string }) {
  return (
    <div>
      <button type="button" className="block">
                    <img className="embla-thumbs__slide__img w-20 aspect-square object-cover rounded-md border-2 hover:border-primary-300 hover:opacity-80 transition-all duration-200 border-primary-500 opacity-100" src={img} alt="Thumbnail 1" />
                </button>
    </div>
  )
}

export default EmblaThumb
