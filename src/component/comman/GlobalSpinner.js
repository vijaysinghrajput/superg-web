import { Box, Spinner } from "@chakra-ui/react"


const GlobalSpinner = () => {

    return (
        <>
            <Box
                h="100vh"
                display={"flex"}
                alignItems="center"
                justifyContent={"center"}
            >
                <Spinner size={"lg"} />
            </Box>
        </>
    )
}

export default GlobalSpinner;