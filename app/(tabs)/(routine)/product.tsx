import { useCallback, useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getProductsInBrands, Product } from "@/api/firestore";
import { useSession } from "@/context/RoutineContext";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function product() {
    const [products, setProducts] = useState<Product[]>([]);
    const { routine, setRoutine } = useSession();
    const [appIsReady, setAppIsReady] = useState(false);

    const textColor = useThemeColor({}, "text");

    useEffect(() => {
        const get = async () => {
            if (routine.category && routine.brand) {
                console.log(routine.category, routine.brand);
                try {
                    const thisBrands = await getProductsInBrands(
                        routine.category,
                        routine.brandId
                    );

                    console.log("Fetched products:", thisBrands);
                    if (thisBrands.length <= 0) router.back();
                    setProducts(thisBrands);
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
        if (appIsReady) await SplashScreen.hideAsync();
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
                    data={products}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.formItem}
                            onPress={() => {
                                setRoutine({
                                    ...routine,
                                    product: item.name,
                                    image: item.image,
                                    ingredients: item.ingredients,
                                    productId: item.id,
                                });
                                router.push({
                                    pathname: "./part",
                                });
                            }}
                        >
                            <View style={[styles.formItemList]}>
                                <ThemedText
                                    type="defaultSemiBold"
                                    style={styles.formItemText}
                                >
                                    {item.name}
                                </ThemedText>
                                <Ionicons
                                    name="chevron-forward-outline"
                                    size={24}
                                    color={textColor}
                                ></Ionicons>
                            </View>
                            <Image
                                source={{
                                    uri: item.image,
                                }}
                                style={{
                                    width: 200,
                                    height: 200,
                                    resizeMode: "contain",
                                }}
                            />
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
    formItem: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        borderColor: "#F5F5F5",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    formItemList: {
        flexDirection: "row",
        alignItems: "center",
    },
    formItemText: {
        flex: 1,
        textAlign: "left",
    },
});
