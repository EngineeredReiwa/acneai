import { useCallback, useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getBrandsInCategory, Brand } from "@/api/firestore";
import { useSession } from "@/context/RoutineContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function brand() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const { routine, setRoutine } = useSession();
    const [appIsReady, setAppIsReady] = useState(false);
    const bgColor = "#073763";
    const textColor = useThemeColor({}, "text");

    useEffect(() => {
        const get = async () => {
            if (routine.category) {
                try {
                    const thisBrands = await getBrandsInCategory(
                        routine.category
                    );
                    console.log(thisBrands);
                    if (thisBrands.length <= 0) router.back();
                    console.log("Fetched brands:", thisBrands);
                    setBrands(thisBrands);
                } catch (error) {
                    alert("ブランドの取得に失敗しました。");
                    console.log(error);
                    router.back();
                } finally {
                    setAppIsReady(true);
                }
            }
        };
        get();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
            onLayout={onLayoutRootView}
        >
            <ScrollView style={{ width: "90%" }}>
                <FlatList
                    style={{ borderRadius: 10 }}
                    data={brands}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={
                                routine.brand === item.name
                                    ? [
                                          styles.formItemList,
                                          {
                                              backgroundColor: bgColor,
                                          },
                                      ]
                                    : styles.formItemList
                            }
                            onPress={() => {
                                setRoutine({
                                    ...routine,
                                    brand: item.name,
                                    brandId: item.id,
                                });
                                router.push({
                                    pathname: "./product",
                                });
                            }}
                        >
                            <ThemedText
                                type="defaultSemiBold"
                                style={
                                    routine.brand === item.name
                                        ? [
                                              styles.formItemText,
                                              { color: "white" },
                                          ]
                                        : styles.formItemText
                                }
                            >
                                {item.name}
                            </ThemedText>
                            <Ionicons
                                name="chevron-forward-outline"
                                size={24}
                                color={textColor}
                            ></Ionicons>
                        </TouchableOpacity>
                    )}
                    scrollEnabled={false}
                />
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    formItemList: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderColor: "#FFF",
        borderWidth: 1,
        padding: 5,
        height: 45,
    },
    formItemText: {
        flex: 1,
        textAlign: "left",
    },
});
