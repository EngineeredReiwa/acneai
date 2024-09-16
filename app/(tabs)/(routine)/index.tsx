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

export default function Index() {
    const { AMroutines, delAMRoutine, PMroutines, delPMRoutine } = useSession();

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
            <ScrollView style={{ width: "100%", flex: 1 }}>
                <SectionList
                    ListHeaderComponent={<Text>AM</Text>}
                    sections={visibleAMRoutines}
                    keyExtractor={(item, index) => item.productId}
                    renderItem={({ item, index, section }) => (
                        <Item
                            i={item}
                            o={() => delAMRoutine(section.category, index)}
                        />
                    )}
                    renderSectionHeader={({ section: { category } }) => (
                        <Text>{category}</Text>
                    )}
                    scrollEnabled={false}
                    ListEmptyComponent={<Text>Empty</Text>}
                />
                <SectionList
                    ListHeaderComponent={<Text>PM</Text>}
                    sections={visiblePMRoutines}
                    keyExtractor={(item, index) => index + item.productId}
                    renderItem={({ item, index, section }) => (
                        <Item
                            i={item}
                            o={() => delPMRoutine(section.category, index)}
                        />
                    )}
                    renderSectionHeader={({ section: { category } }) => (
                        <Text>{category}</Text>
                    )}
                    scrollEnabled={false}
                    ListEmptyComponent={<Text>Empty</Text>}
                />
            </ScrollView>
            <View style={styles.fixedIslandContainer}>
                <TouchableOpacity style={{ width: "80%" }} onPress={() => {}}>
                    <Text>送信</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        // 透明な灰色
                        backgroundColor: "rgba(200, 200,200, 0.9)",
                        padding: 15,
                        borderRadius: 10,
                    }}
                    onPress={() => {
                        router.push({
                            pathname: "./category",
                        });
                    }}
                >
                    <Ionicons name="add" size={24} color="black" />
                    <ThemedText
                        type="defaultSemiBold"
                        style={{ flex: 1, marginHorizontal: 10 }}
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
        borderWidth: 1,
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

    fixedIslandContainer: {
        // position: "absolute",
        // bottom: 0,
        // left: 0,
        // right: 0,
        padding: 10,
        borderTopWidth: 1,
        borderColor: "#F5F5F5", // ボーダー（オプション）
        alignItems: "center", // コンテンツを中央揃え
        justifyContent: "flex-start",
    },
});
