import * as React from 'react'
import { SVGProps } from 'react'
import PropTypes from 'prop-types'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgDecentraland = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M235.1 61.1c-44.4 5-85.7 24.8-117.4 56.3-41.6 41.4-62.5 99.7-56.7 157.7 6.2 61.3 40.4 115.7 93 148.2 76.4 47.1 177 34.9 240.6-29 52.4-52.7 70.6-129.7 47.3-199.8-23.2-69.6-82.3-120-154.9-132-11.6-1.9-40.5-2.7-51.9-1.4zm40 8c55.5 5.6 105.9 36.1 137.4 83 7.5 11.1 17.6 31.9 21.9 44.9 15.5 46.9 12 97.3-9.9 141.5-6.6 13.5-13.9 25.5-15.2 25.4-.5 0-20.1-23.4-43.8-51.9l-43.7-51.9c-.4-.1-10.5 11.6-22.5 25.9-11.9 14.3-22 25.9-22.5 25.8-.4-.2-21.2-28-46.1-61.7l-46.1-61.5c-.5-.1-23.7 30.8-51.5 68.6L81.9 326c-.3 0-2-4.2-3.7-9.3-13.8-40.5-13.3-85.9 1.4-125.5 30-80.6 110.4-130.8 195.5-122.1zm-94.9 261.1c-.5.5-21.2.7-46 .6l-45.3-.3 35.8-48.5 45.8-62 10-13.5.3 61.4-.6 62.3zm49.7-67.8 40.7 56c.4 1-1.2 3.6-4.1 7.1l-4.7 5.5H189v-61.5l.4-61.5c.3 0 18.5 24.5 40.5 54.4zm87.8 104.3c-.2.2-17.2.2-37.7.1l-37.2-.3 37.3-44.9 37.4-44.8.3 44.7-.1 45.2zm47.2-43 35.1 42.8c0 .3-16.6.5-37 .5h-37v-44.7c0-43.7 0-44.7 1.9-42.8 1 1.1 17.6 21 37 44.2zm-114.1 20.5-11.7 14-7.3 8.8H104.1l-5.4-8.3c-4.9-7.4-10.7-17.8-10.7-19.2 0-.3 37.6-.5 83.6-.5h83.6l-4.4 5.2zm148.4 33.6c-3.5 4.8-22.4 22.6-30.3 28.5-67.9 50.1-158.9 50.1-225.9-.2-8-6-26.9-23.7-30.1-28.3l-2-2.8h290.2l-1.9 2.8zM190.6 109.6c-7 2.2-14.9 10.3-17 17.4-.9 3-1.6 7-1.6 9 0 15 13 28 28 28s28-13 28-28c0-15.2-13.2-28.2-28.4-27.9-2.3 0-6.3.7-9 1.5zm20.4 9.8c5.9 3.9 8.5 8.9 8.5 16.6 0 7.8-2.6 12.7-8.8 16.8-5.6 3.7-15.3 3.9-21 .3-7.6-4.7-11.1-14-8.8-22.9 1.4-5.1 7.5-11.7 12.3-13.1 5.3-1.6 13.5-.6 17.8 2.3zm96.5 19.5c-17.2 4.9-30.8 18.5-35.9 36-2 6.9-2.1 19.9-.1 27.6 2.3 8.7 6.2 15.2 13.7 22.8 20.5 20.8 53.8 20.5 73.7-.8 10.1-10.9 14.4-21.9 14.3-36.6-.2-28.6-23.3-51.1-52.2-50.8-4.1 0-10.2.8-13.5 1.8zm31.9 9.9c3.9 1.8 9.1 5.4 12.5 8.7 26 24.8 12.4 68-23.3 74.6-18.3 3.4-38.1-7-46.7-24.6-3.3-6.7-3.4-7.4-3.4-18.5 0-10.9.2-11.9 3.2-18.2 5.5-11.7 14.7-19.8 27.1-23.9 8.9-3 21.9-2.2 30.6 1.9z" />
  </svg>
)

SvgDecentraland.propTypes = {
  title: PropTypes.string,
}
SvgDecentraland.defaultProps = {
  title: '',
}
export type { SVGRProps }
export default SvgDecentraland
