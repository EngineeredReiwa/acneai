import {
    useContext,
    createContext,
    type PropsWithChildren,
    useState,
    useEffect,
} from "react";
import { useStorageState } from "@/context/useStorageState";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

const UserContext = createContext<{
    user: FirebaseAuthTypes.User | null;
    setUser: (user: FirebaseAuthTypes.User | null) => void;
    loading: boolean;
}>({
    user: null,
    setUser: () => null,
    loading: true,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(UserContext);

    // If the hook is used outside of the SessionProvider, throw an error.
    if (process.env.NODE_ENV !== "production") {
        if (!value) {
            throw new Error(
                "useSession must be wrapped in a <SessionProvider />"
            );
        }
    }

    return value;
}

export function UserProvider({ children }: PropsWithChildren) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    return (
        <UserContext.Provider
            value={{
                user: user,
                setUser: setUser,
                loading: loading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
