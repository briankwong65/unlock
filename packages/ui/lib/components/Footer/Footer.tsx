import { ReactNode } from 'react'
import { IconType } from 'react-icons'
import {
  BsGithub as GithubIcon,
  BsDiscord as DiscordIcon,
  BsTwitter as TwitterIcon,
} from 'react-icons/bs'
import { Icon } from '../Icon/Icon'
import { Link } from '../Link/Link'
import {
  EmailSubscriptionForm,
  EmailSubscriptionFormProps,
} from './EmailSubscriptionForm'

interface FooterItem {
  label: ReactNode
  url?: string
  target?: HTMLAnchorElement['target']
}

interface SocialLinkProps {
  url: string
  icon: IconType
}

interface MenuItemsProps {
  title: string
  options: FooterItem[]
}

interface FooterProps {
  privacyUrl?: string
  termsUrl?: string
  menuSections: MenuItemsProps[]
  subscriptionForm?: EmailSubscriptionFormProps
}

const SOCIAL_LINKS: SocialLinkProps[] = [
  {
    url: 'https://github.com/unlock-protocol',
    icon: GithubIcon,
  },
  {
    url: 'https://discord.com/invite/Ah6ZEJyTDp',
    icon: DiscordIcon,
  },
  {
    url: 'https://twitter.com/UnlockProtocol',
    icon: TwitterIcon,
  },
]

const Logo = () => {
  return (
    <svg
      width="181"
      height="40"
      viewBox="0 0 181 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M41.0278 14.5968V18.8296H0V14.5968H41.0278ZM29.3985 0H36.5138V25.7431C36.5138 28.565 35.8507 31.047 34.5246 33.189C33.1984 35.3311 31.3431 37.005 28.9586 38.2107C26.574 39.4036 23.7878 40 20.6 40C17.4121 40 14.6259 39.4036 12.2414 38.2107C9.85687 37.005 8.00154 35.3311 6.67539 33.189C5.36199 31.047 4.70529 28.565 4.70529 25.7431V0H11.8015V25.1467C11.8015 26.7885 12.1585 28.2508 12.8726 29.5334C13.5994 30.8161 14.6195 31.823 15.9329 32.5541C17.2591 33.2724 18.8148 33.6316 20.6 33.6316C22.3979 33.6316 23.9536 33.2724 25.267 32.5541C26.5932 31.823 27.6133 30.8161 28.3274 29.5334C29.0414 28.2508 29.3985 26.7885 29.3985 25.1467V0Z"
        fill="#020207"
      />
      <path
        d="M52.3721 22.0875V39.4036H45.448V9.85089H52.066V14.8725H52.4103C53.0861 13.2179 54.1636 11.9032 55.6428 10.9283C57.1347 9.95351 58.9773 9.46609 61.1706 9.46609C63.198 9.46609 64.9641 9.9022 66.4688 10.7744C67.9862 11.6466 69.1593 12.9101 69.9882 14.5647C70.8298 16.2193 71.2442 18.2267 71.2315 20.5868V39.4036H64.3074V21.6643C64.3074 19.689 63.7974 18.1433 62.7772 17.0274C61.7699 15.9115 60.3736 15.3535 58.5884 15.3535C57.377 15.3535 56.2995 15.6229 55.3559 16.1616C54.425 16.6875 53.6918 17.4507 53.1563 18.4512C52.6335 19.4517 52.3721 20.6638 52.3721 22.0875Z"
        fill="#020207"
      />
      <path d="M84.6314 0V39.4036H77.7074V0H84.6314Z" fill="#020207" />
      <path
        d="M104.004 39.9808C101.135 39.9808 98.6482 39.3458 96.5442 38.076C94.4402 36.8062 92.808 35.0297 91.6476 32.7465C90.5 30.4634 89.9262 27.7954 89.9262 24.7427C89.9262 21.6899 90.5 19.0156 91.6476 16.7196C92.808 14.4236 94.4402 12.6407 96.5442 11.3709C98.6482 10.101 101.135 9.46609 104.004 9.46609C106.873 9.46609 109.359 10.101 111.463 11.3709C113.567 12.6407 115.193 14.4236 116.341 16.7196C117.501 19.0156 118.081 21.6899 118.081 24.7427C118.081 27.7954 117.501 30.4634 116.341 32.7465C115.193 35.0297 113.567 36.8062 111.463 38.076C109.359 39.3458 106.873 39.9808 104.004 39.9808ZM104.042 34.4012C105.598 34.4012 106.898 33.9715 107.944 33.1121C108.99 32.2399 109.767 31.0726 110.277 29.6104C110.8 28.1482 111.062 26.5192 111.062 24.7234C111.062 22.9149 110.8 21.2795 110.277 19.8172C109.767 18.3422 108.99 17.1685 107.944 16.2963C106.898 15.4241 105.598 14.988 104.042 14.988C102.448 14.988 101.122 15.4241 100.064 16.2963C99.018 17.1685 98.2338 18.3422 97.7109 19.8172C97.2009 21.2795 96.9459 22.9149 96.9459 24.7234C96.9459 26.5192 97.2009 28.1482 97.7109 29.6104C98.2338 31.0726 99.018 32.2399 100.064 33.1121C101.122 33.9715 102.448 34.4012 104.042 34.4012Z"
        fill="#020207"
      />
      <path
        d="M136.211 39.9808C133.278 39.9808 130.759 39.333 128.655 38.0375C126.564 36.742 124.951 34.9527 123.816 32.6696C122.694 30.3736 122.133 27.7313 122.133 24.7427C122.133 21.7412 122.707 19.0925 123.854 16.7965C125.002 14.4877 126.621 12.692 128.713 11.4093C130.817 10.1138 133.303 9.46609 136.172 9.46609C138.557 9.46609 140.667 9.90861 142.503 10.7937C144.352 11.6659 145.825 12.9036 146.922 14.507C148.018 16.0975 148.643 17.9574 148.796 20.0866H142.178C141.91 18.6628 141.273 17.4764 140.265 16.5272C139.271 15.5652 137.938 15.0842 136.268 15.0842C134.852 15.0842 133.609 15.469 132.538 16.2386C131.467 16.9954 130.632 18.0856 130.032 19.5094C129.446 20.9331 129.153 22.6391 129.153 24.6272C129.153 26.641 129.446 28.3726 130.032 29.822C130.619 31.2586 131.441 32.3681 132.5 33.1506C133.571 33.9202 134.827 34.305 136.268 34.305C137.288 34.305 138.2 34.1126 139.003 33.7278C139.819 33.3301 140.501 32.7593 141.05 32.0154C141.598 31.2714 141.974 30.3672 142.178 29.3026H148.796C148.63 31.3933 148.018 33.2468 146.96 34.8629C145.902 36.4663 144.461 37.7233 142.637 38.634C140.814 39.5318 138.672 39.9808 136.211 39.9808Z"
        fill="#020207"
      />
      <path
        d="M159.687 30.1299L159.668 21.722H160.778L171.336 9.85089H179.427L166.439 24.3963H165.005L159.687 30.1299ZM153.375 39.4036V0H160.299V39.4036H153.375ZM171.814 39.4036L162.25 25.9548L166.917 21.0486L180.096 39.4036H171.814Z"
        fill="#020207"
      />
    </svg>
  )
}

