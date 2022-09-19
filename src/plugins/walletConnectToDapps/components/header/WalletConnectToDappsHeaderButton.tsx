import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList } from '@chakra-ui/menu'
import { Button, MenuItem } from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslate } from 'react-polyglot'
import { WalletConnectIcon } from 'components/Icons/WalletConnectIcon'
import { RawText } from 'components/Text'

import { ConnectModal } from '../modal/connect/ConnectModal'
import { WalletConnectModal } from '../modal/WalletConnectModal'
import { DappAvatar } from './DappAvatar'
import { DappHeaderMenuSummary } from './DappHeaderMenuSummary'

export const WalletConnectToDappsHeaderButton = () => {
  const [isOpen, setOpen] = useState(false)

  // const dapp: any = {
  //   name: 'Uniswap',
  //   link: 'app.uniswap.org',
  //   image:
  //     'https://rawcdn.githack.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png',
  //   chainId: 1,
  //   connected: true,
  //   address: '0x123321123123321',
  // }
  const dapp: any = null
  const translate = useTranslate()

  if (!dapp) {
    return (
      <>
        <Button
          leftIcon={<WalletConnectIcon />}
          rightIcon={<ChevronRightIcon />}
          onClick={() => setOpen(true)}
        >
          {translate('plugins.walletConnectToDapps.header.connectDapp')}
        </Button>
        <ConnectModal isOpen={isOpen} onClose={() => setOpen(false)} />
      </>
    )
  }

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={Button}
        leftIcon={
          <DappAvatar
            name={dapp.name}
            image={dapp.image}
            connected={dapp.connected}
            size={6}
            connectedDotSize={2}
            borderWidth={1}
          />
        }
        rightIcon={<ChevronDownIcon />}
        width={{ base: 'full', md: 'auto' }}
        textAlign='left'
      >
        {/* TODO: when setting "flex: unset" or "flex-shrink: none" to the Button content parent, overflow isn't a problem */}
        <RawText fontSize='sm'>{dapp.name}</RawText>
        <RawText fontSize='xs' color='gray.500'>
          {dapp.link}
        </RawText>
      </MenuButton>
      <MenuList>
        <DappHeaderMenuSummary dapp={dapp} />

        <MenuItem fontWeight='medium' onClick={() => setOpen(true)}>
          Debug
        </MenuItem>
      </MenuList>

      <WalletConnectModal isOpen={isOpen} onClose={() => setOpen(false)}>
        children
      </WalletConnectModal>
    </Menu>
  )
}
