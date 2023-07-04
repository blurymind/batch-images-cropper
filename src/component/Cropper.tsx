import { useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface Props {
  imageToCrop: any;
  croppedImage: any;
}

const Cropper: React.FC<Props> = ({ imageToCrop, croppedImage }) => {
  const [crop, setCrop] = useState<any>({
    maxHeight: 800,
    maxWidth: 400
  });
  const [image, setImage] = useState<any>(null);

  const cropImageNow = () => {
    if (!crop || !image) return;
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx: any = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    croppedImage(base64Image);
  };

  useEffect(() => {
    if (crop && image) cropImageNow();
  }, [crop, image]);

  return (
    <div>
      <div>
        {imageToCrop && (
          <div title={crop.maxWidth}>
            <ReactCrop
              src={imageToCrop}
              onImageLoaded={setImage}
              maxHeight={400}
              maxWidth={400}
              crop={crop}
              onChange={setCrop}
            />
            <br />
            {/* <button onClick={cropImageNow}>Crop</button> */}
            {/* <br /> */}
            {/* <br /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cropper;
