import React from 'react'
import PropTypes from 'prop-types'

export default function Filter({ fill, width, height }) {
  return (
    <svg
      className="icon"
      width={width}
      height={height}
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill={fill}
        d="M1595 295q17 41-14 70l-493 493v742q0 42-39 59-13 5-25 5-27 0-45-19l-256-256q-19-19-19-45v-486l-493-493q-31-29-14-70 17-39 59-39h1280q42 0 59 39z"
      />
    </svg>
  )
}

Filter.defaultProps = {
  fill: '#666',
  width: 16,
  height: 16
}

Filter.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
}
