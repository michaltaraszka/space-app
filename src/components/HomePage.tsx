import * as React from "react"
import {
    VStack,
} from "@chakra-ui/react"
import {HeaderComponent} from "./HeaderComponent";
import {MenuComponent} from "./MenuComponent";
import {DashboardComponent} from "./DashboardComponent";
import {useState} from "react";

const fieldTestData = [
    {
        "id": 1,
        "name": "Warsaw Field",
        "type": "wheat",
        "precipitationAmount": 62.15,
        "soilWaterContent": 0.11,
        "location": {
            "lat": 52.2297,
            "lon": 21.0122
        }
    },
    {
        "id": 2,
        "name": "Wołomin Field",
        "type": "corn",
        "precipitationAmount": 86.36,
        "soilWaterContent": 0.48,
        "location": {
            "lat": 52.4064,
            "lon": 21.0362
        }
    },
    {
        "id": 3,
        "name": "Piaseczno Field",
        "type": "soybean",
        "precipitationAmount": 91.40,
        "soilWaterContent": 0.21,
        "location": {
            "lat": 52.2344,
            "lon": 20.9204
        }
    },
    {
        "id": 4,
        "name": "Pruszków Field",
        "type": "barley",
        "precipitationAmount": 74.80,
        "soilWaterContent": 0.11,
        "location": {
            "lat": 52.1404,
            "lon": 20.7295
        }
    },
    {
        "id": 5,
        "name": "Nowy Dwór Mazowiecki Field",
        "type": "potato",
        "precipitationAmount": 32.99,
        "soilWaterContent": 0.41,
        "location": {
            "lat": 52.4064,
            "lon": 20.9330
        }
    },
    {
        "id": 6,
        "name": "Legionowo Field",
        "type": "rice",
        "precipitationAmount": 33.52,
        "soilWaterContent": 0.44,
        "location": {
            "lat": 52.5282,
            "lon": 21.0770
        }
    },
    {
        "id": 7,
        "name": "Otwock Field",
        "type": "cotton",
        "precipitationAmount": 29.49,
        "soilWaterContent": 0.14,
        "location": {
            "lat": 52.1917,
            "lon": 21.1180
        }
    }
];

export interface FieldLocation {
    lat: number;
    lon: number;
}

export interface FieldData {
    id: number;
    name: string;
    type: string;
    precipitationAmount: number; // in mm
    soilWaterContent: number; // fraction, e.g., 0.1 - 0.5
    location: FieldLocation;
}

export type Fields = FieldData[];

export const HomePage = () => {

    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [
        {id: 0, name: 'Dashboard', link: '/dashboard'},
        {id: 1, name: 'Knowledge Base', link: '/knowledge-base'},
        {id: 2, name: 'Additional sources', link: '/additional-source'},
    ];

    const onTabSelect = (tabId: number) => {
        setSelectedTab(tabId);
    };
    return <>
        <VStack spacing={4}>
            <HeaderComponent/>
            <MenuComponent tabs={tabs} onTabSelect={onTabSelect}/>
            {selectedTab === 0 &&
                <DashboardComponent fields={fieldTestData}/>
            }
        </VStack>
    </>
}
