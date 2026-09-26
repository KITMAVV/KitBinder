import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {KeyboardStickyView} from "react-native-keyboard-controller";

import searchBooks from "../api/ranobelib/searchBooks";
import getBook from "../api/ranobelib/getBook";

import {useEffect, useState} from "react";

import BookCard from "../components/card/BookCard";
import BookDetailsModal from "../components/book/BookDetailsModal";

export default function Home({navigation}) {

    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const [isBookModalVisible, setIsBookModalVisible] = useState(false);
    const [bookDetails, setBookDetails] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleSearch = () => { loadBooks(query); };

    useEffect(() => {
        loadBooks("")
    }, []);

    async function loadBooks(searchQuery) {
        try {
            setLoading(true);

            const result = await searchBooks(searchQuery);
            setBooks(result);
        } catch (error) {
            console.log(error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    }

    async function loadBookDetails(slug_url) {
        try {
            const result = await getBook(slug_url);
            setBookDetails(result);
        } catch (error) {
            console.log(error);
            setBooks([]);
        }


    }


    async function handleOpenBookDetails(book_slug) {
        await loadBookDetails(book_slug);
        setIsBookModalVisible(true);
    }

    async function handleOpenDownloader(slug_url) {
        console.log('Opening Downloader with Slug-URL:', slug_url);
        navigation.navigate("DownloaderScreen", {
            slug_url,
        });
    }

    return (
        <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
            <StatusBar style="auto" />

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>KitBinder | RenobeLIB</Text>
                </View>

                {loading ? (
                    <View style={styles.listEmptyWrap}>
                        <ActivityIndicator size="large" />
                    </View>
                ) :books.length === 0 ? (
                    <View style={styles.listEmptyWrap}>
                        <Text>ㄟ( ▔, ▔ )ㄏ</Text>
                    </View>
                ) : (
                <FlatList
                    numColumns={2}
                    style={styles.list}
                    contentContainerStyle={styles.list_content}
                    columnWrapperStyle={styles.row}
                    data={books}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (<BookCard book={item} onPress={() => handleOpenBookDetails(item.slug_url)}/>)}

                />
                    )}
            <BookDetailsModal
                visible={isBookModalVisible}
                onClose={() => setIsBookModalVisible(false)}
                book={bookDetails}
            />

            <KeyboardStickyView
                offset={{
                    closed: -32,
                    opened: -8,
                }}
                style={styles.actionsSticky}
            >
                <View style={styles.actionsContent}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type to search..."
                        onChangeText={setQuery}
                        onSubmitEditing={handleSearch}
                        returnKeyType="search"
                    />

                    <Pressable style={({ pressed }) => [styles.btn, pressed && styles.btnPressed,]} onPress={handleSearch}>
                        <Text style={styles.btnText}>Search</Text>
                    </Pressable>
                </View>
            </KeyboardStickyView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb',
    },
    titleContainer: {
        position: "absolute",
        top: 40,
        left: 5,
        zIndex: 1,

        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 18,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },
    title: {
        fontSize: 25,
        fontWeight: 700,

    },
    list: {
        flex: 1,
        paddingTop: 55,
    },
    list_content: {
        padding: 5,

    },
    listEmptyWrap:{
        flex: 1,
        backgroundColor: "#ededed",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        justifyContent: "space-between",
        marginBottom: 12,
    },
    actionsSticky: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    actionsContent: {
        marginHorizontal: 12,
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#fff",
        borderRadius: 22,

        borderWidth: 1,
        borderColor: "#b5b5b5",

        elevation: 3,
    },
    btn: {
        margin: 5,
        paddingHorizontal: 18,
        minHeight: 42,

        borderRadius: 17,

        backgroundColor: "#222",

        alignItems: "center",
        justifyContent: "center",
    },
    btnPressed: {
        backgroundColor: "#676767",
    },
    btnText: {
        color: "#ffffff",
        fontWeight: "600",
    },
    input: {
        flex: 1,
        paddingHorizontal: 18,
        paddingVertical: 14,
        fontSize: 15,
    },
});
