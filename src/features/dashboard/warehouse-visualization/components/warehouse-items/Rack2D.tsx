import React from 'react'

interface Rack2dProps {
  width: number
  height: number
  shelfCount: number
}

const Rack2d: React.FC<Rack2dProps> = ({ width, height, shelfCount }) => {
  // Calculate shelf height
  const shelfHeight = height / (shelfCount + 1)

  const uprightColor = '#33557C'
  const shelfColor = '#E89952'

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative'
        // border: `1px solid ${uprightColor}`
      }}
    >
      {/* Vertical Supports */}
      <div
        style={{
          width: '4px',
          height: `${height}px`,
          backgroundColor: uprightColor,
          position: 'absolute',
          left: '0',
          top: '0'
        }}
      />
      <div
        style={{
          width: '4px',
          height: `${height}px`,
          backgroundColor: uprightColor,
          position: 'absolute',
          right: '0',
          top: '0'
        }}
      />

      {/* Shelves */}
      {Array.from({ length: shelfCount }, (_, index) => (
        <div
          key={index}
          style={{
            width: `${width}px`,
            height: '4px',
            backgroundColor: shelfColor,
            position: 'absolute',
            top: `${(index + 1) * shelfHeight - 5}px`,
            left: '0'
          }}
        />
      ))}
    </div>
  )
}

export default Rack2d
