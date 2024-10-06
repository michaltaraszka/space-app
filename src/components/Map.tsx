import {MapContainer, TileLayer, Marker, useMap} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import React, {useEffect} from "react";
import {VStack} from "@chakra-ui/react";
import {PanelHeaderComponent} from "./PanelHeaderComponent";
import {ViewIcon} from "@chakra-ui/icons";
import {FieldData} from "./HomePage";

interface MapProps {
    field: FieldData
}

const MapUpdater: React.FC<MapProps> = ({field}) => {
    const map = useMap();

    useEffect(() => {
        map.setView([field.location.lat, field.location.lon], 13);
    }, [field.location.lat, field.location.lon, map]);
    return null;
}

export const Map: React.FC<MapProps> = ({field}) => {
    return (
        <VStack>
            <PanelHeaderComponent text={"Map"} icon={<ViewIcon/>}/>
        <MapContainer
            center={[field.location.lat, field.location.lon]}
            zoom={13}
            style={{width: '100%', height: `500px`}}
        >
            <MapUpdater field={field}></MapUpdater>
            <Marker position={[field.location.lat, field.location.lon]} title={field.name}/>
           <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </MapContainer>
        </VStack>
    )
}
