import { WalletConnectCurrentColorIcon } from 'components/Icons/WalletConnectIcon'
import { type Plugins } from 'plugins/types'
import { RouteCategory } from 'Routes/helpers'

import { WalletConnectToDapps } from './WalletConnectToDapps'

// eslint-disable-next-line import/no-default-export
export default function register(): Plugins {
  return [
    [
      'walletConnect',
      {
        name: 'walletConnect',
        featureFlag: 'WalletConnectToDapps',
        icon: <WalletConnectCurrentColorIcon />,
        routes: [
          {
            path: '/dapps',
            label: 'navBar.dApps',
            main: WalletConnectToDapps,
            icon: <WalletConnectCurrentColorIcon />,
            category: RouteCategory.Explore,
          },
        ],
      },
    ],
  ]
}
