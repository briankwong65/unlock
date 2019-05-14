import React from 'react'
import { storiesOf } from '@storybook/react'
import { FullScreenModal } from '../../components/interface/FullScreenModals'
import {
  WalletCheck,
  PasswordPrompt,
} from '../../components/interface/modal-templates'
import { KindOfModal } from '../../unlockTypes'
import doNothing from '../../utils/doNothing'

storiesOf('Full Screen Modals', module)
  .add('The Wallet Check Overlay', () => {
    return (
      <FullScreenModal
        active
        kindOfModal={KindOfModal.WalletCheckOverlay}
        dispatch={doNothing}
      />
    )
  })
  .add('The Wallet Check Overlay, inactive', () => {
    // This is supposed to not render anything.
    return (
      <FullScreenModal
        active={false}
        kindOfModal={KindOfModal.WalletCheckOverlay}
        dispatch={doNothing}
      />
    )
  })
  .add('The Password Prompt Overlay', () => {
    return (
      <FullScreenModal
        active
        kindOfModal={KindOfModal.PasswordPrompt}
        dispatch={doNothing}
      />
    )
  })
  .add('The Password Prompt Overlay, inactive', () => {
    // This is supposed to not render anything.
    return (
      <FullScreenModal
        active={false}
        kindOfModal={KindOfModal.PasswordPrompt}
        dispatch={doNothing}
      />
    )
  })

storiesOf('Full Screen Modals/templates', module)
  .add('The Wallet Check Overlay', () => {
    return <WalletCheck dispatch={doNothing} />
  })
  .add('The Password Prompt Overlay', () => {
    return <PasswordPrompt dispatch={doNothing} />
  })
