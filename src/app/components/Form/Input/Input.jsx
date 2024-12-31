import {Input} from "@nextui-org/input";

export const ThemeInput = () => {
  return (
    <>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          classNames=""
          label="Email"
          type="email"
          isRequired={true}
          isInvalid={true}
          errorMessage="Please enter a valid email"
          placeholder="Enter your email"
        />
      </div>
    </>
  )
}
