import { router } from "expo-router";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Platform,
} from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

import { useSession } from "../../ctx";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { HelloWave } from "@/components/HelloWave";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AppleButton } from "@invertase/react-native-apple-authentication";
import { GoogleSigninButton } from "react-native-google-signin";
import { onAppleButtonPress } from "../api/apple";
import { onGoogleButtonPress } from "../api/google";

export default function Welcome() {
    const { signIn, signOut } = useSession();
    const color = useThemeColor({}, "button");

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" style={{ textAlign: "center" }}>
                    Welcome!{"\n"}Acne AI
                </ThemedText>
                <HelloWave fontSize={40} />
            </ThemedView>
            <Image
                source={require("../../assets/images/Ikemen.png")}
                // 画像全体を途切れないように表示する
                style={{
                    width: 400,
                    height: 400,
                    resizeMode: "contain",
                }}
            />
            <ThemedView style={styles.titleContainer}></ThemedView>
            <TouchableOpacity
                style={{
                    backgroundColor: color,
                    flexDirection: "row",
                    marginVertical: 5,
                    marginHorizontal: 15,
                    padding: 10,
                    borderRadius: 10,
                }}
                // Confirm画面に遷移
                onPress={() => {
                    router.replace("/(welcome)/confirm");
                }}
            >
                <ThemedText
                    style={{ flex: 1, textAlign: "center", color: "#fff" }}
                    type="subtitle"
                >
                    はじめる
                </ThemedText>
            </TouchableOpacity>
            {/* <TouchableOpacity
                style={{
                    borderColor: color,
                    borderWidth: 1,
                    flexDirection: "row",
                    marginVertical: 5,
                    marginHorizontal: 15,
                    padding: 10,
                    borderRadius: 10,
                }}
            >
                <ThemedText
                    style={{ flex: 1, textAlign: "center", color: color }}
                    type="subtitle"
                >
                    ログイン
                </ThemedText>
            </TouchableOpacity> */}
            {/* {Platform.OS === "ios" && ( */}
            <AppleButton
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                buttonText="Sign in with Apple"
                style={{
                    width: 300,
                    height: 45,
                }}
                onPress={() => {
                    onAppleButtonPress();
                }}
            />
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
