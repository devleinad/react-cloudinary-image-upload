import axios from 'axios';
import React,{useState} from 'react';

const cloudinary_credentials = {
    cloud_name:"YOUR_CLOUD_NAME",
    cloudinary_api_key:"YOUR_CLOUDINARY_API_KEY",
    cloudinary_upload_preset:"YOUR_CLUDINARY_UPLOAD_PRESET",
}

const cloudinary_upload_url = `https://api.cloudinary.com/v1_1/${cloudinary_credentials.cloud_name}/image/upload`;

function App() {
    const [is_uploading,setIsUploading] = useState(false);
    const [image,setImage] = useState();
    const [uploadedImageUrl,setUploadedImageUrl] = useState(null);

    const handleUploadImageToCloudinary = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        if(!image){
            alert("Please select a file for upload");
        }
        const form_data = new FormData();
        form_data.append('file', image);
        form_data.append('cloud_name',cloudinary_credentials.cloud_name);
        form_data.append('api_key',cloudinary_credentials.cloudinary_api_key);
        form_data.append('upload_preset', cloudinary_credentials.cloudinary_upload_preset);
        const response = await axios.post(cloudinary_upload_url,form_data,{
            withCredentials:false,
            headers:{
                "X-Requested-With": "XMLHttpRequest"
            }
        });
        const url = await response.data.url;
        if(url){
            setIsUploading(false);
            setUploadedImageUrl(url);
        }
        else{
            setIsUploading(false);
            alert("No url was returned!");
        }
       
    }


    return (
        <div>
            <form onSubmit={handleUploadImageToCloudinary}>
                <label>Select image for upload</label>
                <input type="file" name='image'
                accept='image/*' 
                 onChange={(e) => setImage(e.target.files[0])} />
                 <button type='submit' style={{marginTop:5}}>Upload</button>
                {is_uploading && <div><small>Uploading.....</small></div>}
                {uploadedImageUrl && <div><img src={uploadedImageUrl} style={{marginTop:10}} width={300} alt='Uploaded'/></div>}
            </form>
        </div>
    )
}

export default App;
