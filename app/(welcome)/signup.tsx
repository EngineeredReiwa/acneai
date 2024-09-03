import { router } from "expo-router";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";

import { useSession } from "../../ctx";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export default function SignUp() {
    const { signIn, signOut, session } = useSession();

    const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
    const [appleToken, setAppleToken] =
        useState<AppleAuthentication.AppleAuthenticationCredential | null>(
            null
        );
    console.log("hi");

    useEffect(() => {
        const checkAvailable = async () => {
            const isAvailable = await AppleAuthentication.isAvailableAsync();
            setAppleAuthAvailable(isAvailable);

            if (isAvailable) {
                const credentialJson = await SecureStore.getItemAsync(
                    "apple-credentials"
                );
                if (credentialJson) setAppleToken(JSON.parse(credentialJson));
            }
        };
        checkAvailable();
    }, []);

    const login = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            console.log(credential);
            // if (credential) setAppleToken(credential);
            // SecureStore.setItemAsync(
            //     "apple-credentials",
            //     JSON.stringify(credential)
            // );
            signIn("apple-credentials", credential);
            router.replace("/(tabs)");
        } catch (e) {
            console.log(e);
        }
    };

    const getCredentialState = async () => {
        if (!appleToken) return;
        const credentialState =
            await AppleAuthentication.getCredentialStateAsync(appleToken.user);
        console.log(credentialState);
    };

    const logout = async () => {
        SecureStore.deleteItemAsync("apple-credentials");
        setAppleToken(null);
    };

    const refresh = async () => {
        if (appleToken) {
            const result = await AppleAuthentication.refreshAsync({
                user: appleToken.user,
            });
            console.log(result);
            setAppleToken(result);
            SecureStore.setItemAsync(
                "apple-credentials",
                JSON.stringify(result)
            );
        }
    };

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
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={
                        AppleAuthentication.AppleAuthenticationButtonType
                            .SIGN_IN
                    }
                    buttonStyle={
                        AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
                    }
                    cornerRadius={5}
                    style={styles.button}
                    onPress={async () => {
                        try {
                            login();
                        } catch (e: any) {
                            if (e.code === "ERR_REQUEST_CANCELED") {
                                // handle that the user canceled the sign-in flow
                            } else {
                                // handle other errors
                            }
                        }
                    }}
                />
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
