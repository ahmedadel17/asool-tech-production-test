import React from 'react'

function VariableWidgetSection({attributeName,children}: {attributeName: string, children: React.ReactNode}) {
  return (
    <div className="mb-6">
    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{attributeName}</h4>
    <div className="flex flex-wrap gap-3">
                        {children}
                </div>
</div>
  )
}

export default VariableWidgetSection
