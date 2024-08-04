import * as React from 'react';

type HTMLInputTypeAttribute =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  | 'rate';

export interface CommonInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /*
   * If true, the button will be disabled.
   */
  isDisabled?: boolean;

  /*
   * If true, the button will show loader.
   */
  isLoading?: boolean;

  /*
   * An optional string indicating an error message to display..
   */
  errorText?: string;

  /**
   * An optional string indicating placeholder for the input field
   */
  placeHolder?: string;

  /*
   *An optional string providing additional context or guidance for the user.
   */
  helperText?: string;
  /*
   *An optional string indicating the label for the input field..
   */
  label?: string;
  /*
   * An optional boolean indicating whether the input field is required.
   */
  isRequired?: boolean;
  /*
   * An optional boolean indicating whether the input field is invalid.
   */
  isInvalid?: boolean;
  /*
   * An optional React node representing an icon to display on the left side of the input field.
   */
  leadingIcon?:React.ReactNode;
  leadingIconClassName?: string;
  /*
   * An optional React node representing an icon to display on the right side of the input field.
   */
  trailIcon?:React.ReactNode;
  trailIconClassName?: string;
  /*
   * An optional React node representing an element to display on the right side of the input field
   */
  trailElement?: React.ReactNode;
  /*
   * IAn optional React node representing an icon to display during loading or processing
   */
  loadingIcon?:React.ReactNode;
  loadingIconClassName?: string;
  /*
   * An optional React node representing an element to display on the left side of the input field
   */
  leadingElement?: React.ReactNode;
  /*
   *An optional string literal type indicating the position(s) to display the `loadingIcon`
   */
  loaderPosition?: 'left' | 'right' | 'both';

  /**
   * Id required for easier testing using cyprees and jest
   * See More: {@link https://docs.cypress.io/guides/references/best-practices#Selecting-Elements}
   */
  testid?: string;
}

// export type SlugInputProps = Omit<CommonInputProps, 'onChange'> & {
//   onChange?: (e: { slug: string | undefined; value: string | undefined }) => void;
//   type: 'slug';
//   slugOptions: {
//     label: string;
//     value: string;
//   }[];
// };

export type OtherKindInputProps = CommonInputProps & {
  type?: HTMLInputTypeAttribute;
  slugOptions?: never;
  onClear?: () => void;
};

export type InputProps = OtherKindInputProps;
