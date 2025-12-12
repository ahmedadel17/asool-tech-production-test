import React from 'react'

function MainSliderText({slider}: {slider: any}) {
  return (
    <div className="relative container z-20 flex items-center justify-center" style={{ height: '100%', minHeight: '100%' }}>
                <div className="container-wrapper">
                    <div className="te-hero-item grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1fr_1.618fr] items-center">
                        <div className="col-span-1">
                            <div className="space-y-6">
                                <h2 className="slider-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animated text-white">
                                    {slider?.title}
                                </h2>
                                <p className="text-lg text-white animated">
                                  {slider?.description}
                                </p>
                                <a href={slider?.button_url} className="te-btn te-btn-primary animated">{slider?.button_text}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default MainSliderText
