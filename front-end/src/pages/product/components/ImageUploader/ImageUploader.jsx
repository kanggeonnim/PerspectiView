import React, { useState, useRef } from 'react';
import { PlusCircleIcon } from 'lucide-react';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleUploadClick = () => {
    if (image) {
      // 이미지가 있는 경우 초기화
      setImage(null);
    } else {
      // 이미지가 없는 경우 파일 업로드 창 열기
      fileInputRef.current.click();
    }
  };

  const handleUploadImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append('uploadImage', image);
      console.log(formData)
      try {
        const response = await fetch('your-upload-url', {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        console.log(data);
        // 이미지 업로드 후 이미지 지우기
        setImage(null);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full my-3 bg-gray-300 border h-2/3" onClick={handleUploadClick} style={{ cursor: 'pointer' }}>
      {image ? (
        <div className='w-full h-full'>
          <img className='w-full h-full' src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '300px' }} />
        </div>
      ) : (
        <>
        <PlusCircleIcon />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        </>
      )}
      {image && <button onClick={handleUploadImage}>이미지 업로드</button>}
    </div>
  );
}

export default ImageUploader;
