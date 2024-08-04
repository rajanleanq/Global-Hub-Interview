import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button component", () => {
  it("renders button label", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
});
