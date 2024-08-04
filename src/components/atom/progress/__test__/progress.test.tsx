import { render, screen } from "@testing-library/react";
import Progress from "../progress";

describe("Progress component", () => {
  it("renders the progress bar with the correct width", () => {
    render(<Progress percentage={50} />);

    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveStyle("width: 50%");
  });

  it("renders the progress bar with 0% width when percentage is 0", () => {
    render(<Progress percentage={0} />);
    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveStyle("width: 0%");
  });

  it("renders the progress bar with 100% width when percentage is 100", () => {
    render(<Progress percentage={100} />);
    const progressBar = screen.getByTestId("progress-bar");
    expect(progressBar).toHaveStyle("width: 100%");
  });
});
