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

  return (
    <div className="flex items-center justify-center w-full h-full my-3 bg-gray-300 border h-2/3" onClick={handleUploadClick} style={{ cursor: 'pointer' }}>
      {image ? (
        <div className='w-full h-full'>
          <img className='w-full h-full' src={URL.createObjectURL(image)} alt="Uploaded" style={{ maxWidth: '300px' }} />
        </div>
      ) : (
        <>
        {/* <div> 이미지 업로드</div> */}
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
    </div>
  );
}

export default ImageUploader;