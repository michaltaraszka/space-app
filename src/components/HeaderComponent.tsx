import {Box, Flex, Image, Text} from "@chakra-ui/react";

export const HeaderComponent = () => {
    return (
        <Box width="100%"
             borderWidth='1px'
             p="1rem"
             backgroundColor="whiteAlpha.900"
             boxShadow="md">
            <Flex fontSize='2em'>
                <Image src={'/icon.png'} alt={'icon'} boxSize='50px'/>
                <Text paddingLeft={'0.5em'}>CropSphere</Text>
            </Flex>
        </Box>
    );
}