import { render, screen } from "@testing-library/react";

import Card from "../Card";

const defaultProps = {
    title: {
        url: "mock-url",
        text: "mock-text",
    },
};

describe("Card component", () => {
    it("should render a title as an external link", () => {
        render(<Card {...defaultProps} />);

        const { title } = defaultProps;
        const link = screen.getByRole("link", { name: title.text });

        expect(link).toHaveAttribute("href", title.url);
    });

    it("should optionally render a subtitle and an image", () => {
        const subtitle = "mock-subtitle";
        const img = {
            src: "mock-image-path",
            alt: "mock-alt-text",
        };

        render(<Card {...defaultProps} subtitle={subtitle} img={img} />);

        const image = screen.getByRole("img", { name: img.alt });

        screen.getByText(subtitle);

        expect(image).toHaveAttribute("src", img.src);
    });

    it("should render any children passed in", () => {
        render(<Card {...defaultProps}>child component</Card>);

        screen.getByText("child component");
    });
});
