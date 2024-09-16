import auth from "@react-native-firebase/auth";

import { appleAuth } from "@invertase/react-native-apple-authentication";

export const onAppleButtonPress = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth
        .performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
            // See: https://github.com/invertase/react-native-apple-authentication#faqs
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        })
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw new Error("Apple Sign-In failed - ", error);
        });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse?.identityToken) {
        throw new Error("Apple Sign-In failed - no identify token returned");
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
    );

    // Apple Sign-In is complete
    console.log(`Apple Sign-In complete!`, appleCredential);

    // Sign the user in with the credential
    const userCredential = await auth().signInWithCredential(appleCredential);
    console.log(userCredential);
    // Ensure the user is signed in
    if (!userCredential?.user?.uid) throw new Error("User ID not found");
};
