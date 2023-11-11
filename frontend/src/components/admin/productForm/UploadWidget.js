import { useState } from "react";
import Card from "../../ui/card/Card";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";

const upload_preset = process.env.REACT_APP_UPLOAD_PRESET;
const url = "https://api.cloudinary.com/v1_1/dqvlr5gux/image/upload";

const UploadWidget = (props) => {
  const [selectedImages, setSelectedImages] = useState([]); //images frm ur pc
  const [images, setImages] = useState([]); //upload 2 cloudinary
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const addImages = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImages((prevImages) => prevImages.concat(selectedFilesArray));
    setSelectedImages((prevImages) => prevImages.concat(imagesArray));
    e.target.value = "";
  };

  const removeImage = (image) => {
    const imageIndex = selectedImages.indexOf(image);
    setSelectedImages(selectedImages.filter((img) => img !== image));
    setImages(images.filter((img, index) => index !== imageIndex));
    URL.revokeObjectURL(image);
  };

  const uploadImages = async () => {
    //console.log(images)
    setUploading(true);
    let imageUrls = [];

    try {
      const formData =new FormData();
      for (let i = 0; i < images.length; i++) {
        let file = images[i];
        formData.append("file", file);
        formData.append("upload_preset",upload_preset);
        formData.append("folder", "shopitoApp");

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const imgData = await response.json();
        console.log(imgData);
        imageUrls.push(imgData.secure_url);
        setProgress(imageUrls.length);

        if (imageUrls.length === images.length) {
          props.setFiles((prevFiles) => prevFiles.concat(imageUrls));
          setUploading(false);
          console.log(props.files);
          toast.success("Image upload complete");
          setImages([]);
          setSelectedImages([]);
          setProgress(0);
        }
      }
    } catch (error) {
      setUploading(false);
      console.log(error);
      toast.error("Couldn't upload images");
      setImages([]);
      setSelectedImages([]);
      setProgress(0);
    }
  };

  return (
    <div>
      <Card cardClass={"formcard group"}>
        <label htmlFor="" className="uploadWidget">
          <AiOutlineCloudUpload size={35} />
          <br />
          <span>Click to upload up to 5 images</span>
        </label>
        <input
          type="file"
          name="images"
          onChange={addImages}
          multiple
          accept="image/png, image/jpg, image/jpeg, image/webp"
        />
        <br />
        {selectedImages.length > 0 &&
          (selectedImages.length > 5 ? (
            <p className="error">
              You cant upload more than 5 images
              <br />
              <span>
                Remove <b>{selectedImages.length - 5}</b> of them.{" "}
              </span>
            </p>
          ) : (
            <div className="--center-all">
              <button
                className="--btn --btn-danger --btn-large"
                onClick={uploadImages}
                disabled={uploading} 
                >
                {uploading ? `uploading ${progress} of ${images.length}`: `upload ${images.length} image(s)`}
              </button>
            </div>
          ))}
        {/* View selected images */}
        <div className={selectedImages.length > 0 ? "images" : ""}>
          {selectedImages !== 0 &&
            selectedImages.map((image, index) => {
              return (
                <div key={image} className="image">
                  <img src={image} alt="productImage" width={200} />
                  <button className="--btn" onClick={() => removeImage(image)}>
                    <BsTrash size={25} />
                  </button>
                  <p>{index + 1}</p>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
};

export default UploadWidget;
