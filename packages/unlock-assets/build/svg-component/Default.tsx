import * as React from 'react'
import { SVGProps } from 'react'
import PropTypes from 'prop-types'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgDefault = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1200 256"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M449.94 230.054h53.04V0h-53.04ZM215.102 15.976h-55.596v55.608H70.68V15.976H15.083v55.608H0v26.42h15.083v41.626c0 52.081 45.052 94.578 100.33 94.578 54.956 0 99.689-42.497 99.689-94.578V98.004h14.964v-26.42h-14.964ZM159.506 139.63c0 24.603-19.49 44.732-44.094 44.732A44.864 44.864 0 0 1 70.68 139.63V98.004h88.826Zm189.15-72.53c-19.17 0-37.703 8.626-48.247 24.282h-.639l-3.195-19.81h-46.65v158.482h53.04v-82.436c0-18.213 14.06-32.91 30.994-32.91 17.573 0 31.312 14.697 31.312 32.271v83.075h53.04v-88.187c0-42.177-26.839-74.768-69.654-74.768Zm680.878 77.322 65.181-72.85h-65.5l-51.124 59.43h-.959V0h-53.04v230.054h53.04v-72.212h.96l52.72 72.212h66.78ZM613.208 67.1c-49.525 0-90.423 37.703-90.423 83.714s40.898 83.395 90.423 83.395 90.424-37.384 90.424-83.395-40.898-83.714-90.424-83.714Zm0 120.778c-20.13 0-37.064-16.934-37.064-37.064s16.935-37.064 37.064-37.064 37.384 16.934 37.384 37.064-17.254 37.064-37.384 37.064Zm201.61-74.448c15.657 0 28.438 8.947 33.231 21.408h53.998c-5.431-37.064-41.537-67.738-86.27-67.738-49.845 0-91.063 37.703-91.063 83.714s41.218 83.395 91.064 83.395c43.773 0 81.157-29.396 86.27-68.058h-53.999c-5.752 13.1-17.574 21.408-33.23 21.408a36.955 36.955 0 0 1-36.744-36.745c0-20.13 16.295-37.384 36.744-37.384Z" />
  </svg>
)

SvgDefault.propTypes = {
  title: PropTypes.string,
}
SvgDefault.defaultProps = {
  title: '',
}
export type { SVGRProps }
export default SvgDefault
