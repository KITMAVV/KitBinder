async function searchBooks(query) {
    try {

        const params = new URLSearchParams({
            q: query,
        });

        const url = `https://api.cdnlibs.org/api/manga?${params}`;

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

        console.log("Fetched!");

        return json.data ?? [];

    } catch (error) {
        console.log("Error:", error);
        return [];
    }
}

export default searchBooks;
