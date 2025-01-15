"use client"
import {Card, Button, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const ReloadIcon = ({ fill = "currentColor", size = 24, height, width, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      width={width || size}
      height={height || size}
      viewBox="0 0 24 24"
      {...props} // Pass any additional props to the SVG
    >
      <path
        d="M1,12A11,11,0,0,1,17.882,2.7l1.411-1.41A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707l1.128-1.128A8.994,8.994,0,0,0,3,12a1,1,0,0,1-2,0Zm21-1a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9,8.9,8.9,0,0,1-4.42-1.166l1.127-1.127A1,1,0,0,0,8,17H4a1,1,0,0,0-1,1v4a1,1,0,0,0,.617.924A.987.987,0,0,0,4,23a1,1,0,0,0,.707-.293L6.118,21.3A10.891,10.891,0,0,0,12,23,11.013,11.013,0,0,0,23,12,1,1,0,0,0,22,11Z"
      />
    </svg>
  );
};

export default function systemHealthCheck() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background ">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://cdn-icons-png.flaticon.com/512/11119/11119924.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md text-white">Network Error: </p>
            <p className="text-small text-default-500">Endpoint issue found</p>
          </div>
          <div className="ml-auto">
            <Button
              isIconOnly
              aria-label="Take a photo"
              variant="faded"
              onClick={() => window.location.reload()} // Reloads the page
            >
              <ReloadIcon />
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="py-12 text-white">
          <p>The API server might be offline due to maintenance, unexpected crashes, or hosting issues.</p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link isExternal showAnchorIcon href="">
            Go to API server .
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
