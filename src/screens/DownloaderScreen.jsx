import {StyleSheet, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";


export default function DownloaderScreen({ navigation, route }) {

    const { slug_url } = route.params;

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <Text>{slug_url}</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',

        justifyContent: "center",
        alignItems: "center",
    },


});
