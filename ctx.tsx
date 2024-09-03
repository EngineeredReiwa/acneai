import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
    signIn: (prov: string, cred: any) => void;
    signOut: () => void;
    provider?: string | null;
    session?: string | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    provider: null,
    session: null,
    isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);

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

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");
    const [[isLoadingg, provider], setProvider] = useStorageState("provider");

    return (
        <AuthContext.Provider
            value={{
                signIn: (prov, cred) => {
                    setProvider(prov);
                    setSession(cred);
                },
                signOut: () => {
                    setProvider(null);
                    setSession(null);
                },
                provider,
                session,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
