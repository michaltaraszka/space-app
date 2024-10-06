import {
    Box, Flex,
    Grid,
    GridItem, HStack, Square, Text, VStack
} from "@chakra-ui/react";
import {Map} from "./Map";
import * as React from "react";
import {useWindowHeight} from "@react-hook/window-size";
import {StatisticsComponent} from "./StatisticsComponent";
import WeatherComponent from "./WeatherComponent";
import {Fields} from "./HomePage";
import {AddIcon} from "@chakra-ui/icons";

interface DashboardComponentProps {
    fields: Fields
}

export const DashboardComponent: React.FC<DashboardComponentProps> = ({fields}) => {
    const [selectedField, setSelectedField] = React.useState(fields[0]);
    const windowHeight = useWindowHeight();
    const padding = 16;
    const maxHeight = windowHeight - 190;
    return (
        <Box width="100%">
            <Flex>
                <VStack mr={4}>
                    {fields.map((field) => {
                        return <Box
                            borderWidth='1px'
                            p="1rem"
                            backgroundColor={field.id === selectedField.id ? "green.500" : "whiteAlpha.900"}
                            color={field.id === selectedField.id ? "white" : "black"}
                            boxShadow="md"
                            onClick={() => console.log('Field selected: ', field.id)}>
                            <Square size='80px' onClick={() => setSelectedField(field)}>
                                <HStack>
                                <Text fontSize={"lg"}>{field.name}</Text></HStack>
                            </Square>
                        </Box>
                    })}
                    <Box
                         borderWidth='1px'
                         p="1rem"
                         backgroundColor="whiteAlpha.900"
                         boxShadow="md"
                        alignItems={"center"}>
                        <Square size='80px'>
                            <AddIcon w={16} h={16} color={"gray.500"}></AddIcon>
                        </Square>
                    </Box>
                </VStack>
                <Grid
                    templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(2, 1fr)'
                    gap={4}
                    h={`${maxHeight - padding}px`}
                    flex={1}
                >
                    <GridItem rowSpan={1} colSpan={1}
                              borderWidth='1px'
                              p="1rem"
                              backgroundColor="whiteAlpha.900"
                              boxShadow="md">
                        <Map field={selectedField}></Map></GridItem>
                    <GridItem rowSpan={2} colSpan={1}
                              borderWidth='1px'
                              p="1rem"
                              backgroundColor="whiteAlpha.900"
                              boxShadow="md"><WeatherComponent field={selectedField}/></GridItem>
                    <GridItem rowSpan={1} colSpan={1}
                              borderWidth='1px'
                              p="1rem"
                              backgroundColor="whiteAlpha.900"
                              boxShadow="md">
                        <StatisticsComponent height={maxHeight / 2 - padding * 8}
                                             field={selectedField}></StatisticsComponent>
                    </GridItem>
                </Grid>
            </Flex>
        </Box>
    );
}