import {
  mdiDesktopMac,
  mdiAccountConvert,
  mdiCurrencyUsd,
  mdiBookOpenVariant,
  mdiHandExtendedOutline, mdiViewList, mdiDatabaseMinus, mdiFileChartOutline
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
      to: '/distributor/list',
      icon: mdiAccountConvert ,
      label: 'Distributor Control'
    },
    {
      label: 'Financials',
      icon: mdiViewList,
      menu: [
        {
          to: '/financial',
          icon: mdiDatabaseMinus ,
          label: 'Deductions'
        },
        {
          to: '/credit-control/credits',
          icon: mdiFileChartOutline ,
          label: 'Statements'
        },
      ]
    },
  ],
]
