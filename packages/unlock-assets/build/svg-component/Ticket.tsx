import * as React from 'react'
import { SVGProps } from 'react'
import PropTypes from 'prop-types'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgTicket = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M23 19.853h-.733c-.406 0-.734.355-.734.794 0 .44.328.794.734.794H23v3.383c0 .876-.657 1.588-1.467 1.588H2.467C1.657 26.412 1 25.7 1 24.824V21.44h.733c.406 0 .734-.355.734-.794 0-.44-.328-.794-.734-.794H1V2.588C1 1.712 1.657 1 2.467 1h19.066C22.343 1 23 1.712 23 2.588v17.265ZM4.667 21.44h1.466c.406 0 .734-.355.734-.794 0-.44-.328-.794-.734-.794H4.667c-.406 0-.734.355-.734.794 0 .44.328.794.734.794Zm4.4 0h1.466c.406 0 .734-.355.734-.794 0-.44-.328-.794-.734-.794H9.067c-.406 0-.734.355-.734.794 0 .44.328.794.734.794Zm4.4 0h1.466c.406 0 .734-.355.734-.794 0-.44-.328-.794-.734-.794h-1.466c-.406 0-.734.355-.734.794 0 .44.328.794.734.794Zm4.4 0h1.466c.406 0 .734-.355.734-.794 0-.44-.328-.794-.734-.794h-1.466c-.406 0-.734.355-.734.794 0 .44.328.794.734.794ZM5 3.5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h14a1.5 1.5 0 0 0 1.5-1.5V5A1.5 1.5 0 0 0 19 3.5H5ZM4.5 5a.5.5 0 0 1 .5-.5h14a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5Z"
    />
  </svg>
)

SvgTicket.propTypes = {
  title: PropTypes.string,
}
SvgTicket.defaultProps = {
  title: '',
}
export type { SVGRProps }
export default SvgTicket
