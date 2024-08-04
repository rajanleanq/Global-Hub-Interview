import {render } from "@testing-library/react";
import { InputProps } from "../../input-type";
import SearchInput from "../search-input";

describe("Input component", () => {
  const onChangeMock = jest.fn();

  const renderInput = (props: InputProps) => {
    return render(<SearchInput {...props} />);
  };
  it("shows the X button when value is undefined but defaultValue is provided for search input", () => {
    const { getByTestId } = renderInput({
      type: "password",
      testid: "text-input",
      defaultValue: "Default",
      onChange: onChangeMock,
    });
    const xButton = getByTestId("trail-icon");
    expect(xButton).toBeInTheDocument();
  });
});
