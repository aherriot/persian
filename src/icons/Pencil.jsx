import React from 'react'
import PropTypes from 'prop-types'

export default function Pencil({ fill, width, height, className }) {
  return (
    <svg
      className={'icon ' + (className || '')}
      width={width}
      height={height}
      viewBox="0 0 1792 1792"
      xmlns="http://www.w3.org/2000/svg">
      <path
        fill={fill}
        d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"
      />
    </svg>
  )
}

Pencil.defaultProps = {
  fill: '#666',
  width: 16,
  height: 16
}

Pencil.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  className: PropTypes.string
}
