import fetchData, { fetchUserData } from "../fetchData";

const defaultFetch = global.fetch;

beforeEach(() => {
    global.fetch = jest.fn();

    global.fetch.mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve({ totalRecords: 1000 }),
        }),
    );
});

afterEach(() => {
    global.fetch = defaultFetch;
});

describe("fetchData", () => {
    it("should throw when no search query is provided", async () => {
        try {
            await fetchData();
        } catch (error) {
            /* eslint-disable-next-line jest/no-conditional-expect */
            expect(error.message).toBe("searchQuery is required.");
        }
    });

    it("should call the user endpoint by default with the specified search query", async () => {
        const mockSearchQuery = "mock-query";

        await fetchData(mockSearchQuery);

        expect(window.fetch).toHaveBeenCalledWith(
            expect.stringContaining(
                `https://api.github.com/search/users?q=${mockSearchQuery}`,
            ),
        );
    });

    it("should call the repositories endpoint with the search query when specified", async () => {
        const mockSearchQuery = "mock-query";

        await fetchData(mockSearchQuery, {
            type: "repositories",
        });

        expect(window.fetch).toHaveBeenCalledWith(
            expect.stringContaining(
                `https://api.github.com/search/repositories?q=${mockSearchQuery}`,
            ),
        );
    });

    it("should add the page size and current page to the querystring", async () => {
        await fetchData("mock-query", {
            type: "users",
            pageSize: 10,
            currentPage: 1,
        });

        expect(window.fetch).toHaveBeenCalledWith(
            "https://api.github.com/search/users?q=mock-query&per_page=10&page=1",
        );
    });

    it("should throw an error when the request returns a 403 to indicate request limit reached", async () => {
        global.fetch.mockImplementation(() =>
            Promise.resolve({
                status: 403,
            }),
        );

        try {
            await fetchData("mock search query");
        } catch (error) {
            /* eslint-disable-next-line jest/no-conditional-expect */
            expect(error.message).toBe(
                "Request limit reached. Please try again in a few minutes.",
            );
        }
    });
});

describe("fetchUserData", () => {
    it("should call the user endpoint with the specified user Id", async () => {
        const mockUserId = "594";

        await fetchUserData(mockUserId);

        expect(window.fetch).toHaveBeenCalledWith(
            expect.stringContaining(
                `https://api.github.com/user/${mockUserId}`,
            ),
        );
    });

    it("should throw an error when the request returns a 403 to indicate request limit reached", async () => {
        global.fetch.mockImplementation(() =>
            Promise.resolve({
                status: 403,
            }),
        );

        try {
            await fetchUserData("mock user id");
        } catch (error) {
            /* eslint-disable-next-line jest/no-conditional-expect */
            expect(error.message).toBe(
                "Request limit reached. Please try again in a few minutes.",
            );
        }
    });
});
