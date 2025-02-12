import { List, ListProps } from '@chakra-ui/react'
import { forwardRef, useColorModeValue } from '@chakra-ui/system'

export const NestedList = forwardRef<ListProps, 'div'>((props, ref) => {
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100')
  return (
    <List
      px={{ base: 2, md: 4 }}
      ml={{ base: 6, md: 8 }}
      borderLeftWidth={1}
      borderColor={borderColor}
      ref={ref}
      {...props}
    />
  )
})
