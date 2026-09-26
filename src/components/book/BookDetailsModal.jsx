import BaseModal from "../ui/BaseModal";
import {StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";

export default function BookDetailsModal({ visible, onClose, book}) {

    const imageSmallUri = book?.cover?.thumbnail;
    const imageUri = book?.cover?.default;

    return (
        <BaseModal visible={visible} onClose={onClose}>
            {imageSmallUri ? (
                <View style={styles.imageBannerWrapper}>
                    <Image
                        style={styles.imageBanner}
                        source={{
                            uri: imageSmallUri,
                            headers: {
                                Referer: "https://ranobelib.me/",
                            },
                        }}
                        contentFit="cover"

                        cachePolicy="memory-disk"
                        recyclingKey={imageSmallUri}
                        onError={(error) => {
                            console.log("IMAGE BAnner ERROR:", imageSmallUri);
                            console.log(error);
                        }}
                    />

                    <View style={styles.imageBannerOverlay} />

                    {imageUri && (
                        <Image
                            style={styles.cover}
                            source={{
                                uri: imageUri,
                                headers: {
                                    Referer: "https://ranobelib.me/",
                                },
                            }}
                            contentFit="cover"
                            cachePolicy="memory-disk"
                            recyclingKey={imageUri}
                        />
                    )}
                </View>
            ) : (
                <View style={styles.imagePlaceholder} />
            )}



            <Text>{book?.rus_name || book?.name}</Text>
        </BaseModal>

    );
}

const styles = StyleSheet.create({
    imageBannerWrapper: {
        width: "100%",
        height: 190,
        borderRadius: 8,
        marginBottom: 25,
    },
    imageBanner: {
        width: "100%",
        height: "100%",
    },
    imageBannerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    imagePlaceholder: {
        width: "100%",
        height: 270,
        backgroundColor: "#a8a8a8",
    },

    cover: {
        position: "absolute",
        width: 150,
        height: 210,
        left: "50%",
        top: "60%",
        transform: [
            { translateX: -75 },
            { translateY: -105 },
        ],
        borderRadius: 5,

    },
})

// Снизу штучки которые я получаю через getBook. Из моих карлючек в читаем текст собрал ChatGPT

// "background",                     // предыстория / доп. описание — например "События происходят..."
// "eng_name",                       // английское название — например "The Genius Swordsman"
// "otherNames",                     // альтернативные названия — например ["천재 검성", "Genius Swordmaster"]
// "summary",                        // описание / аннотация — structured JSON или текст
// "releaseDate",                    // дата / год выхода — например "2024"
// "type_id",                        // ID типа произведения — например 1
// "caution",                        // предупреждение о контенте — например null / текст предупреждения
// "views",                          // просмотры — например 154230
// "rate_avg",                       // средняя оценка — например 8.74
// "rate",                           // объект рейтинга — например { average: 8.74, votes: 1250 }
// "genres",                         // жанры — например [{ id: 1, name: "Фэнтези" }]
// "tags",                           // теги — например [{ id: 12, name: "Магия" }]
// "teams",                          // команды перевода — например [{ id: 25, name: "TeamName" }]
// "franchise",                      // франшиза / серия — например { id: 5, name: "Some Series" }
// "authors",                        // авторы — например [{ id: 10, name: "Kim ..." }]
// "publisher",                      // издатель — например { id: 3, name: "KakaoPage" }
// "moderated",                      // прошла ли карточка модерацию — например true
// "metadata",                       // дополнительные метаданные — например { count: 92, ... }
// "metadata.count",                 // count внутри metadata — например 92
// "metadata.close_comments",        // закрыты ли комментарии — например false
// "translation_quality_rating",     // рейтинг качества перевода — например 4.8
// "manga_status_id",                // ID статуса оригинала — например 2
// "chap_count",                     // количество глав — может прийти иначе, например через items_count
// "status_id",                      // ID статуса перевода / карточки — например 1
// "artists",                        // художники — например [{ id: 7, name: "Lee ..." }]
// "format",                         // формат произведения — например { id: 1, name: "Веб-новелла" }


// ---> id                           // базовый ID книги — например 272495
// ---> name                         // оригинальное / основное название
// ---> rus_name                     // русское название
// ---> slug                         // slug книги
// ---> slug_url                     // slug для URL / API
// ---> cover                        // объект обложек — default / md / thumbnail / filename
// ---> ageRestriction               // возрастное ограничение
// ---> type                         // тип произведения как объект / label
// ---> rating                       // готовый объект рейтинга
// ---> is_licensed                  // лицензировано ли произведение
// ---> status                       // статус оригинала
// ---> scanlateStatus               // статус перевода
// ---> items_count                  // информация о количестве глав, например { uploaded: 92, total: 0 }
