import {Spinner} from "@nextui-org/react";

export const Loading = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <Spinner
          label={<span className="text-white">Loading...</span>}
                 color="white"
        />
      </div>
    </>
  )
}
