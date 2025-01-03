import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

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
