import * as React from 'react'
import { SVGProps } from 'react'
import PropTypes from 'prop-types'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgRocketLaunch = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.556 11.209a.562.562 0 0 1-.356.711c-.954.318-1.461 1.117-1.732 1.931a5.42 5.42 0 0 0-.212.893c.257-.04.569-.104.892-.212.814-.271 1.614-.778 1.932-1.732a.563.563 0 0 1 1.067.355c-.478 1.433-1.667 2.119-2.643 2.444a6.64 6.64 0 0 1-1.818.327h-.049l-.001-.562h-.563v-.016a2.718 2.718 0 0 1 .006-.152 6.632 6.632 0 0 1 .322-1.7c.325-.976 1.01-2.166 2.443-2.643a.563.563 0 0 1 .712.356Zm-2.92 4.155h-.563c0 .31.252.562.563.562v-.562ZM14.892 3.108c-.646-.096-2.255-.131-3.903 1.517L6.614 9 9 11.386l4.376-4.375c1.647-1.648 1.612-3.257 1.516-3.903Zm.168-1.112c-.897-.134-2.901-.132-4.866 1.833L5.42 8.602a.562.562 0 0 0 0 .796l3.182 3.181c.22.22.575.22.795 0l4.773-4.772c1.965-1.966 1.967-3.97 1.833-4.867m-.944-.944a1.123 1.123 0 0 1 .944.944"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.978 7.642c.31 0 .562.252.562.563v4.54a1.126 1.126 0 0 1-.33.795l-2.274 2.274a1.124 1.124 0 0 1-1.898-.575l-.59-2.947a.563.563 0 1 1 1.104-.22l.59 2.947 2.273-2.274v-4.54c0-.311.252-.563.563-.563ZM4.825 4.546c.136-.057.283-.086.43-.086h4.54a.563.563 0 1 1 0 1.125h-4.54L2.981 7.859l2.947.59a.562.562 0 1 1-.22 1.103l-2.947-.59a1.125 1.125 0 0 1-.575-1.898L4.46 4.789l.365.366-.365-.366c.104-.104.228-.187.365-.243Z"
      fill="#fff"
    />
  </svg>
)

SvgRocketLaunch.propTypes = {
  title: PropTypes.string,
}
SvgRocketLaunch.defaultProps = {
  title: '',
}
export type { SVGRProps }
export default SvgRocketLaunch
