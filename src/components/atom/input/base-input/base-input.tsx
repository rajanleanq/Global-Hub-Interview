import * as React from "react";
import { CommonInputProps } from "../input-type";
import { cn } from "../../../../lib/utils";
import { Message } from "./input-message";
type TBaseInputProps = CommonInputProps;
export const BaseInput = React.forwardRef<HTMLInputElement, TBaseInputProps>(
  (
    {
      leadingIcon,
      trailIcon,
      className,
      errorText,
      helperText,
      label = "",
      isRequired,
      isDisabled,
      trailElement,
      leadingElement,
      size,
      type,
      ...props
    },
    ref
  ) => (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-primary font-medium text-[13px]">
          {isRequired ? (
            <>
              {label} <span className="text-[#375DFB]">*</span>{" "}
            </>
          ) : (
            label
          )}
        </span>
      )}
      <div
        className={cn(
          "border border-borders-input bg-white p-2 gap-2 rounded-[5px] m-0  flex focus-within:border-blue-400 shadow-xs items-center",
          className
        )}
      >
        {(leadingElement || leadingIcon) && (
          <div>{leadingElement || leadingIcon}</div>
        )}
        <input
          className={cn(
            ` bg-white w-full  outline-blue-400 text-sm focus:outline-none`,
            type === "search" && "pr-10",
            "focus-visible: "
          )}
          disabled={isDisabled}
          ref={ref}
          type={type}
          data-testid={props.testid}
          {...props}
        />
        {(trailElement || trailIcon) && (
          <div
            style={{
              width: "auto",
            }}
          >
            {trailIcon || trailElement}
          </div>
        )}
      </div>
      <Message
        errorText={errorText}
        isDisabled={isDisabled}
        helperText={helperText}
      />
    </div>
  )
);

BaseInput.displayName = "BaseInput";
export default BaseInput;
