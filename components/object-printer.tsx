'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'

type ObjectPrinterProps = {
  data: unknown
  level?: number
}

export function ObjectPrinter({ data, level = 0 }: ObjectPrinterProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2)

  const toggleExpand = () => setIsExpanded(!isExpanded)

  const renderValue = (value: unknown) => {
    if (value === null) return <span className="text-gray-500">null</span>
    if (value === undefined)
      return <span className="text-gray-500">undefined</span>
    if (typeof value === 'string')
      return <span className="text-green-600">{value}</span>
    if (typeof value === 'number')
      return <span className="text-blue-600">{value}</span>
    if (typeof value === 'boolean')
      return <span className="text-purple-600">{value.toString()}</span>
    if (Array.isArray(value) || typeof value === 'object') {
      return <ObjectPrinter data={value} level={level + 1} />
    }
    return <span>{value.toString()}</span>
  }

  const renderContent = () => {
    if (Array.isArray(data)) {
      return (
        <div className="ml-4">
          {data.map((item, index) => (
            <div key={index} className="my-1">
              {renderValue(item)}
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="ml-4">
        {Object.entries(data as Array<unknown>).map(([key, value]) => (
          <div key={key} className="my-1">
            <span className="font-semibold">{key}: </span>
            {renderValue(value)}
          </div>
        ))}
      </div>
    )
  }

  const isExpandable = Array.isArray(data) || typeof data === 'object'

  return (
    <div className="font-mono text-sm">
      {isExpandable ? (
        <div>
          <button
            onClick={toggleExpand}
            className="flex items-center focus:outline-none"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 mr-1" />
            ) : (
              <ChevronRight className="w-4 h-4 mr-1" />
            )}
            <span className="font-semibold">
              {Array.isArray(data) ? 'Array' : 'Object'}
              <span className="text-gray-500 ml-2">
                (
                {Array.isArray(data)
                  ? data.length
                  : Object.keys(data as Array<unknown>).length}{' '}
                items)
              </span>
            </span>
          </button>
          {isExpanded && renderContent()}
        </div>
      ) : (
        renderValue(data)
      )}
    </div>
  )
}

// Example usage
function ExampleUsage() {
  const exampleObject = {
    name: 'John Doe',
    age: 30,
    isStudent: false,
    hobbies: ['reading', 'swimming', 'coding'],
    address: {
      street: '123 Main St',
      city: 'Anytown',
      country: 'USA',
    },
    grades: {
      math: 95,
      science: 88,
      history: null,
    },
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Object Printer Example</h1>
      <ObjectPrinter data={exampleObject} />
    </div>
  )
}

export { ExampleUsage as Component }

