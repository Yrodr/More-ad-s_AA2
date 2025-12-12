import React, { useState } from 'react';

const ProfileUpload = ({ onImageChange }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      if(onImageChange) onImageChange(file);
    }
  };

  return (
    <div className="profile-upload-container">
      <input 
        type="file" 
        id="profile-picture" 
        className="file-input" 
        accept="image/*" 
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      
      <label htmlFor="profile-picture" className="profile-label">
        {preview ? (
          <img src={preview} alt="Preview" className="profile-preview" />
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 8 }}>
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
            <span style={{ fontSize: '13px', fontWeight: 500 }}>Adicionar Foto</span>
          </>
        )}
      </label>
    </div>
  );
};

export default ProfileUpload;