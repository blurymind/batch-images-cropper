import { useState } from "react";
import "./App.css";
import Cropper from "./component/Cropper";

const ImageCropper = ({ file, index, onSetCropped, croppedImages }: any) => {
  return (
    <div>
      {/* call the cropper */}
      {file && (
        <Cropper
          imageToCrop={URL.createObjectURL(file)}
          croppedImage={(value: any) => onSetCropped(index, value)}
        />
      )}
    </div>
  );
};

function App() {
  const [files, setFiles] = useState<any[]>([]);
  console.log({ files });
  const [croppedImages, setCroppedimages] = useState<any>({});

  const onSetCropped = (index: number, croppedImage: any) => {
    setCroppedimages((prev: any) => ({ ...prev, [index]: croppedImage }));
  };
  return (
    <>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e: any) => {
          setFiles(Object.values(e.target.files));
        }}
      />
      {files.map((file, index) => (
        <ImageCropper
          key={index}
          file={file}
          index={index}
          croppedImages={croppedImages}
          onSetCropped={onSetCropped}
        />
      ))}
      Result
      {Object.values(croppedImages).map(
        (croppedImage) =>
          croppedImage && <img src={croppedImage as any} alt="uploaded"></img>
      )}
    </>
  );
}

export default App;
