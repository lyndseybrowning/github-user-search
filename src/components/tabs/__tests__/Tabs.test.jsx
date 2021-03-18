import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tabs, { Tab } from "..";

const defaultProps = {
    label: "Mock Label",
};

describe("Tabs component", () => {
    it("should render the first tab content by default", () => {
        render(
            <Tabs {...defaultProps}>
                <Tab name="users">First tab content</Tab>
                <Tab name="repos">Second tab content</Tab>
            </Tabs>,
        );

        screen.getByRole("tab", { name: "users" });
        screen.getByText(/first tab content/i);

        expect(screen.queryByText(/second tab content/i)).toBeNull();
    });

    it("should display the new tab content when a new tab is pressed", () => {
        render(
            <Tabs {...defaultProps}>
                <Tab name="users">First tab content</Tab>
                <Tab name="repos">Second tab content</Tab>
            </Tabs>,
        );

        const secondTab = screen.getByRole("tab", { name: "repos" });

        userEvent.click(secondTab);

        const firstTabContent = screen.queryByText(/first tab content/i);
        const secondTabContent = screen.queryByText(/second tab content/i);

        expect(secondTab).toHaveFocus();
        expect(secondTabContent).toBeInTheDocument();
        expect(firstTabContent).not.toBeInTheDocument();
    });

    describe("Keyboard Navigation", () => {
        beforeEach(() => {
            render(
                <Tabs {...defaultProps}>
                    <Tab name="users">First tab content</Tab>
                    <Tab name="repos">Second tab content</Tab>
                </Tabs>,
            );
        });

        it("should move focus to the tab content when the tab is in focus", () => {
            const firstTab = screen.getByRole("tab", { name: "users" });
            const firstTabContent = screen.getByText(/first tab content/i);

            userEvent.click(firstTab);
            userEvent.tab();

            expect(firstTabContent).toHaveFocus();
        });

        it("should move focus to the next tab when the right arrow key is pressed", () => {
            const firstTab = screen.getByRole("tab", { name: "users" });

            userEvent.click(firstTab);
            fireEvent.keyDown(firstTab, {
                key: "ArrowRight",
                code: "ArrowRight",
                keyCode: 39,
                charCode: 39,
            });

            const secondTab = screen.getByRole("tab", {
                name: "repos",
            });
            const secondTabContent = screen.queryByText(/second tab content/i);

            expect(secondTab).toHaveFocus();
            expect(secondTabContent).toBeInTheDocument();
        });

        it("should move focus to the first tab when the right arrow key is pressed on the last tab", () => {
            const lastTab = screen.getByRole("tab", { name: "repos" });

            userEvent.click(lastTab);
            fireEvent.keyDown(lastTab, {
                key: "ArrowRight",
                code: "ArrowRight",
                keyCode: 39,
                charCode: 39,
            });

            const firstTab = screen.getByRole("tab", {
                name: "users",
            });
            const firstTabContent = screen.queryByText(/first tab content/i);

            expect(firstTab).toHaveFocus();
            expect(firstTabContent).toBeInTheDocument();
        });

        it("should move focus to the previous tab when the left arrow key is pressed", () => {
            const secondTab = screen.getByRole("tab", { name: "repos" });

            userEvent.click(secondTab);
            fireEvent.keyDown(secondTab, {
                key: "ArrowLeft",
                code: "ArrowLeft",
                keyCode: 37,
                charCode: 37,
            });

            const firstTab = screen.getByRole("tab", {
                name: "users",
            });
            const firstTabContent = screen.queryByText(/first tab content/i);

            expect(firstTab).toHaveFocus();
            expect(firstTabContent).toBeInTheDocument();
        });

        it("should move focus to the last tab when the left arrow key is pressed on the first tab", () => {
            const firstTab = screen.getByRole("tab", { name: "users" });

            userEvent.click(firstTab);
            fireEvent.keyDown(firstTab, {
                key: "ArrowLeft",
                code: "ArrowLeft",
                keyCode: 37,
                charCode: 37,
            });

            const lastTab = screen.getByRole("tab", {
                name: "repos",
            });
            const lastTabContent = screen.queryByText(/second tab content/i);

            expect(lastTab).toHaveFocus();
            expect(lastTabContent).toBeInTheDocument();
        });

        it("should move focus to the first tab when the Home key is pressed", () => {
            const lastTab = screen.getByRole("tab", { name: "repos" });

            userEvent.click(lastTab);
            fireEvent.keyDown(lastTab, {
                key: "Home",
                code: "Home",
                keyCode: 36,
                charCode: 36,
            });

            const firstTab = screen.getByRole("tab", {
                name: "users",
            });
            const firstTabContent = screen.queryByText(/first tab content/i);

            expect(firstTab).toHaveFocus();
            expect(firstTabContent).toBeInTheDocument();
        });

        it("should move focus to the last tab when the End key is pressed", () => {
            const firstTab = screen.getByRole("tab", { name: "users" });

            userEvent.click(firstTab);
            fireEvent.keyDown(firstTab, {
                key: "End",
                code: "End",
                keyCode: 35,
                charCode: 35,
            });

            const lastTab = screen.getByRole("tab", {
                name: "repos",
            });
            const lastTabContent = screen.queryByText(/second tab content/i);

            expect(lastTab).toHaveFocus();
            expect(lastTabContent).toBeInTheDocument();
        });
    });
});
