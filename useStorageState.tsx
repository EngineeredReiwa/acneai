import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

// Webストレージやセキュアストレージの値を取り出したり、設定したりする際に、
// 非同期に値を扱うために、useAsyncState関数を定義

// useAsyncState関数は、useStateの代わりとして、このように使用する
// const [state, setState] = useAsyncState<string>();
// この例では、stateは、[boolean, string | null]型の値を持つ

// useAsyncStateの型関数として、UseStateHook型を定義
// この型は、useStateと同じで、[boolean, T | null]型の値を返す。

// 最終的にctx.tsxで使われる時、
// stateにあたる[boolean, T | null]は、booleanがisLoadingを示し、T | nullがsessionの内容を示す
// setStateにあたる(value:T|null)=>voidは、セッションの値を更新する関数を示す
type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
    initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
    // React.useReducerは、useStateの代わりとして使われる
    return React.useReducer(
        (
            state: [boolean, T | null],
            action: T | null = null
        ): [boolean, T | null] => [false, action],
        initialValue
    ) as UseStateHook<T>;
}

// セキュアストレージやWebストレージに値を設定するための関数
// 引数keyには、保存する値のキーを指定し、valueには、保存する値を指定する
// 例えば、Apple Authenticationの認証情報を保存する場合、
// setStorageItemAsync("apple-credentials", JSON.stringify(credential));
export async function setStorageItemAsync(key: string, value: string | null) {
    if (Platform.OS === "web") {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.error("Local storage is unavailable:", e);
        }
    } else {
        if (value == null) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }
}

// useStorageState関数は、引数keyに指定された最新の値（state）を取り出して、
// セキュアストレージやWebストレージに保存するための関数（setState）を返す
// stateの変化を検知して、セキュアストレージやWebストレージに保存する

// 例えば、Apple Authenticationの認証情報を保存する場合、
// const [appleToken, setAppleToken] = useStorageState("apple-credentials");
// appleTokenには、Apple Authenticationの最新の認証情報が保存され、
// setAppleTokenを使って、最新の認証情報を更新できる

// この関数が、最終的にctx.tsxで使用される
export function useStorageState(key: string): UseStateHook<string> {
    // Public
    const [state, setState] = useAsyncState<string>();

    // Get
    React.useEffect(() => {
        if (Platform.OS === "web") {
            try {
                if (typeof localStorage !== "undefined") {
                    setState(localStorage.getItem(key));
                }
            } catch (e) {
                console.error("Local storage is unavailable:", e);
            }
        } else {
            SecureStore.getItemAsync(key).then((value) => {
                setState(value);
            });
        }
    }, [key]);

    // Set
    const setValue = React.useCallback(
        (value: string | null) => {
            setState(value);
            setStorageItemAsync(key, value);
        },
        [key]
    );

    return [state, setValue];
}
