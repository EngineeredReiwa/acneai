import { router } from "expo-router";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

import { useSession } from "../../ctx";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

import auth from "@react-native-firebase/auth";
import {
    appleAuth,
    AppleButton,
} from "@invertase/react-native-apple-authentication";

export default function SignUp() {
    const { signIn, signOut, session } = useSession();

    const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
    const [appleToken, setAppleToken] =
        useState<AppleAuthentication.AppleAuthenticationCredential | null>(
            null
        );
    console.log("hi");

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
            <Text
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
            </Text>

            <View style={styles.container}>
                <AppleButton
                    buttonStyle={AppleButton.Style.WHITE}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                        width: 160,
                        height: 45,
                    }}
                    onPress={() =>
                        onAppleButtonPress().then(() =>
                            console.log("Apple sign-in complete!")
                        )
                    }
                />
                <TouchableOpacity
                    style={{
                        width: 160,
                        height: 45,
                    }}
                    onPress={onAppleButtonPress}
                >
                    <Text>aaaa</Text>
                </TouchableOpacity>
                <Text>{credential}</Text>
            </View>
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
    container: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 200,
        height: 44,
    },
});
