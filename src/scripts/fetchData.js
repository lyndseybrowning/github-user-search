async function fetchData(
    searchQuery,
    { type = "users", pageSize = 10, currentPage = 1 } = {},
) {
    if (!searchQuery || searchQuery === "") {
        throw new Error("searchQuery is required.");
    }

    const response = await fetch(
        `https://api.github.com/search/${type}?q=${searchQuery}&per_page=${pageSize}&page=${currentPage}`,
    );

    // throw an error if we get a request limit reached exception
    // 403 forbidden
    if (response.status === 403) {
        throw new Error(
            "Request limit reached. Please try again in a few minutes.",
        );
    }
    const data = await response.json();

    return data;
}

async function fetchUserData(userId) {
    const response = await fetch(`https://api.github.com/user/${userId}`);

    // throw an error if we get a request limit reached exception
    // 403 forbidden
    if (response.status === 403) {
        throw new Error(
            "Request limit reached. Please try again in a few minutes.",
        );
    }

    const data = await response.json();

    return data;
}

export default fetchData;
export { fetchUserData };
