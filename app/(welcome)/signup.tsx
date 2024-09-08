import {
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    View,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SignUp() {
    const buttonColor = useThemeColor({}, "button");
    const systemColor = useThemeColor({}, "system");

    const genderList = ["男性", "女性", "その他"];
    const [gender, setGender] = useState("");

    const ageList = ["10代", "20代", "30代", "40代", "50代", "60代以上"];
    const [age, setAge] = useState("");

    const skinTypeList = ["乾燥肌", "普通肌", "脂性肌", "混合肌"];
    const [skinType, setSkinType] = useState("");

    const skinTroubleList = ["ニキビ"];
    const [skinTrouble, setSkinTrouble] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ width: "100%", paddingHorizontal: 30 }}>
                <ThemedText type="title" style={styles.title}>
                    アカウント登録
                </ThemedText>
                <ThemedText type="subtitle">性別</ThemedText>
                <ArrangeFlatList
                    data={genderList}
                    thisItem={gender}
                    setItem={setGender}
                />
                <ThemedText type="subtitle">年代</ThemedText>
                <ArrangeFlatList
                    data={ageList}
                    thisItem={age}
                    setItem={setAge}
                />
                <ThemedText type="subtitle">肌タイプ</ThemedText>
                <ArrangeFlatList
                    data={skinTypeList}
                    thisItem={skinType}
                    setItem={setSkinType}
                />
                <ThemedText type="subtitle">肌の悩み</ThemedText>
                <ArrangeFlatList
                    data={skinTroubleList}
                    thisItem={skinTrouble}
                    setItem={setSkinTrouble}
                />
                {/* 調整用の空白 */}
                <View style={{ height: 200 }}></View>
            </ScrollView>
            {/* 画面下に固定された島 */}
            <View style={styles.fixedIslandContainer}>
                {/* <Text>{errorText}</Text> */}
                <AppleButton
                    buttonStyle={AppleButton.Style.BLACK}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                        width: 300,
                        height: 45,
                    }}
                    onPress={() => {}}
                />
            </View>
        </SafeAreaView>
    );
}
interface ArrangeFlatListProps {
    data: any[];
    thisItem: any;
    setItem: (item: any) => void;
}

const ArrangeFlatList: React.FC<ArrangeFlatListProps> = ({
    data,
    thisItem,
    setItem,
}) => {
    return (
        <FlatList
            style={{ borderRadius: 10 }}
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[
                        styles.formItemList,
                        {
                            backgroundColor:
                                item === thisItem ? "#073763" : "#F5F5F5",
                        },
                    ]}
                    onPress={() => setItem(item)}
                >
                    <ThemedText
                        type="defaultSemiBold"
                        style={[
                            styles.formItemText,
                            {
                                color: item === thisItem ? "#FFF" : "#000",
                            },
                        ]}
                    >
                        {item}
                    </ThemedText>
                </TouchableOpacity>
            )}
            scrollEnabled={false}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        textAlign: "center",
        margin: 20,
    },
    formItemList: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderColor: "#FFF",
        borderWidth: 1,
        padding: 5,
        height: 50,
    },
    formItemText: {
        flex: 1,
        textAlign: "center",
    },
    formItemInput: {
        height: 50,
        backgroundColor: "#F5F5F5",
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: "600",
        textAlign: "center",
    },
    fixedIslandContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff", // 背景色
        padding: 25,
        paddingBottom: 75,
        borderTopWidth: 1,
        borderColor: "#F5F5F5", // ボーダー（オプション）
        alignItems: "center", // コンテンツを中央揃え
        justifyContent: "flex-start",
    },
});
