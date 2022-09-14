import * as React from 'react'
import { SVGProps } from 'react'
import PropTypes from 'prop-types'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgMembers = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.613 0c1.938 0 3.546 1.553 3.546 3.5 0 1.196-.61 2.245-1.524 2.873a5.565 5.565 0 0 1 3.2 3.184c.248.644.09 1.29-.284 1.745-.36.438-.914.698-1.503.698h-1.136a2.735 2.735 0 0 0-.177-.79 6.427 6.427 0 0 0-.085-.21h1.398c.596 0 1.068-.527.854-1.085a4.57 4.57 0 0 0-2.93-2.713c-.344-.105-.609-.407-.609-.768 0-.323.219-.6.502-.758A2.496 2.496 0 0 0 12.159 3.5c0-1.378-1.143-2.5-2.546-2.5-.655 0-1.254.245-1.706.647a4.6 4.6 0 0 0-.975-.435A3.565 3.565 0 0 1 9.613 0Zm-.527 5.5C9.086 3.553 7.48 2 5.541 2S1.995 3.553 1.995 5.5c0 1.196.608 2.244 1.524 2.873a5.565 5.565 0 0 0-3.2 3.184c-.248.643-.09 1.29.284 1.745.36.438.913.698 1.503.698h6.869c.59 0 1.143-.26 1.503-.698a1.738 1.738 0 0 0 .285-1.745 5.565 5.565 0 0 0-3.2-3.184A3.486 3.486 0 0 0 9.086 5.5Zm-1 0c0-1.378-1.143-2.5-2.545-2.5-1.403 0-2.546 1.122-2.546 2.5 0 1.12.754 2.07 1.79 2.387.27.083.488.315.488.598 0 .293-.23.532-.52.581a4.578 4.578 0 0 0-3.5 2.85c-.215.556.257 1.084.853 1.084h6.869c.597 0 1.068-.527.854-1.085A4.57 4.57 0 0 0 6.9 9.202c-.344-.105-.608-.407-.608-.768 0-.323.218-.6.5-.758A2.496 2.496 0 0 0 8.087 5.5Z"
    />
  </svg>
)

SvgMembers.propTypes = {
  title: PropTypes.string,
}
SvgMembers.defaultProps = {
  title: '',
}
export type { SVGRProps }
export default SvgMembers
