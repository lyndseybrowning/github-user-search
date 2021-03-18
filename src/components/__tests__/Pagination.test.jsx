import { fireEvent, render, screen } from "@testing-library/react";

import Pagination from "../Pagination";

const defaultProps = {
    totalPages: 10,
    recordsPerPage: 10,
    currentPage: 1,
    pageRange: 5,
    onPageChange: () => null,
};

describe("Pagination component", () => {
    it("should render primary navigation buttons", () => {
        render(<Pagination {...defaultProps} />);

        screen.getByRole("button", { name: /first page/i });
        screen.getByRole("button", { name: /previous page/i });
        screen.getByRole("button", { name: /next page/i });
        screen.getByRole("button", { name: /last page/i });
    });

    it("should display a dropdown that allows the developer to choose the number of records per page", () => {
        render(<Pagination {...defaultProps} />);

        screen.getByRole("option", { name: /showing 10 records/i });
    });

    it("should display page buttons for each available page", () => {
        render(
            <Pagination
                {...defaultProps}
                totalPages={10}
                pageRange={5}
                currentPage={1}
            />,
        );

        screen.getByRole("button", { name: /page 1/i });
        screen.getByRole("button", { name: /page 2/i });
        screen.getByRole("button", { name: /page 3/i });
        screen.getByRole("button", { name: /page 4/i });
        screen.getByRole("button", { name: /page 5/i });
    });

    it("should call the onPageChange handler with the current page when a page is clicked", () => {
        const mockOnPageChange = jest.fn();

        render(
            <Pagination
                {...defaultProps}
                totalPages={1000}
                pageRange={5}
                currentPage={999}
                onPageChange={mockOnPageChange}
            />,
        );

        const pageNumber = 997;
        const page = screen.getByRole("button", {
            name: new RegExp(pageNumber, "i"),
        });

        fireEvent.click(page);

        expect(mockOnPageChange).toHaveBeenCalledWith(pageNumber);
    });
});
