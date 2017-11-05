import React from 'react'
import PropTypes from 'prop-types'

export default function Study({ fill, width, height }) {
  return (
    <svg
      className="icon"
      width={width}
      height={height}
      viewBox="0 0 2304 1792"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill={fill}
        d="M1774 836l18 316q4 69-82 128t-235 93.5-323 34.5-323-34.5-235-93.5-82-128l18-316 574 181q22 7 48 7t48-7zm530-324q0 23-22 31l-1120 352q-4 1-10 1t-10-1l-652-206q-43 34-71 111.5t-34 178.5q63 36 63 109 0 69-58 107l58 433q2 14-8 25-9 11-24 11h-192q-15 0-24-11-10-11-8-25l58-433q-58-38-58-107 0-73 65-111 11-207 98-330l-333-104q-22-8-22-31t22-31l1120-352q4-1 10-1t10 1l1120 352q22 8 22 31z"
      />
    </svg>
  )
}

Study.defaultProps = {
  fill: '#666',
  width: 16,
  height: 16
}

Study.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}
