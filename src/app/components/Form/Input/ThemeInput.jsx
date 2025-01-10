import {Input} from "@nextui-org/input";

export const ThemeInput = ({
                             customClassName = "bg-background",  // Default empty string if no class is passed
                             label = "Example",
                             type = "text",        // Default type to text
                             name = "example",
                             id,          // Unique identifier for the input
                             value,
                             onChange,
                             onBlur,
                             onFocus,
                             disabled = false,     // Default to false if not provided
                             isRequired = false,   // Allow custom control over 'isRequired'
                             isInvalid = false,    // Allow custom control over 'isInvalid'
                             errorMessage = "",    // Custom error message
                             placeholder = " ",     // Custom placeholder text
                           }) => {
  return (
    <>
      <div>
        <label htmlFor={`${id}`} className="text-white">{label}</label>
      </div>
      <Input
        radius={'sm'}
        type={type}
        className={`${customClassName}`}  // You can still add a default class
        classNames={{
          inputWrapper: "h-12 mt-1 text-sm bg-background dark:bg-foreground text-white text-2xl border border-themeBorder",
          label: "text-white !important"
        }}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        isRequired={isRequired}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        placeholder={placeholder}
        variant="bordered"
      />
    </>
  )
}
