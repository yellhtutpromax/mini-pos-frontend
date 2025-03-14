import React from 'react';
import {Spinner} from "@nextui-org/react";

export const Loading = React.memo(() => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner
        label={<span>Loading...</span>}
        color={"primary"}
      />
    </div>
  );
});
