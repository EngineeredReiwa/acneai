import { Stack } from "expo-router";
import { RoutineProvider } from "@/context/RoutineContext";

export default function RoutineLayout() {
    return (
        <RoutineProvider>
            <Stack />
        </RoutineProvider>
    );
}
