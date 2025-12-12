import React from 'react'

interface MainSliderPaginationDotsProps {
  scrollSnaps: number[]
  selectedIndex: number
  scrollTo: (index: number) => void
}

function MainSliderPaginationDots({ scrollSnaps, selectedIndex, scrollTo }: MainSliderPaginationDotsProps) {
  return (
    <div id="pagination-dots" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={() => scrollTo(index)}
          className={`h-4 w-4 rounded-full transition-colors duration-300 ease-in-out ${
            index === selectedIndex 
              ? 'bg-white bg-opacity-100' 
              : 'bg-white bg-opacity-25 hover:bg-opacity-50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

export default MainSliderPaginationDots