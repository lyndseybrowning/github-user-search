import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const defaultFetch = global.fetch;
const mockUserSearchResults = [
    {
        id: 1,
        login: "mock-username",
        html_url: "https://mock-profile-url",
        avatar_url: "https://mock-avatar-url",
    },
    {
        id: 2,
        login: "mock-username-2",
        html_url: "https://mock-profile-url-1",
        avatar_url: "https://mock-avatar-url-2",
    },
];

const mockUser1Info = {
    id: 1,
    bio: "mock bio",
    location: "mock location",
    followers: 2004,
};

const mockUser2Info = {
    id: 2,
    bio: "mock bio 2",
    location: null,
    followers: 0,
};

beforeEach(() => {
    global.fetch = jest.fn();

    global.fetch.mockImplementation(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    total_count: 2000,
                    items: mockUserSearchResults,
                }),
        }),
    );
});

afterEach(() => {
    global.fetch = defaultFetch;
});

test("it doesn't display tabs until a search term has been entered", async () => {
    render(<App />);

    expect(screen.queryByText(/users/)).not.toBeInTheDocument();

    const searchField = screen.getByRole("textbox", { name: /search/i });
    const submitSearch = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchField, { target: { value: "mock search term" } });
    fireEvent.click(submitSearch);

    await screen.findByRole("tablist", { name: /search results/i });
});

test("it displays an error when search request fails", async () => {
    global.fetch.mockImplementation(() => Promise.reject({ message: "Error" }));

    render(<App />);

    const searchField = screen.getByRole("textbox", { name: /search/i });
    const submitSearch = screen.getByRole("button", { name: /search/i });

    fireEvent.change(searchField, {
        target: { value: "mock search term" },
    });
    fireEvent.click(submitSearch);

    await screen.findByText(/error/i);
});

test("it can switch themes", () => {
    render(<App />);

    const darkMode = screen.getByRole("button", {
        name: /switch to dark mode/i,
    });

    fireEvent.click(darkMode);

    screen.getByRole("button", { name: /switch to light mode/i });

    expect(
        screen.queryByRole("button", { name: /switch to dark mode/i }),
    ).not.toBeInTheDocument();
});

describe("App users tab", () => {
    beforeEach(async () => {
        render(<App />);

        const searchField = screen.getByRole("textbox", { name: /search/i });
        const submitSearch = screen.getByRole("button", { name: /search/i });

        fireEvent.change(searchField, {
            target: { value: "mock search term" },
        });
        fireEvent.click(submitSearch);

        await screen.findByRole("tablist", { name: /search results/i });
    });

    it("should display the total number of results in the tab", () => {
        screen.getByRole("tab", {
            name: /users. 2000 records found./i,
        });
    });

    it("should display information for each user", () => {
        mockUserSearchResults.forEach((result, user) => {
            const profileLink = screen.getByRole("link", {
                name: result.login,
            });
            const profileImage = screen.getByRole("img", {
                name: result.login,
            });

            expect(profileLink).toHaveAttribute("href", result.html_url);
            expect(profileImage).toHaveAttribute("src", result.avatar_url);
        });
    });

    it("should display additional profile information for a user when requested", async () => {
        global.fetch.mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockUser1Info),
            }),
        );

        const [firstMockUser] = mockUserSearchResults;
        const profileInfo = screen.getByTestId(firstMockUser.id);

        // changing the attribute of the element
        // forces the onToggle event to fire.
        // cannot simulate onToggle using testing library!
        profileInfo.open = true;

        await screen.findByText(mockUser1Info.bio);

        screen.getByText(mockUser1Info.followers);
        screen.getByText(mockUser1Info.location);
    });

    it("should display alternative text when user location is unknown", async () => {
        global.fetch.mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockUser2Info),
            }),
        );

        const [, secondMockUser] = mockUserSearchResults;
        const profileInfo = screen.getByTestId(secondMockUser.id);

        profileInfo.open = true;

        await screen.findByText("Unknown");
    });

    it("should reset the current page to 1 when the records per page dropdown is changed", async () => {
        const page5Button = screen.getAllByRole("button", {
            name: /go to page 5/i,
        })[0];

        fireEvent.click(page5Button);

        expect(page5Button).toHaveAttribute("aria-current", "true");

        fireEvent.change(
            screen.getAllByRole("combobox", {
                name: /choose display option/i,
            })[0],
            { target: { value: "20" } },
        );

        await waitFor(() => {
            const page1Button = screen.getAllByRole("button", {
                name: /go to page 1/i,
            })[0];

            expect(page1Button).toHaveAttribute("aria-current", "true");
        });
    });

    it("should show a maximum of 1000 records", async () => {
        const lastPageButton = screen.getAllByRole("button", {
            name: /last page/i,
        })[0];

        fireEvent.click(lastPageButton);

        await waitFor(() => {
            screen.getAllByRole("button", { name: /page 100/i });

            expect(
                screen.queryByRole("button", { name: /page 101/i }),
            ).not.toBeInTheDocument();
        });
    });

    describe("Error handling", () => {
        it("should display an error when user info cannot be fetched", async () => {
            global.fetch.mockImplementation(() => Promise.reject("error"));

            const [firstMockUser] = mockUserSearchResults;
            const profileInfo = screen.getByTestId(firstMockUser.id);

            profileInfo.open = true;

            await screen.findByText(/unable to fetch user information/i);
        });

        it("should display an error when request fails fetching a new page", async () => {
            const mockErrorMessage = "error message";

            global.fetch.mockImplementation(() =>
                Promise.reject({ message: mockErrorMessage }),
            );

            const page5Button = screen.getAllByRole("button", {
                name: /go to page 5/i,
            })[0];

            fireEvent.click(page5Button);

            await screen.findByText(mockErrorMessage);
        });

        it("should display an error when limit is reached whilst fetching a new page", async () => {
            global.fetch.mockImplementation(() =>
                Promise.resolve({ status: 403 }),
            );

            const page5Button = screen.getAllByRole("button", {
                name: /go to page 5/i,
            })[0];

            fireEvent.click(page5Button);

            await screen.findByText(
                /request limit reached. Please try again in a few minutes./i,
            );
        });
    });
});
