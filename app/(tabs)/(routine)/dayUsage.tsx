import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useSession, dayUsageList } from "@/context/RoutineContext";

export default function dayUsage() {
    const { routine, setRoutine } = useSession();
    const textColor = useThemeColor({}, "text");
    const bgColor = "#073763";
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <ScrollView style={{ width: "90%" }}>
                <FlatList
                    style={{ borderRadius: 10 }}
                    data={dayUsageList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={
                                routine.dayUsage === item
                                    ? [
                                          styles.formItemList,
                                          {
                                              backgroundColor: bgColor,
                                          },
                                      ]
                                    : styles.formItemList
                            }
                            onPress={() => {
                                setRoutine({ ...routine, dayUsage: item });
                                router.push({
                                    pathname: "./weekUsage",
                                });
                            }}
                        >
                            <ThemedText
                                type="defaultSemiBold"
                                style={
                                    routine.dayUsage === item
                                        ? [
                                              styles.formItemText,
                                              { color: "white" },
                                          ]
                                        : styles.formItemText
                                }
                            >
                                {item}
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
