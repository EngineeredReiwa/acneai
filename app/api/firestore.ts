import firestore from "@react-native-firebase/firestore";

export const saveUserData = async (uid: string, userData: any) => {
    await firestore()
        .collection("users")
        .doc(uid)
        .set(userData)
        .then(() => {
            console.log("User data saved successfully");
        })
        .catch((error) => {
            alert("ユーザーデータの保存に失敗しました。");
            throw new Error("Error adding user: ", error);
        });
};
