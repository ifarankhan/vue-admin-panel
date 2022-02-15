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
      to: '/client-control/list',
      icon: mdiAccountConvert ,
      label: 'Client Control'
    },
    {
      to: '/credit-control/credits',
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
