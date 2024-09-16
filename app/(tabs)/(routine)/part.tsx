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
import { useSession, partList } from "@/context/RoutineContext";

export default function part() {
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
                    data={partList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={
                                routine.part === item
                                    ? [
                                          styles.formItemList,
                                          {
                                              backgroundColor: bgColor,
                                          },
                                      ]
                                    : styles.formItemList
                            }
                            onPress={() => {
                                setRoutine({ ...routine, part: item });
                                router.push({
                                    pathname: "./dayUsage",
                                });
                            }}
                        >
                            <ThemedText
                                type="defaultSemiBold"
                                style={
                                    routine.part === item
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
