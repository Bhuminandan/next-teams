import { auth } from "@clerk/nextjs";

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const handleAuth = () => {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    return { userId };
}
 
export const ourFileRouter = {
    serverImage : f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
        console.log("Upload complete!")
    }),
    messageFile : f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
        console.log("Upload complete!")
    })
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;