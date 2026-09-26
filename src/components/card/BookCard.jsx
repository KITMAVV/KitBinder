import {StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {Image} from "expo-image";

export default function BookCard({ book, onPress }) {
    const title = String(book?.rus_name || book?.name || "");
    const imageUri = book.cover?.default || book.cover?.thumbnail;

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}
        >
            {imageUri ? (
                <Image
                    style={styles.image}
                    source={{
                        uri: imageUri,
                        headers: {
                            Referer: "https://ranobelib.me/",
                        },
                    }}
                    contentFit="cover"
                    cachePolicy="memory-disk"
                    onError={(error) => {
                        console.log("IMAGE ERROR:", imageUri);
                        console.log(error);
                    }}
                />
            ) : (
                <View style={styles.imagePlaceholder} />
            )}

            <View style={styles.infoContainer}>

                <Text
                    style={styles.title}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                >
                    {title}
                </Text>

                <View style={styles.info}>
                    {book.rating?.averageFormated ? (
                        <Text style={styles.infoText}>
                            ⭐ {String(book.rating.averageFormated)}
                        </Text>
                    ) : null}


                    {book.releaseDateString ? (
                        <Text style={styles.infoText}>
                            {String(book.releaseDateString)}
                        </Text>
                    ) : null}


                </View>

                <View style={styles.subInfo}>

                    {book.status?.label ? (
                        <Text style={styles.status}>
                            {String(book.status.label)}
                        </Text>
                    ) : null}

                    {book.type?.label ? (
                        <Text style={styles.infoText}>
                            {String(book.type.label)}
                        </Text>
                    ) : null}

                </View>

            </View>


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#efefef",
        width: 180,
        overflow: "hidden",


        boxShadow: "5px 3px 4px rgba(0,0,0,0.03)",

    },

    image: {
        width: "100%",
        height: 250,

        marginBottom: 8,
    },

    imagePlaceholder: {
        width: "100%",
        height: 210,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#676767",
    },

    title: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: "600",
        minHeight: 36,
        marginBottom: 6,
    },

    infoContainer: {
        padding: 8,
        paddingTop: 0,

    },

    info: {
        flexDirection: "row",
        gap: 15,
        justifyContent: "flex-end",
    },

    subInfo: {
        flexDirection: "row",
        justifyContent: "space-between"

    },

    infoText: {
        fontSize: 12,
        color: "#555",
    },


    status: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#404040",
    },
});
