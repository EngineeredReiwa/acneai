import { StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
    withSequence,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";

export function HelloWave({ fontSize = 28 }: { fontSize?: number }) {
    const rotationAnimation = useSharedValue(0);

    rotationAnimation.value = withRepeat(
        withSequence(
            withTiming(25, { duration: 150 }),
            withTiming(0, { duration: 150 })
        ),
        16 // Run the animation 4 times
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotationAnimation.value}deg` }],
    }));

    return (
        <Animated.View style={animatedStyle}>
            <ThemedText style={{ fontSize: fontSize, lineHeight: fontSize }}>
                👋
            </ThemedText>
        </Animated.View>
    );
}
