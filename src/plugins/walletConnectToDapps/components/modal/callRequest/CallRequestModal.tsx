import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import { HStack, ModalCloseButton, ModalHeader } from '@chakra-ui/react'
import { WalletConnectIcon } from 'components/Icons/WalletConnectIcon'
import { Text } from 'components/Text'
import { FC, useMemo } from 'react'

import { WalletConnectCallRequest } from '@shapeshiftoss/hdwallet-walletconnect-bridge/dist/types'
import { convertHexToUtf8 } from "@walletconnect/utils"
import { SignMessageConfirmation } from './SignMessageConfirmation'

type WalletConnectModalProps = {
  callRequest: WalletConnectCallRequest | undefined
}

export const CallRequestModal: FC<WalletConnectModalProps> = ({ callRequest }) => {
  const content = useMemo(() => {
    if (!callRequest) return null;
    switch (callRequest.method) {
      case 'personal_sign':
        return <SignMessageConfirmation
        message={convertHexToUtf8(callRequest.params[0])}
        isLoading={false}
      />
      default:
        return null
    }
  }, [callRequest]);

  return (
    <Modal isOpen={!!callRequest} onClose={() => alert('allow close?')} variant='header-nav'>
      <ModalOverlay />

      <ModalContent
        width='full'
        borderRadius={{ base: 0, md: 'xl' }}
        minWidth={{ base: '100%', md: '500px' }}
        maxWidth={{ base: 'full', md: '500px' }}
      >
        <ModalHeader py={2}>
          <HStack alignItems='center' spacing={2}>
            <WalletConnectIcon />
            <Text fontSize='md' translation='plugins.walletConnectToDapps.modal.title' flex={1} />
            <Text
              rounded='lg'
              fontSize='sm'
              px='2'
              bgColor='purple.600'
              translation='plugins.walletConnectToDapps.modal.ethereum'
            />
            <ModalCloseButton position='static' />
          </HStack>
        </ModalHeader>
        {content}
      </ModalContent>
    </Modal>
  )
}
