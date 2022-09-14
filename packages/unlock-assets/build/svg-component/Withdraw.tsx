import * as React from 'react'
import { SVGProps } from 'react'
import PropTypes from 'prop-types'
interface SVGRProps {
  title?: string;
  titleId?: string;
}

const SvgWithdraw = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby={titleId} {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 4.5a6.5 6.5 0 0 0-3 12.268v1.108A7.502 7.502 0 0 1 12 3.5a7.5 7.5 0 0 1 3 14.376v-1.108A6.5 6.5 0 0 0 12 4.5Zm-.485 9.599c-.48-.036-.885-.147-1.215-.333-.33-.186-.6-.423-.81-.711l.649-.621c.204.246.42.438.648.576.227.132.486.213.773.243v-2.061l-.207-.036a2.732 2.732 0 0 1-.764-.243 1.648 1.648 0 0 1-.514-.396 1.504 1.504 0 0 1-.287-.513 2.04 2.04 0 0 1-.09-.612c0-.51.159-.915.476-1.215.319-.306.766-.489 1.341-.549v-.927h.756v.927c.396.042.738.141 1.026.297.288.156.537.369.747.639l-.657.594a1.792 1.792 0 0 0-.504-.45 1.604 1.604 0 0 0-.656-.216V10.4l.242.036c.3.054.556.135.766.243.21.108.38.24.513.396.138.15.237.321.296.513.06.192.09.396.09.612 0 .516-.162.939-.486 1.269-.317.33-.777.531-1.377.603v.945h-.756v-.918Zm-.864-4.734c0 .252.07.45.207.594.144.138.378.243.702.315v-1.8c-.606.072-.909.369-.909.891Zm2.53 2.88c0-.27-.075-.474-.225-.612-.144-.144-.387-.249-.73-.315v1.926c.313-.048.55-.156.711-.324.163-.168.244-.393.244-.675ZM12 22.5a.5.5 0 0 1-.38-.175l-2-2.333a.5.5 0 0 1 .76-.65l1.12 1.306V16.5a.5.5 0 0 1 1 0v4.148l1.12-1.307a.5.5 0 1 1 .76.651l-2 2.333a.5.5 0 0 1-.38.175Z"
    />
  </svg>
)

SvgWithdraw.propTypes = {
  title: PropTypes.string,
}
SvgWithdraw.defaultProps = {
  title: '',
}
export type { SVGRProps }
export default SvgWithdraw
