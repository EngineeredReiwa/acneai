import { router } from "expo-router";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Switch,
    TextInput,
    FlatList,
    Modal,
} from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

import { useSession } from "../../ctx";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";

import { useEffect, useState } from "react";

import auth from "@react-native-firebase/auth";
import {
    appleAuth,
    AppleButton,
} from "@invertase/react-native-apple-authentication";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
    const { signIn, signOut, session } = useSession();

    const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
    const [appleToken, setAppleToken] =
        useState<AppleAuthentication.AppleAuthenticationCredential | null>(
            null
        );
    console.log("hi");

    const [openGender, setOpenGender] = useState<boolean>(false);
    const [gender, setGender] = useState<"男性" | "女性">();
    const [genders, setGenders] = useState([
        { label: "男性", value: "男性" },
        { label: "女性", value: "女性" },
    ]);
    const [birthYear, setBirthYear] = useState<number>();
    const [birthYearError, setBirthYearError] = useState<string>("");

    const handleBirthYearChange = (text) => {
        const currentYear = new Date().getFullYear();
        if (/^\d{0,4}$/.test(text)) {
            const year = parseInt(text, 10);
            if (year >= 1900 && year <= currentYear - 18) {
                setBirthYearError("");
            } else {
                setBirthYearError(
                    `Please enter a year between 1900 and ${
                        currentYear - 18
                    }. 登録できるのは18歳以上のみです。`
                );
            }
        } else {
            setBirthYearError("Please enter a valid 4-digit year.");
        }
    };

    const [nickname, setNickname] = useState<string>("");
    const [openSkinType, setOpenSkinType] = useState<boolean>(false);
    const [skinType, setSkinType] = useState("");
    const [skinTypes, setSkinTypes] = useState([
        { label: "Oily", value: "Oily" },
        { label: "Dry", value: "Dry" },
        { label: "Normal", value: "Normal" },
        { label: "Combination", value: "Combination" },
    ]);

    const [openSkinConcern, setOpenSkinConcern] = useState<boolean>(false);
    const [skinConcern, setSkinConcern] = useState("");
    const [skinConcerns, setSkinConcerns] = useState([
        { label: "Acne1", value: "Acne1" },
        { label: "Acne2", value: "Acne2" },
        { label: "Acne3", value: "Acne3" },
        { label: "Acne4", value: "Acne4" },
        { label: "Acne5", value: "Acne5" },
    ]);

    const [zI, setZI] = useState<number>(1);
    useEffect(() => {
        if (openGender || openSkinConcern || openSkinType) {
            setZI(1000);
        } else {
            setZI(1);
        }
    }, [openGender, openSkinConcern, openSkinType]);

    const [credential, setCredential] = useState<any>("testtest");

    async function onAppleButtonPress() {
        // Start the sign-in request
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
            // See: https://github.com/invertase/react-native-apple-authentication#faqs
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });

        // Ensure Apple returned a user identityToken
        if (!appleAuthRequestResponse.identityToken) {
            throw new Error(
                "Apple Sign-In failed - no identify token returned"
            );
        }

        // Create a Firebase credential from the response
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(
            identityToken,
            nonce
        );

        // Sign the user in with the credential
        return auth().signInWithCredential(appleCredential);
    }

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
                    アカウント登録
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.formContainer}>
                <ThemedView style={[styles.formNameContainer, { zIndex: zI }]}>
                    <ThemedText type="mini" style={styles.formName}>
                        性別
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.formItemContainer}>
                    <DropDownPicker
                        containerStyle={styles.formItemPickerContainer}
                        style={styles.formItemPicker}
                        placeholder="選択してください"
                        open={openGender}
                        value={gender}
                        items={genders}
                        setOpen={setOpenGender}
                        setValue={setGender}
                        setItems={setGenders}
                    />
                </ThemedView>
                <ThemedView style={[styles.formNameContainer, { zIndex: zI }]}>
                    <ThemedText type="mini" style={styles.formName}>
                        誕生年
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.formItemContainer}>
                    <TextInput
                        style={styles.formItemInput}
                        value={birthYear ? birthYear.toString() : ""}
                        onChangeText={(text) => setBirthYear(text)}
                        placeholder="YYYY"
                        keyboardType="numeric"
                        maxLength={4}
                        returnKeyType="done"
                    />
                    {setBirthYearError ? (
                        <Text style={styles.errorText}>
                            {setBirthYearError}
                        </Text>
                    ) : null}
                </ThemedView>

                <ThemedView style={[styles.formNameContainer, { zIndex: zI }]}>
                    <ThemedText type="mini" style={styles.formName}>
                        ニックネーム
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.formItemContainer}>
                    <TextInput
                        style={styles.formItemInput}
                        value={nickname}
                        onChangeText={(text) => setNickname(text)}
                        placeholder="ニックネームを入力してください"
                        maxLength={20}
                        returnKeyType="done"
                    />
                </ThemedView>

                <ThemedView style={[styles.formNameContainer, { zIndex: zI }]}>
                    <ThemedText type="mini" style={styles.formName}>
                        肌の悩み
                    </ThemedText>
                </ThemedView>
                <ThemedView
                    style={[
                        styles.formItemContainer,
                        { zIndex: openSkinConcern ? 1000 : 1 },
                    ]}
                >
                    <DropDownPicker
                        containerStyle={styles.formItemPickerContainer}
                        style={styles.formItemPicker}
                        placeholder="選択してください"
                        open={openSkinConcern}
                        value={skinConcern}
                        items={skinConcerns}
                        setOpen={setOpenSkinConcern}
                        setValue={setSkinConcern}
                        setItems={setSkinConcerns}
                    />
                </ThemedView>

                <ThemedView style={[styles.formNameContainer, { zIndex: zI }]}>
                    <ThemedText type="mini" style={styles.formName}>
                        肌タイプ
                    </ThemedText>
                </ThemedView>
                <ThemedView
                    style={[
                        styles.formItemContainer,
                        { zIndex: openSkinType ? 1000 : 1 },
                    ]}
                >
                    <DropDownPicker
                        containerStyle={styles.formItemPickerContainer}
                        style={styles.formItemPicker}
                        placeholder="選択してください"
                        open={openSkinType}
                        value={skinType}
                        items={skinTypes}
                        setOpen={setOpenSkinType}
                        setValue={setSkinType}
                        setItems={setSkinTypes}
                    />
                </ThemedView>
                <View style={styles.signupButton}>
                    <AppleButton
                        buttonStyle={AppleButton.Style.BLACK}
                        buttonType={AppleButton.Type.SIGN_IN}
                        style={{
                            width: 300,
                            height: 45,
                        }}
                        onPress={() =>
                            onAppleButtonPress().then(() =>
                                console.log("Apple sign-in complete!")
                            )
                        }
                    />
                    {/* <Text>{credential}</Text> */}
                </View>
            </ThemedView>
            {/* <Text
                onPress={() => {
                    signIn("apple-credentials", appleToken);
                    router.replace("/(tabs)");
                }}
            >
                Sign In
            </Text>

            <Text
                onPress={() => {
                    signOut();
                    // Navigate after signing in. You may want to tweak this to ensure sign-in is
                    // successful before navigating.
                    router.replace("/(tabs)");
                }}
            >
                Sign Out
            </Text> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    formContainer: {
        flex: 1,
        zIndex: 3000,
        maxHeight: 550,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#F2F1F6",
        borderRadius: 10,
        margin: 20,
        padding: 10,
    },
    // それぞれの行の内、項目名のスタイル
    formNameContainer: {
        flex: 1,
        maxHeight: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
    },
    formName: {
        flex: 1,
        textAlign: "left",
    },
    // それぞれの行の内、アイテムのスタイル
    formItemContainer: {
        flex: 1,
        maxHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "transparent",
    },
    formItemPickerContainer: {
        alignItems: "center",
        padding: 0,
    },
    formItemPicker: {
        borderColor: "#fff",
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    formItemInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    signupButton: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 200,
        height: 44,
    },
    errorText: {
        color: "red",
        marginTop: 5,
    },
});
