"use client";
 
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
 
export default function Upload() {
  return (
	<UploadDropzone<OurFileRouter>
		endpoint="profilePicture"
		onClientUploadComplete={(res) => {
			// Do something with the response
			console.log("Files: ", res);
			alert("Upload Completed");
		}}
		onUploadError={(error: Error) => {
			// Do something with the error.
			alert(`ERROR! ${error.message}`);
		}}
	/>
  );
}