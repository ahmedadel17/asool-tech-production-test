import React from 'react'
import { useTranslations } from 'next-intl'
function VariableWidget() {
  const t = useTranslations('productsFilter')
  return (
    <div className="variable-widget w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6">

    {/* <!-- Widget Header --> */}
    <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('Size')} &amp; {t('Color')}</h3>
        <button id="clearSizeColor" className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors" aria-label="Clear all size and color filters" >
            {t('Clear')}    
        </button>
    </div>

    {/* <!-- Size Filter --> */}
    <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Size</h4>
        <div className="grid grid-cols-4 gap-2">
                            <button className="size-option" data-size="XS" aria-label="Select size XS" >
                    XS                </button>
                            <button className="size-option" data-size="S" aria-label="Select size S" >
                    S                </button>
                            <button className="size-option" data-size="M" aria-label="Select size M" >
                    M                </button>
                            <button className="size-option" data-size="L" aria-label="Select size L" >
                    L                </button>
                            <button className="size-option" data-size="XL" aria-label="Select size XL" >
                    XL                </button>
                            <button className="size-option" data-size="XXL" aria-label="Select size XXL" >
                    XXL                </button>
                    </div>

        {/* <!-- Shoe Sizes --> */}
        <div className="mt-4">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Shoe Sizes</div>
            <div className="grid grid-cols-4 gap-2">
                                    <button className="size-option" data-size="38" aria-label="Select shoe size 38" >
                        38                    </button>
                                    <button className="size-option" data-size="39" aria-label="Select shoe size 39" >
                        39                    </button>
                                    <button className="size-option" data-size="40" aria-label="Select shoe size 40" >
                        40                    </button>
                                    <button className="size-option" data-size="41" aria-label="Select shoe size 41" >
                        41                    </button>
                                    <button className="size-option" data-size="42" aria-label="Select shoe size 42" >
                        42                    </button>
                                    <button className="size-option" data-size="43" aria-label="Select shoe size 43" >
                        43                    </button>
                                    <button className="size-option" data-size="44" aria-label="Select shoe size 44" >
                        44                    </button>
                                    <button className="size-option" data-size="45" aria-label="Select shoe size 45" >
                        45                    </button>
                            </div>
        </div>
    </div>

    {/* <!-- Color Filter --> */}
    <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Color</h4>
        <div className="flex flex-wrap gap-3">
                            <button className="color-option" style={{backgroundColor: 'black'}} data-color="black" title="black" aria-label="Select color black" ><span className="sr-only">black</span></button>
                            <button className="color-option" style={{backgroundColor: 'white'}} data-color="white" title="white" aria-label="Select color white" ><span className="sr-only">white</span></button>
                            <button className="color-option" style={{backgroundColor: 'gray'}} data-color="gray" title="gray" aria-label="Select color gray" ><span className="sr-only">gray</span></button>
                            <button className="color-option" style={{backgroundColor: 'red'}} data-color="red" title="red" aria-label="Select color red" ><span className="sr-only">red</span></button>
                            <button className="color-option" style={{backgroundColor: 'blue'}} data-color="blue" title="blue" aria-label="Select color blue" ><span className="sr-only">blue</span></button>
                            <button className="color-option" style={{backgroundColor: 'yellow'}} data-color="yellow" title="yellow" aria-label="Select color yellow" ><span className="sr-only">yellow</span></button>
                            <button className="color-option" style={{backgroundColor: 'green'}} data-color="green" title="green" aria-label="Select color green" ><span className="sr-only">green</span></button>
                    </div>
    </div>

    {/* <!-- Selected Filters Display --> */}
    <div id="selectedFilters" className="mb-6 hidden">
        <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">Selected:</div>
        <div className="space-y-2">
            <div id="selectedSizes" className="hidden">
                <span className="text-xs text-gray-500 dark:text-gray-400">Sizes:</span>
                <div className="flex flex-wrap gap-1 mt-1" id="sizeTagsContainer"></div>
            </div>
            <div id="selectedColors" className="hidden">
                <span className="text-xs text-gray-500 dark:text-gray-400">Colors:</span>
                <div className="flex flex-wrap gap-1 mt-1" id="colorTagsContainer"></div>
            </div>
        </div>
    </div>

    {/* <!-- Apply Button --> */}
    <button id="applySizeColorFilter" className="w-full te-btn te-btn-default" aria-label="Apply size and color filters" >
        {t('Apply Filter')}
    </button>

    {/* <!-- Results Count --> */}
    <div className="mt-4 text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400" id="sizeColorResults">Showing 124 products</span>
    </div>
</div>
  )
}

export default VariableWidget
