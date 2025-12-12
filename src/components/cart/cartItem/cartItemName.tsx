import React from 'react'

function cartItemName({name}: {name: string | undefined}) {
  return (
    <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>

  )
}

export default cartItemName
