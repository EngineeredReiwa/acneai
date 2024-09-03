import { Redirect, Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useSession } from "../../ctx";

export default function TabLayout() {
    const { session, isLoading } = useSession();
    const colorScheme = useColorScheme();

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.

        // session状態を、Consoleに表示する
        console.log("session: ", session);

        return <Redirect href="/(welcome)" />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "home" : "home-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="newroutine"
                options={{
                    title: "New Routine",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "sparkles" : "sparkles-outline"}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="mypage"
                options={{
                    title: "My Page",
                    tabBarIcon: ({ color, focused }) => (
                        <TabBarIcon
                            name={focused ? "person" : "person-outline"}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
