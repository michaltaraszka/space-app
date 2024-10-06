import {Box, Divider, Flex, Spacer, Text} from "@chakra-ui/react";
import * as React from "react";

interface PanelHeaderComponentProps {
    text: string,
    icon: React.ReactNode
}

export const PanelHeaderComponent: React.FC<PanelHeaderComponentProps> = ({text, icon}) => {
    return <>
        <Flex width={"100%"}
              alignItems="center"
              p={1}
        >
            <Box>
                <Text fontSize={"lg"}>{text}</Text>
            </Box>
            <Spacer/>
            <Box>
                {icon}
            </Box>
        </Flex>
        <Divider></Divider>
    </>;
}