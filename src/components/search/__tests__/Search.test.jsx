import { render, screen, fireEvent } from "@testing-library/react";

import Search from "../Search";

describe("Search component", () => {
    it("should render an input field with a button to submit search", () => {
        render(<Search onSearch={() => null} />);

        screen.getByRole("textbox", { name: /search github/i });
        screen.getByRole("button", { name: /search/i });
    });

    it("should call the onSearch handler with the search term when the search button is pressed", () => {
        const MOCK_SEARCH_STRING = "hello world";
        const mockOnSearch = jest.fn();

        render(<Search onSearch={mockOnSearch} />);

        const searchInput = screen.getByRole("textbox", {
            name: /search github/i,
        });
        const searchButton = screen.getByRole("button", { name: /search/i });

        fireEvent.change(searchInput, {
            target: { value: MOCK_SEARCH_STRING },
        });
        fireEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalledWith(MOCK_SEARCH_STRING);
    });

    it("should disable the button and not call the onSearch handler until a search term has been entered", () => {
        const MOCK_SEARCH_STRING = "hello world";
        const mockOnSearch = jest.fn();

        render(<Search onSearch={mockOnSearch} />);

        const searchInput = screen.getByRole("textbox", {
            name: /search github/i,
        });
        const searchButton = screen.getByRole("button", { name: /search/i });

        expect(searchButton).toHaveAttribute("aria-disabled", "true");

        fireEvent.click(searchButton);

        expect(mockOnSearch).not.toHaveBeenCalled();

        fireEvent.change(searchInput, {
            target: { value: MOCK_SEARCH_STRING },
        });

        expect(searchButton).toHaveAttribute("aria-disabled", "false");

        fireEvent.click(searchButton);

        expect(mockOnSearch).toHaveBeenCalledWith(MOCK_SEARCH_STRING);
    });
});
