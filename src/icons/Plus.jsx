import React from 'react'
import PropTypes from 'prop-types'

export default function Plus({ fill, width, height }) {
  return (
    <svg
      className="icon"
      width={width}
      height={height}
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill={fill}
        d="M1344 960v-128q0-26-19-45t-45-19h-256v-256q0-26-19-45t-45-19h-128q-26 0-45 19t-19 45v256h-256q-26 0-45 19t-19 45v128q0 26 19 45t45 19h256v256q0 26 19 45t45 19h128q26 0 45-19t19-45v-256h256q26 0 45-19t19-45zm320-64q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
      />
    </svg>
  )
}

Plus.defaultProps = {
  fill: '#666',
  width: 16,
  height: 16
}

Plus.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}