const FooterLink = ({ label, url, target }: FooterItem) => {
  return (
    <Link href={url} target={target}>
      <span className="text-base text-brand-dark">{label}</span>
    </Link>
  )
}

const FooterAppLink = ({ label, url }: FooterItem) => {
  return (
    <Link href={url} className="flex flex-col gap-2 cursor-pointer md:gap-4">
      <span className="text-xl font-bold text-brand-dark">{label}</span>
      <span className="w-full h-[2px] bg-black"></span>
    </Link>
  )
}

const Footer = ({
  privacyUrl,
  termsUrl,
  menuSections,
  subscriptionForm,
}: FooterProps) => {
  return (
    <footer className="flex flex-col w-full gap-24">
      {subscriptionForm && <EmailSubscriptionForm {...subscriptionForm} />}
      <div className="flex flex-col w-full gap-16 mb-20 md:grid md:grid-cols-3 md:gap-44">
        <div className="flex flex-col w-full gap-10">
          <Logo />
          <div className="flex flex-col gap-9">
            <FooterAppLink label="Launch App" />
            <FooterAppLink label="Get Unlock Membership" />
          </div>
          <div className="flex gap-5">
            {SOCIAL_LINKS?.map(({ url, icon }, index) => (
              <Link key={index} href={url}>
                <Icon size={25} icon={icon} />
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full col-span-2">
          <ul className="grid justify-between grid-cols-2 gap-10 md:gap-0 md:flex md:flex-row">
            {menuSections?.map(({ title, options }, index) => {
              return (
                <div className="flex flex-col gap-4" key={index}>
                  <div className="text-base font-bold text-brand-dark">
                    {title}
                  </div>
                  <div className="flex flex-col gap-4 md:gap-6">
                    {options?.map(({ label, url }, index) => (
                      <FooterLink key={index} label={label} url={url} />
                    ))}
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="flex flex-col w-full gap-6 py-4 border-t border-gray-400 md:gap-0 md:items-center md:justify-between md:flex-row">
        <span className="text-xs text-brand-dark">
          &copy; Unlock Lab, {new Date().getFullYear()}
        </span>
        <div className="flex gap-8">
          {privacyUrl && (
            <Link
              href={privacyUrl}
              className="text-xs text-brand-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
          )}
          {termsUrl && (
            <Link
              href={termsUrl}
              className="text-xs text-brand-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Term of Service
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}

export default Footer
