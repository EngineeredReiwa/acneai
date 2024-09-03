import { router } from "expo-router";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";

import { useSession } from "../../ctx";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { HelloWave } from "@/components/HelloWave";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Confirm() {
    const systemColor = useThemeColor({}, "system");
    const buttonColor = useThemeColor({}, "button");

    const [isChecked1, setChecked1] = useState(false);
    const [isChecked2, setChecked2] = useState(false);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={{ textAlign: "center" }}>
                    確認事項
                </ThemedText>
            </ThemedView>
            {/* 確認事項1つ目 */}
            <View
                style={{
                    backgroundColor: systemColor,
                    borderRadius: 30,
                    margin: 10,
                    padding: 20,
                    width: "90%",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        margin: 5,
                    }}
                >
                    <Ionicons size={45} name="cog-outline" />
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <ThemedText type={"subtitle"}>前提</ThemedText>
                    </View>
                </View>

                <ThemedText type={"default"}>
                    ・尋常性痤瘡に罹患した場合、自己判断（本アプリを含む）ではなく、医療機関を受診し、医師による指導のもと治療を進めることが、前提となります。
                    {"\n"}
                    ・その上で、本アプリは、Acneに関する悩みについて、AIと一緒に「日頃のスキンケアのルーティン」をもとに、考えを深めるためのアプリです。そのための切っ掛けをAIが出力します。
                </ThemedText>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        margin: 5,
                    }}
                >
                    <Checkbox
                        style={{ margin: 3 }}
                        value={isChecked1}
                        onValueChange={setChecked1}
                        color={isChecked1 ? "#4630EB" : undefined}
                    />
                    <ThemedText type={"defaultSemiBold"}>
                        確認しました。
                    </ThemedText>
                </View>
            </View>
            {/* 確認事項2つ目 */}
            <View
                style={{
                    backgroundColor: systemColor,
                    borderRadius: 30,
                    margin: 10,
                    padding: 20,
                    width: "90%",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        margin: 5,
                    }}
                >
                    <Ionicons size={45} name="alert-circle-outline" />
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <ThemedText type={"subtitle"}>お願い事項</ThemedText>
                    </View>
                </View>

                <ThemedText type={"default"}>
                    さまざまな美容科学を学習させ、検証しておりますが、あくまで、それらしい回答を生成する計算機（AI）です。ご自身で情報を取捨選択できる方のみ、お使いください。
                </ThemedText>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        margin: 5,
                    }}
                >
                    <Checkbox
                        style={{ margin: 3 }}
                        value={isChecked2}
                        onValueChange={setChecked2}
                        color={isChecked2 ? "#4630EB" : undefined}
                    />
                    <ThemedText type={"defaultSemiBold"}>
                        確認しました。
                    </ThemedText>
                </View>
            </View>
            {isChecked1 && isChecked2 ? (
                <TouchableOpacity
                    style={{
                        backgroundColor: buttonColor,
                        flexDirection: "row",
                        marginVertical: 5,
                        marginHorizontal: 15,
                        padding: 10,
                        borderRadius: 10,
                    }}
                    // Confirm画面に遷移
                    onPress={() => {
                        router.replace("/(welcome)/signup");
                    }}
                >
                    <ThemedText
                        style={{ flex: 1, textAlign: "center", color: "#fff" }}
                        type="subtitle"
                    >
                        はじめる
                    </ThemedText>
                </TouchableOpacity>
            ) : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 200,
        height: 44,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
