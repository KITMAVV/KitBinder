import { StatusBar } from 'expo-status-bar';
import {ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {KeyboardStickyView} from "react-native-keyboard-controller";

import searchBooks from "../api/ranobelib/searchBooks";


import {useEffect, useState} from "react";
import { theme } from "../theme/theme";

import BookCard from "../components/card/BookCard";


export default function Home({navigation}) {

    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);


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




    async function handleOpenBookDetails(book) {
        navigation.navigate("BookDetails", {
            slug_url: book.slug_url,
            initialBook: book,
        });

    }

    async function handleOpenDownloader(slug_url) {
        console.log('Opening Downloader with Slug-URL:', slug_url);
        navigation.navigate("Downloader", {
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
                    <ActivityIndicator color={theme.colors.accent} size="large" />
                </View>
            ) :books.length === 0 ? (
                <View style={styles.listEmptyWrap}>
                    <Text style={styles.emptyText}>ㄟ( ▔, ▔ )ㄏ</Text>
                </View>
            ) : (
            <FlatList
                numColumns={2}
                style={styles.list}
                contentContainerStyle={styles.list_content}
                columnWrapperStyle={styles.row}
                data={books}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (<BookCard book={item} onPress={() => handleOpenBookDetails(item)}/>)}

            />
                )}


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
                        placeholderTextColor={theme.colors.placeholder}
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
        backgroundColor: theme.colors.background,
    },

    titleContainer: {
        position: "absolute",
        top: 40,
        left: 5,
        zIndex: 1,

        backgroundColor: theme.colors.surface,
        borderRadius: 18,
        paddingHorizontal: 12,
        paddingVertical: 4,
    },

    title: {
        fontSize: 25,
        fontWeight: 700,
        color: theme.colors.text,

    },

    list: {
        flex: 1,
        paddingTop: 55,
    },

    list_content: {
        padding: 5,

    },

    row: {
        justifyContent: "space-between",
        marginBottom: 12,
    },

    listEmptyWrap:{
        flex: 1,
        backgroundColor: theme.colors.surfaceMuted,
        alignItems: "center",
        justifyContent: "center",
    },

    emptyText: {
        color: theme.colors.textMuted,
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
        overflow: "hidden",

        backgroundColor: theme.colors.surface,
        borderRadius: 22,

        borderWidth: 1,
        borderColor: theme.colors.border,

        elevation: 3,
    },

    input: {
        flex: 1,
        backgroundColor: theme.colors.inputBackground,
        color: theme.colors.text,
        paddingHorizontal: 18,
        paddingVertical: 14,
        fontSize: 15,
    },

    btn: {
        margin: 5,
        paddingHorizontal: 18,
        minHeight: 42,

        borderRadius: 17,

        backgroundColor: theme.colors.actionBackground,

        alignItems: "center",
        justifyContent: "center",
    },

    btnPressed: {
        backgroundColor: theme.colors.actionPressed,
    },

    btnText: {
        color: theme.colors.actionText,
        fontWeight: "600",
    },
});

//         theme.colors.pupupupu
