import { cn } from "../../../../core/lib/utils";

interface IMessageProps {
  errorText: string | undefined;
  helperText: string | undefined;
  isDisabled?: boolean;
}

const Message = ({ errorText, helperText, isDisabled }: IMessageProps) => {
  if (errorText) {
    return (
      <div className="flex flex-row items-center mt-1 gap-1">
        <div className="w-max">
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <g id='error-warning-fill'>
              <path
                id='Vector'
                d='M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z'
                fill='#DF1C41'
              />
            </g>
          </svg>
        </div>
        <span className="text-sm text-red-500">
          {errorText}
        </span>
      </div>
    );
  }
  if (helperText) {
    return (
      <div
        className={cn('text-[#DF1C41] text-[13px] flex gap-1 items-center', {
          'text-disabled cursor-not-allowed': isDisabled,
        })}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
        >
          <g id='error-warning-fill'>
            <path
              id='Vector'
              d='M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z'
              fill='#DF1C41'
            />
          </g>
        </svg>
        {helperText}
      </div>
    );
  }
  return null;
};

export { Message };
