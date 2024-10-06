import {
    Flex, SimpleGrid, Spacer,
    Text,
    VStack
} from "@chakra-ui/react";
import {InfoOutlineIcon} from "@chakra-ui/icons";
import * as React from "react";
import {PanelHeaderComponent} from "./PanelHeaderComponent";
import {FieldData} from "./HomePage";

interface StatisticsComponentProps {
    field: FieldData,
    height: number
}


export const StatisticsComponent: React.FC<StatisticsComponentProps> = ({height, field}) => {
    return <VStack height={height} width={"100%"}>
        <PanelHeaderComponent text={"Statistics"} icon={<InfoOutlineIcon/>}/>
        <SimpleGrid width={"100%"} columns={4} spacing={6}>
            <Flex borderBottomWidth={"1px"} p={2}><Text>ID:</Text><Spacer/><Text>{field.id}</Text></Flex>
            <Flex borderBottomWidth={"1px"} p={2}><Text>Location:</Text><Spacer/><Text>{field.location.lat}, {field.location.lon}</Text></Flex>
            <Flex borderBottomWidth={"1px"} p={2}><Text>Name</Text><Spacer/><Text>{field.name}</Text></Flex>
            <Flex borderBottomWidth={"1px"} p={2}><Text>Plant</Text><Spacer/><Text>{field.type}</Text></Flex>
        </SimpleGrid>
    </VStack>
}