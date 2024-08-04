import { fireEvent, render } from "@testing-library/react";
import BaseInput from "../base-input/base-input";
import { InputProps } from "../input-type";

describe("Input component", () => {
  const onChangeMock = jest.fn();

  const renderInput = (props: InputProps) => {
    return render(<BaseInput {...props} />);
  };

  it("renders input with type email", () => {
    const { getByTestId } = renderInput({
      type: "email",
      onChange: onChangeMock,
      testid: "email-input",
    });
    const inputElement = getByTestId("email-input");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "test@example.com" } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("renders input with type password", () => {
    const { getByTestId } = renderInput({
      type: "password",
      testid: "password-input",
      onChange: onChangeMock,
    });
    const inputElement = getByTestId("password-input");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "password123" } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("renders input with type search", () => {
    const { getByTestId } = renderInput({
      type: "search",
      testid: "search-input",
      onChange: onChangeMock,
    });
    const inputElement = getByTestId("search-input");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "search query" } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  it("renders input with type text", () => {
    const { getByTestId } = renderInput({
      type: "text",
      testid: "text-input",
      onChange: onChangeMock,
    });
    const inputElement = getByTestId("text-input");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: "text input value" } });
    expect(onChangeMock).toHaveBeenCalled();
  });
  it("renders input with error text", () => {
    const { getByTestId, getByText } = renderInput({
      type: "email",
      testid: "email-input",
      errorText: "Invalid email",
      onChange: onChangeMock,
    });
    const inputElement = getByTestId("email-input");
    expect(inputElement).toBeInTheDocument();
    expect(getByText("Invalid email")).toBeInTheDocument();
  });

  it("renders input with helper text", () => {
    const { getByTestId, getByText } = renderInput({
      type: "email",
      testid: "email-input",
      helperText: "Please enter your email",
      onChange: onChangeMock,
    });
    const inputElement = getByTestId("email-input");
    expect(inputElement).toBeInTheDocument();
    expect(getByText("Please enter your email")).toBeInTheDocument();
  });

  it("renders disabled input", () => {
    const { getByTestId } = renderInput({
      type: "email",
      testid: "email-input",
      isDisabled: true,
      onChange: onChangeMock,
    });
    const inputElement = getByTestId("email-input") as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.disabled).toBeTruthy();
  });
});
