import Select, {
    ClearIndicatorProps,
    components,
    MultiValueRemoveProps,
    Props,
  } from "react-select"
import { cn } from "../../../core/lib/utils"
  
  const ClearIndicator = (props: ClearIndicatorProps) => {
    return <components.ClearIndicator {...props}>X</components.ClearIndicator>
  }
  
  const MultiValueRemove = (props: MultiValueRemoveProps) => {
    return <components.MultiValueRemove {...props}>X</components.MultiValueRemove>
  }
  const IconOption = (props: any) => (
    <components.Option className="flex items-center w-full flex-row" {...props}>
      {props.data.label}
      <span className="absolute right-2">
        {props.isSelected && <CheckIcon />}
      </span>
    </components.Option>
  )
  
  const controlStyles = {
    base: "border rounded-[5px] bg-white hover:cursor-pointer w-full font-nunito text-[14px] leading-14 px-[8px] py-[1px] ",
    focus: "border-primary-600 ring-1 ring-primary-500",
    nonFocus: "border-gray-300 hover:border-gray-400",
  }
  const placeholderStyles = "text-gray-400 text-12 leading-14 font-nunito"
  const selectInputStyles = "pl-1 py-0.5 text-[14px] leading-14 font-nunito"
  const valueContainerStyles = "p-1 gap-1 text-[14px] font-nunito leading-14"
  const singleValueStyles = "leading-7 ml-1"
  const multiValueStyles =
    "bg-gray-100 rounded items-center py-[2px] pl-[8px] pr-1 gap-1.5 font-nunito text-[14px]"
  const multiValueLabelStyles = "leading-6 py-0.5"
  const multiValueRemoveStyles =
    "border border-gray-200 bg-white hover:bg-red-50 px-8 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md"
  const indicatorsContainerStyles = "p-1 gap-1"
  const clearIndicatorStyles =
    "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800"
  const indicatorSeparatorStyles = "bg-gray-300"
  const dropdownIndicatorStyles =
    "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black"
  const menuStyles =
    "p-0 mt-2 border border-gray-200 bg-white rounded-lg font-nunito text-[14px] leading-14 "
  const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-[14px] leading-14"
  const optionStyles = {
    base: "hover:cursor-pointer px-4 py-2 capitalize rounded w-full font-nunito text-[14px] leading-14",
    focus: "bg-gray-100 active:bg-gray-200",
    selected: "flex justify-between flex-row after:text-[#7047EB] text-gray-500",
  }
  const noOptionsMessageStyles =
    "text-gray-500 p-3 text-[12px] leading-[12px] text-red-500 font-500"
  
  /**
   * Renders a React Select component with customizable styles and options.
   *
   * @param {string} label - The label for the select component.
   * @param {boolean} isOptional - Indicates if the select component is optional.
   * @param {boolean} required - Indicates if the select component is required.
   */
  export const ReactSelect = ({
    label,
    isOptional,
    required,
    helpText,
    ...props
  }: {
    label?: string
    isOptional?: boolean
    helpText?: string
    required?: boolean
  } & Props): JSX.Element => (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex">
        {label && (
          <label className="text-[12px] font-nunito leading-[12px] font-500">
            {label}
          </label>
        )}
        {isOptional && (
          <p className="text-[12px] font-nunito leading-[12px] font-400 text-text-secondary">
            &nbsp;(optional)
          </p>
        )}
        {required && (
          <span className="text-text-required text-[12px] leading-[12px]">&nbsp;*</span>
        )}
      </div>
      <Select
        unstyled
        styles={{
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
          // On mobile, the label will truncate automatically, so we want to
          // override that behaviour.
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: "normal",
            overflow: "visible",
          }),
          control: (base) => ({
            ...base,
            transition: "none",
          }),
        }}
        components={{ ClearIndicator, MultiValueRemove, Option: IconOption }}
        classNames={{
          control: ({ isFocused }) =>
            cn(
              isFocused ? controlStyles.focus : controlStyles.nonFocus,
              controlStyles.base,
            ),
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            cn(
              isFocused && optionStyles.focus,
              isSelected && optionStyles.selected,
              optionStyles.base,
            ),
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        {...props}
      />
      {helpText && (
        <p className="text-[14px] font-nunito leading-14 font-400 text-text-required text-start">
          {helpText}
        </p>
      )}
    </div>
  )
  
  const CheckIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M7.75 12.75L10 15.25L16.25 8.75"
          stroke="#7047EB"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    )
  }
  