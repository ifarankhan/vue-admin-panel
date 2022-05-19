import {
  mdiDesktopMac,
  mdiAccountConvert,
  mdiCurrencyUsd,
  mdiBookOpenVariant,
  mdiHandExtendedOutline, mdiViewList, mdiDatabaseMinus
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
      label: 'Trainings',
      class:"disabled-link"
    },
    {
      to: '/financial',
      icon: mdiDatabaseMinus ,
      label: 'Deductions',
    },
    // {
    //   label: 'Financials',
    //   icon: mdiViewList,
    //   menu: [
    //     {
    //       to: '/credit-control/credits',
    //       icon: mdiDatabaseMinus ,
    //       label: 'Deduction'
    //     },
    //     {
    //       to: '/credit-control/credits',
    //       icon: mdiCurrencyUsd ,
    //       label: 'Invoices'
    //     },
    //   ]
    // },
    {
      to: '/support',
      icon: mdiHandExtendedOutline  ,
      label: 'Support',
    }
  ],
]
