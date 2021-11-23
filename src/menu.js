import {
  mdiDesktopMac,
  mdiAccountConvert,
  mdiCurrencyUsd,
  mdiBookOpenVariant,
  mdiHandExtendedOutline
} from '@mdi/js'

export default [
  'General',
  [
    {
      to: '/dashboard',
      icon: mdiDesktopMac,
      label: 'Dashboard'
    },
    {
      to: '/clients',
      icon: mdiAccountConvert ,
      label: 'Client Control'
    },
    {
      to: '/credits',
      icon: mdiCurrencyUsd ,
      label: 'Credit Control'
    },
    {
      to: '/tranings',
      icon: mdiBookOpenVariant ,
      label: 'Trainings'
    },
    {
      to: '/support',
      icon: mdiHandExtendedOutline  ,
      label: 'Support'
    }
  ],
]
