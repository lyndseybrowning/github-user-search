import { fireEvent, render, screen } from "@testing-library/react";

import Pagination from "..";

const defaultProps = {
    totalPages: 10,
    recordsPerPage: 10,
    currentPage: 1,
    pageRange: 5,
    onPageChange: () => null,
};

describe("Pagination component", () => {
    it("should display a dropdown that allows the user to choose the number of records per page", () => {
        render(<Pagination {...defaultProps} />);

        screen.getByRole("option", { name: /10 records per page/i });
        screen.getByRole("option", { name: /20 records per page/i });
        screen.getByRole("option", { name: /50 records per page/i });
    });

    it("should call the onRecordsPerPageChange handler when a new option is chosen", () => {
        const mockOnRecordsPerPageChange = jest.fn();

        render(
            <Pagination
                {...defaultProps}
                onRecordsPerPageChange={mockOnRecordsPerPageChange}
            />,
        );

        const dropdown = screen.getByRole("combobox", {
            name: /choose display option/i,
        });

        fireEvent.change(dropdown, { target: { value: "20" } });

        expect(mockOnRecordsPerPageChange).toHaveBeenCalledWith(20);
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

    it("should identify the current page using aria-current", () => {
        render(<Pagination {...defaultProps} currentPage={2} />);

        const page1 = screen.getByRole("button", { name: /page 1/i });
        const page2 = screen.getByRole("button", { name: /page 2/i });

        expect(page1).toHaveAttribute("aria-current", "false");
        expect(page2).toHaveAttribute("aria-current", "true");
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

    it("should call the onPageChange handler with the next page when next page is clicked", () => {
        const mockOnPageChange = jest.fn();
        const currentPage = 997;

        render(
            <Pagination
                {...defaultProps}
                totalPages={1000}
                pageRange={5}
                currentPage={currentPage}
                onPageChange={mockOnPageChange}
            />,
        );

        const nextPage = screen.getByRole("button", {
            name: /next page/i,
        });

        fireEvent.click(nextPage);

        expect(mockOnPageChange).toHaveBeenCalledWith(currentPage + 1);
    });

    it("should call the onPageChange handler with the last page when last page is clicked", () => {
        const mockOnPageChange = jest.fn();
        const totalPages = 10;

        render(
            <Pagination
                {...defaultProps}
                totalPages={totalPages}
                pageRange={5}
                currentPage={1}
                onPageChange={mockOnPageChange}
            />,
        );

        const lastPage = screen.getByRole("button", {
            name: /last page/i,
        });

        fireEvent.click(lastPage);

        expect(mockOnPageChange).toHaveBeenCalledWith(totalPages);
    });

    it("should call the onPageChange handler with the previous page when previous page is clicked", () => {
        const mockOnPageChange = jest.fn();
        const currentPage = 997;

        render(
            <Pagination
                {...defaultProps}
                totalPages={1000}
                pageRange={5}
                currentPage={currentPage}
                onPageChange={mockOnPageChange}
            />,
        );

        const previousPage = screen.getByRole("button", {
            name: /previous page/i,
        });

        fireEvent.click(previousPage);

        expect(mockOnPageChange).toHaveBeenCalledWith(currentPage - 1);
    });

    it("should call the onPageChange handler with the first page when first page is clicked", () => {
        const mockOnPageChange = jest.fn();

        render(
            <Pagination
                {...defaultProps}
                totalPages={10}
                pageRange={5}
                currentPage={10}
                onPageChange={mockOnPageChange}
            />,
        );

        const firstPage = screen.getByRole("button", {
            name: /first page/i,
        });

        fireEvent.click(firstPage);

        expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });

    it("should not call the onPageChange handler when next page or last page is pressed and current page is last page", () => {
        const mockOnPageChange = jest.fn();

        render(
            <Pagination
                {...defaultProps}
                totalPages={10}
                currentPage={10}
                onPageChange={mockOnPageChange}
            />,
        );

        const nextPageButton = screen.getByRole("button", {
            name: /next page/i,
        });
        const lastPageButton = screen.getByRole("button", {
            name: /last page/i,
        });

        fireEvent.click(nextPageButton);
        fireEvent.click(lastPageButton);

        expect(mockOnPageChange).not.toHaveBeenCalled();
    });

    it("should not call the onPageChange handler when first page or previous page is pressed and current page is first page", () => {
        const mockOnPageChange = jest.fn();

        render(
            <Pagination
                {...defaultProps}
                totalPages={10}
                currentPage={1}
                onPageChange={mockOnPageChange}
            />,
        );

        const firstPageButton = screen.getByRole("button", {
            name: /first page/i,
        });
        const previousPageButton = screen.getByRole("button", {
            name: /previous page/i,
        });

        fireEvent.click(firstPageButton);
        fireEvent.click(previousPageButton);

        expect(mockOnPageChange).not.toHaveBeenCalled();
    });
});
