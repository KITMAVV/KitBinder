async function getBook(slug_url) {

    try {
        const fields = [
            "background",
            "eng_name",
            "otherNames",
            "summary",
            "releaseDate",
            "type_id",
            "caution",
            "views",
            "rate_avg",
            "rate",
            "genres",
            "tags",
            "teams",
            "franchise",
            "authors",
            "publisher",
            "moderated",
            "metadata",
            "metadata.count",
            "metadata.close_comments",
            "translation_quality_rating",
            "manga_status_id",
            "chap_count",
            "status_id",
            "artists",
            "format",
        ];
        const params = new URLSearchParams();

        fields.forEach((field) => {
            params.append("fields[]", field);
        });

        const url = `https://api.cdnlibs.org/api/manga/${slug_url}?${params.toString()}`;

        const response = await fetch(url, {
            headers: {
                "Site-Id": "3",
                "Referer": "https://ranobelib.me/",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const json = await response.json();
        //console.log("Fetched book info!", json.data);

        return json.data ?? [];


    } catch (error) {
        console.log("Error:", error);
    }

}

export default getBook;
