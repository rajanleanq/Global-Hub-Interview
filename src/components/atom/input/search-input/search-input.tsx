import * as React from "react";
import { OtherKindInputProps } from "../input-type";
import { cn } from "../../../../core/lib/utils";
import BaseInput from "../base-input/base-input";
// import X from "../../../../assets/svg/x.svg";
const showXButton = (value: unknown, defaultValue: unknown) => {
  if (value && value !== "") return true;
  if (typeof value === "undefined" && defaultValue) return true;
  return false;
};

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  OtherKindInputProps
>(
  (
    {
      type,
      leadingIcon,
      onClear,
      value,
      onChange,
      leadingIconClassName,
      defaultValue,
      ...props
    },
    ref
  ) => (
    <BaseInput
      ref={ref}
      type={type}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      // trailElement={
      //   showXButton(value, defaultValue) && (
      //     <div onClick={() => onClear?.()} test-id="trail-icon">
      //       <X />
      //     </div>
      //   )
      // }
      leadingIconClassName={cn("text-icon-primary", leadingIconClassName)}
      leadingIcon={
        leadingIcon || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <g id="search-2-line">
              <path
                id="Vector"
                d="M9.25 2.5C12.976 2.5 16 5.524 16 9.25C16 12.976 12.976 16 9.25 16C5.524 16 2.5 12.976 2.5 9.25C2.5 5.524 5.524 2.5 9.25 2.5ZM9.25 14.5C12.1502 14.5 14.5 12.1502 14.5 9.25C14.5 6.349 12.1502 4 9.25 4C6.349 4 4 6.349 4 9.25C4 12.1502 6.349 14.5 9.25 14.5ZM15.6137 14.5532L17.7355 16.6742L16.6742 17.7355L14.5532 15.6137L15.6137 14.5532Z"
                fill="#868C98"
              />
            </g>
          </svg>
        )
      }
      {...props}
    />
  )
);

export default SearchInput;

SearchInput.displayName = "SearchInput";
