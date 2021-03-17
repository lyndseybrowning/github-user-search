import { render, screen } from "@testing-library/react";

import Pagination from "../Pagination";

describe("Pagination component", () => {
    it("should render primary navigation buttons", () => {
        render(<Pagination />);

        screen.getByRole("button", { name: /first page/i });
        screen.getByRole("button", { name: /previous page/i });
        screen.getByRole("button", { name: /next page/i });
        screen.getByRole("button", { name: /last page/i });
    });

    it("should display a dropdown that allows the developer to choose the number of records per page", () => {
        render(<Pagination recordsPerPage={10} />);

        screen.getByRole("option", { name: /showing 10 records/i });
    });
});
