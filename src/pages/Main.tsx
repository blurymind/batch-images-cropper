import {useEffect, useRef, useState} from "react";
import "../App.css";
import Cropper from "../component/Cropper";
import Select from "../component/Select";
import About from "../component/About";

const cropSizePresets = [
    {name: "Custom", value: null},
    {name: "256x256", value: {width: 256, height: 256}},
    {name: "512x512", value: {width: 512, height: 512}},
]

function Main({ appName, aboutText } :any) {
    const [files, setFiles] = useState<any[]>([]);
    const [crops, setCrops] = useState({});
    const [croppedImages, setCroppedImages] = useState<any>({});
    const [cropSize, setCropSize] = useState<any>(null);
    const [keepRatio, setKeepRatio] = useState(true)
    const [resizeOnExport, setResizeOnExport] = useState(true)
    const inputRef = useRef(null);

    const onSetCropped = (index: number, croppedImage: any) => {
        setCroppedImages((prev: any) => ({ ...prev, [index]: croppedImage }));
    };

    const onSetFiles = (input: Array<any>)=>{
        const newFiles = input? Object.values(input): [];
        if(newFiles.length === 0) return;
        console.log("set new files", {input, files, newFiles})
        setFiles(prev=>newFiles.length > 0 ? ([...prev, ...newFiles]) : newFiles)
    }

    const onRemoveImage = (index: number) =>{
        console.log("remove", {index, files, croppedImages})
        setFiles(prev=> prev.filter((_,i)=>i !== index));
    }

    console.log({crops})
    useEffect(()=>{
        //@ts-ignore
        if(files.length === 0 && inputRef?.current?.value){
            //@ts-ignore
            inputRef.current.value = ""
        }
    }, [files])

    // console.log({croppedImages})
    const onSetAllToCrop = () => {
        setCrops((prevCrops: any)=> {
            const newCrops:any = {}
            Object.keys(prevCrops).forEach(key=>{
                newCrops[key] = {...prevCrops[key], ...cropSize}
            })
            return newCrops;
        })
    }

    const onSaveCropped = () => {
        Object.values(crops).forEach((crop: any)=>{
            const resizeImageToCrop = resizeOnExport && cropSize != null && cropSize.width === cropSize.height ? cropSize : crop;
            const image = crop?.image
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = resizeImageToCrop.width;
            canvas.height = resizeImageToCrop.height;
            const ctx: any = canvas.getContext("2d");
            console.log("Export", {crops, files, crop, image, resizeImageToCrop})
            const pixelRatio = window.devicePixelRatio;
            canvas.width = resizeImageToCrop.width * pixelRatio;
            canvas.height = resizeImageToCrop.height * pixelRatio;
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
                resizeImageToCrop.width,
                resizeImageToCrop.height
            );
            const base64Image = canvas.toDataURL("image/jpeg");
            const link = document.createElement('a');
            link.download = crop?.name;
            link.href = base64Image;
            link.click();
        })
    }

    const onSelectSomeFiles = ()=> {
        //@ts-ignore
        inputRef?.current?.click();
    }
    return (
        <div style={{overflow: "auto", width: "100%", height: "100vh",
            padding: "0 0 4 0",
            background: "repeating-linear-gradient(45deg, rgb(10 10 10 / 90%), rgb(5 5 5 / 90%) 3px, rgb(0 0 0 / 90%) 3px, rgb(0 0 0 / 90%) 6px)"
        }}>
            <div className={files.length > 0 ? "top-header" : undefined} style={{display: "flex", justifyContent: "space-between", position: "sticky", top: 0, left: 0, zIndex: 999}}>
                <div style={{display: "flex", justifyContent: "space-between", gap: 6, position: "relative"}}>
                    {files.length > 0 && (
                        <>
                            <div className="app-logo" title={appName + aboutText}>{appName}</div>
                            <div title={files.length + " files"}>{files.length} files</div>
                            <button onClick={onSelectSomeFiles} className="button">Add</button>
                        </>
                    )}
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e: any) => {
                            onSetFiles(e.target.files);
                        }}
                        ref={inputRef}
                        className="file-input"
                        style={{display: "none"}}
                    />
                </div>
                {files.length > 0 && (
                    <div style={{display: "flex", justifyContent: "space-between", gap: 4, height: "fit-content", alignItems: "center"}} className="exporter-settings">
                        <button onClick={onSetAllToCrop}>Set all to</button>
                        <Select selectItems={cropSizePresets} selectId="crop-presets" onSelect={setCropSize}/>
                        <div onClick={()=> setKeepRatio((prev:boolean) => !prev)} className="checkbox">
                            <input type="checkbox"  checked={keepRatio}/>
                            <div className="box-bg">Keep ratio</div>
                        </div>
                        {cropSize && keepRatio && (
                            <div onClick={()=> setResizeOnExport((prev:boolean) => !prev)} className="checkbox" title="This will resize the exported images when on">
                                <input type="checkbox"  checked={resizeOnExport}/>
                                <div className="box-bg">Resize to {cropSize.width}x{cropSize.height}</div>
                            </div>
                        )}
                        <button onClick={onSaveCropped} className="export-button">Export Images</button>

                    </div>
                )}
            </div>

            <>
                <div style={{display: "flex", flexWrap: "wrap", gap: "0.2rem", padding: "0.2rem", color: "white"}}>
                    {files.length === 0 && (
                        <About aboutText={aboutText} appName={appName}>
                            <h1 onClick={onSelectSomeFiles}
                                className="select-some-files"
                            >❤️ Select some files</h1>
                        </About>
                    )}
                    {files.map((file, index) => file && (
                        <Cropper
                            key={file?.name + index}
                            cropSize={cropSize}
                            file={file}
                            index={index}
                            onSetCropped={onSetCropped}
                            onRemoveImage={onRemoveImage}
                            crops={crops}
                            setCrops={setCrops}
                            keepRatio={keepRatio}
                        />
                    ))}
                </div>

                {Object.values(croppedImages).map(
                    (croppedImage) =>
                        croppedImage && <img src={croppedImage as any} alt="uploaded"></img>
                )}

            </>
        </div>
    );
}

export default Main;
