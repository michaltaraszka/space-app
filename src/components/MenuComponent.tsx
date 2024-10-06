import {Flex, Tab, TabList, Tabs} from "@chakra-ui/react";
import React from "react";

interface MenuComponentProps {
    tabs: {
        id: number,
        name: string,
        link: string
    }[],
    onTabSelect: (tabId: number) => void
}

interface TabComponentProps {
    id: number,
    name: string,
    link: string,
    onTabSelect: (tabId: number) => void
}

export const MenuComponent: React.FC<MenuComponentProps> = ({tabs, onTabSelect}) => {
    return (
        <Flex
            width="100%"
            borderWidth='1px'
            backgroundColor="whiteAlpha.900"
            boxShadow="md">
            <Tabs>
                <TabList>
                    {tabs.map((tab) => {
                        return <TabComponent key={tab.id} id={tab.id} name={tab.name} link={tab.link} onTabSelect={onTabSelect}/>
                    })}
                </TabList>
            </Tabs>
        </Flex>
    );
}

const TabComponent: React.FC<TabComponentProps> = ({id, name, link, onTabSelect}) => {
    return (
        <Tab p={4} onClick={() => {
            onTabSelect(id);
            console.log('Tab selected: ', id);
        }}>{name}</Tab>
    );
}