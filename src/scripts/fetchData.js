async function fetchData(
    searchQuery,
    { type = "users", pageSize = 10, currentPage = 1 } = {},
) {
    if (!searchQuery || searchQuery === "") {
        throw new Error("searchQuery is required");
    }

    const response = await fetch(
        `https://api.github.com/search/${type}?q=${searchQuery}&per_page=${pageSize}&page=${currentPage}`,
    );
    const data = await response.json();

    return data;
}

export default fetchData;
