import Card from "../../ui/card/Card";
import {AiOutlineCloudUpload} from "react-icons/ai";
import {BsTrash} from "react-icons/bs";

const UploadWidget = () => {

    const addImages = ()=>{

    };

    return ( 
        <div>
            <Card className={"formcard group"}>
                <label htmlFor="" className="uploadWidget">
                    <AiOutlineCloudUpload size={35} />
                    <br />
                    <span>Click to upload up to 5 images</span>
                    <input type="file" name="images" onChange={addImages} multiple  accept="image/png,image/jpg,image/jpeg, image/webp"  />
                </label>
                <br />
            </Card>
        </div>
     );
}
 
export default UploadWidget;