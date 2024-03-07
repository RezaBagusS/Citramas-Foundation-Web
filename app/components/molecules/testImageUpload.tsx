"use client";


import imageHelper from "@/app/helpers/imageHelper";
import { CldUploadButton } from "next-cloudinary";

const TestImageUpload = () => {
  const handleUploadSuccess = async (response:any) => {

    const url = response.info.secure_url;

    const res = await imageHelper(url);

    console.log("Upload successful:", res);

  };

  const handleUploadError = (error:any) => {
    console.error("Upload error:", error);
  };

  return (
    <div>
      <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={handleUploadSuccess}
        onError={handleUploadError}
      >
        <span className="px-4 py-1 bg-custPrimary hover:bg-custPrimary/80 text-custWhite">
          Upload
        </span>
      </CldUploadButton>
    </div>
  );
};


export default TestImageUpload;
