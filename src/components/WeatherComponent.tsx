import React, { useState, useEffect } from 'react';
import {Box, Divider, Flex, SimpleGrid, Spinner, Text, VStack} from '@chakra-ui/react';
import {XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart} from 'recharts';
import {PanelHeaderComponent} from "./PanelHeaderComponent";
import {InfoOutlineIcon} from "@chakra-ui/icons";
import {FieldData} from "./HomePage";
import {useWindowHeight} from "@react-hook/window-size";

interface WeatherData {
    hourly: {
        temperature_2m: number[];
        relative_humidity_2m: number[];
        rain: number[];
        cloud_cover: number[];
        soil_temperature_0cm: number[];
        soil_moisture_0_to_1cm: number[];
        time: string[];
    };
}

interface ChartData {
    time: string;
    value: number;
}

function Chart(props: { name: string, data: ChartData[], tickFormatter: (value: number) => string , color: string}) {
    useWindowHeight();
    return <Box>
        <Flex><Text fontSize="lg" textAlign="center" p={2}>{props.name}</Text></Flex>
        <Divider/>
        <ResponsiveContainer width="100%" maxHeight={250}>
        <AreaChart data={props.data}>
            <SimpleGrid/>
            <XAxis dataKey="time" interval={2}/>
            <YAxis domain={["auto", "auto"]} tickFormatter={props.tickFormatter}/>
            <Tooltip formatter={props.tickFormatter} label={"Temperature"}/>
            <Area type="monotone" dataKey="value" stroke={props.color} fill={props.color}/>
        </AreaChart>
    </ResponsiveContainer>
    </Box>;
}

interface WeatherComponemtProps {
    field: FieldData
}

const WeatherChart: React.FC<WeatherComponemtProps> = ({field}) => {
    const [temperatureData, setTemperatureData] = useState<ChartData[]>([]);
    const [humidityData, setHumidityData] = useState<ChartData[]>([]);
    const [rainData, setRainData] = useState<ChartData[]>([]);
    const [cloudData, setCloudData] = useState<ChartData[]>([]);
    const [soilTemperatureData, setSoilTemperatureData] = useState<ChartData[]>([]);
    const [soilMoistureData, setSoilMoistureData] = useState<ChartData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const transformData = (data: number[])=> data.map((temp, index) => ({
        time: index.toString(), // Format time
        value: temp,
    }));

    useEffect(() => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${field.location.lat}&longitude=${field.location.lon}&hourly=temperature_2m,relative_humidity_2m,rain,cloud_cover,soil_temperature_0cm,soil_moisture_0_to_1cm&forecast_days=1`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data: WeatherData) => {
                setTemperatureData(transformData(data.hourly.temperature_2m));
                setHumidityData(transformData(data.hourly.relative_humidity_2m));
                setRainData(transformData(data.hourly.rain));
                setCloudData(transformData(data.hourly.cloud_cover));
                setSoilTemperatureData(transformData(data.hourly.soil_temperature_0cm));
                setSoilMoistureData(transformData(data.hourly.soil_moisture_0_to_1cm));
                setIsLoaded(true);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, [field.location.lat, field.location.lon]);

    if (error) {
        return <Text color="red.500">Error: {error}</Text>;
    }

    if (!isLoaded) {
        return <Spinner />;
    }
    const celsiusFormatter = (value: number) => `${value}°C`;

    return (
        <VStack width="100%">
            <PanelHeaderComponent text={"Weather"} icon={<InfoOutlineIcon/>}/>
            <SimpleGrid  width={"100%"} pt={"1.5rem"} columns={2} spacing={4}>
                <Chart name={"Temperature"} data={temperatureData} tickFormatter={celsiusFormatter} color={"rgb(56, 161, 105)"}/>
                <Chart name={"Humidity"} data={humidityData} tickFormatter={(value) => `${value}%`} color={"rgb(51 136 186)"}/>
                <Chart name={"Precipitation Amount"} data={rainData} tickFormatter={(value) => `${value}mm`} color={"rgb(51 136 186)"}/>
                <Chart name={"Cloud cover"} data={cloudData} tickFormatter={(value) => `${value}%`} color={"rgb(51 136 186)"}/>
                <Chart name={"Soil temperature"} data={soilTemperatureData} tickFormatter={celsiusFormatter} color={"rgb(56, 161, 105)"}/>
                <Chart name={"Soil moisture"} data={soilMoistureData} tickFormatter={(value) => `${value}%`} color={"rgb(51 136 186)"}/>
            </SimpleGrid >
        </VStack>
    );
};

export default WeatherChart;
