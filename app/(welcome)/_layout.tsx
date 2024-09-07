import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, router, Stack } from "expo-router";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function WelcomeLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack
                screenOptions={{
                    headerShown: true,
                    headerTitle: "",
                    headerTransparent: true,
                }}
            >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen
                    name="confirm"
                    options={{
                        headerLeft: () => (
                            <Link href="/(welcome)">
                                <Ionicons
                                    name="chevron-back-outline"
                                    size={24}
                                    color="black"
                                />
                            </Link>
                        ),
                    }}
                />
                <Stack.Screen
                    name="signup"
                    options={{
                        headerLeft: () => (
                            <Link href="/(welcome)">
                                <Ionicons
                                    name="chevron-back-outline"
                                    size={24}
                                    color="black"
                                />
                            </Link>
                        ),
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
