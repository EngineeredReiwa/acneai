import {
    StyleSheet,
    Image,
    SafeAreaView,
    ImageBackground,
    View,
    Text,
    TouchableOpacity,
    Touchable,
    ScrollView,
    FlatList,
    SectionList,
} from "react-native";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { ThemedText } from "@/components/ThemedText";
import { Routine as RoutineType, useSession } from "@/context/RoutineContext";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Index() {
    const { AMroutines, delAMRoutine, PMroutines, delPMRoutine } = useSession();
    const btColor = useThemeColor({}, "button");

    // routines配列を、表示するために整形
    // routines[i].dataが空の場合、そのroutines[i]を削除
    const visibleAMRoutines = AMroutines.map((r) => {
        if (r.data.length === 0) {
            return null;
        }
        return r;
    }).filter((r) => r !== null);

    const visiblePMRoutines = PMroutines.map((r) => {
        if (r.data.length === 0) {
            return null;
        }
        return r;
    }).filter((r) => r !== null);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <SectionList
                    ListHeaderComponent={
                        <ThemedText type="subtitle">AM</ThemedText>
                    }
                    sections={visibleAMRoutines}
                    keyExtractor={(item, index) => item.productId}
                    renderItem={({ item, index, section }) => (
                        <Item
                            i={item}
                            o={() => delAMRoutine(section.category, index)}
                        />
                    )}
                    renderSectionHeader={({ section: { category } }) => (
                        <ThemedText type="subtitle">{category}</ThemedText>
                    )}
                    scrollEnabled={false}
                    ListEmptyComponent={
                        <ThemedText type="subtitle">
                            ルーティンが選択されていません。
                        </ThemedText>
                    }
                />
                <SectionList
                    ListHeaderComponent={
                        <ThemedText type="subtitle">PM</ThemedText>
                    }
                    sections={visiblePMRoutines}
                    keyExtractor={(item, index) => index + item.productId}
                    renderItem={({ item, index, section }) => (
                        <Item
                            i={item}
                            o={() => delPMRoutine(section.category, index)}
                        />
                    )}
                    renderSectionHeader={({ section: { category } }) => (
                        <ThemedText type="subtitle" style={{ color: "white" }}>
                            {category}
                        </ThemedText>
                    )}
                    scrollEnabled={false}
                    ListEmptyComponent={
                        <ThemedText type="subtitle">
                            ルーティンが選択されていません。
                        </ThemedText>
                    }
                />
            </ScrollView>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={[styles.sendButton, { borderColor: btColor }]}
                    onPress={() => {}}
                >
                    <Ionicons name="send" size={28} color={btColor} />
                    <ThemedText
                        type="defaultSemiBold"
                        style={{ color: btColor }}
                    >
                        ルーティンを解析
                    </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.addButton, { backgroundColor: btColor }]}
                    onPress={() => {
                        router.push({
                            pathname: "./category",
                        });
                    }}
                >
                    <Ionicons name="add-circle" size={28} color="white" />
                    <ThemedText
                        type="defaultSemiBold"
                        style={{ color: "white" }}
                    >
                        ルーティンを追加
                    </ThemedText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const Item = ({ i, o }: { i: RoutineType; o: () => void }) => {
    return (
        <View style={styles.item}>
            <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={o}>
                {/* ゴミ箱のアイコン */}
                <Ionicons name="close" size={24} color="gray" onPress={o} />
            </TouchableOpacity>

            <View style={styles.itemR}>
                <ThemedText type="defaultSemiBold" style={styles.formItemText}>
                    {i.product}
                </ThemedText>
                <Image
                    source={{
                        uri: i.image,
                    }}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    image: {
        paddingTop: 100,
        padding: 10,
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
    },

    title: {
        paddingHorizontal: 30,
        flexDirection: "row",
        alignItems: "center",
    },
    formItem: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "rgba(255, 255,255, 0.9)",
        borderColor: "#F5F5F5",
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    item: {
        backgroundColor: "rgba(255, 255,255, 0.9)",
        borderColor: "#F5F5F5",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    itemR: {
        flexDirection: "row",
        alignItems: "center",
    },
    formItemText: {
        flex: 1,
        textAlign: "left",
    },

    buttons: {
        height: 75,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    sendButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        // 透明な灰色
        backgroundColor: "white",
    },
    addButton: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        padding: 5,
        borderRadius: 10,
    },
});
