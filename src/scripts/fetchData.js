async function fetchData(searchQuery, { type = "users" } = {}) {
    if (!searchQuery || searchQuery === "") {
        throw new Error("searchQuery is required");
    }

    const response = await fetch(
        `https://api.github.com/search/${type}?q=${searchQuery}`,
    );
    const data = await response.json();

    return data;
}

export default fetchData;
