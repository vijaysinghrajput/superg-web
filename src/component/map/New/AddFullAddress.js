import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Text,
    useRadio,
    Box,
    useRadioGroup,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Button,
} from '@chakra-ui/react';


export default function AddFullAddress({ isOpen, onClose, setFullAddress }) {

    return (
        <>
            <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent
                    borderTopRadius={12}
                >
                    <DrawerHeader borderBottomWidth='1px'>Enter Complete Address</DrawerHeader>
                    <DrawerBody>
                        <Text>Save address as *</Text>
                        <AddressType />
                        <Box my={2}>
                            <FormControl id="email">
                                <FormLabel fontSize={12}>Complete address</FormLabel>
                                <Input type="text" onChange={e => setFullAddress(e.target.value)} />
                            </FormControl>
                        </Box>
                        <Button width={"100%"}
                            background="#0db616"
                            color="#fff"
                            fontSize={14}
                            fontWeight="400"
                            mb={2}
                        >Save Address</Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                    bg: "#33b31124",
                    color: 'black',
                    borderColor: '#33b311',
                }}
                _focus={{
                    boxShadow: 'outline',
                }}
                px={3}
                py={1}
            >
                {props.children}
            </Box>
        </Box>
    )
}

// Step 2: Use the `useRadioGroup` hook to control a group of custom radios.
function AddressType() {
    const options = ['Home', 'Work', 'Office']

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 'react',
        onChange: console.log,
    })

    const group = getRootProps()

    return (
        <HStack {...group} mt={2}>
            {options.map((value) => {
                const radio = getRadioProps({ value })
                return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                )
            })}
        </HStack>
    )
}