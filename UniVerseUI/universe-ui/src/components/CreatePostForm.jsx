import { useState } from "react"

const CreatePostForm = ({setCreatingPost, createPost}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  return (
    <div className='create-post'>
      <input 
        type="text"
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder='Title'
      />
      <textarea 
        type="text" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder='Content'
      />
      <label 
        htmlFor="file"
        className="create-post-add-image">
        {image ? "Change Image" : "Add Image"}
      </label>
      {image && <label>{imageName}</label>}
      <input 
      	type="file"
        id="file"
        accept="image/*"
        style={{display: "none"}}
        onChange={handleImageChange}
      />
      {image &&
      <div className="create-post-image-container">
        <button 
          onClick={() => setImage(null)}>
            X
        </button>
        <img src={URL.createObjectURL(image)} alt="PostImagePreview"/>
      </div> 
      }
      <button 
        className="confirm-button"
        onClick={() => {setCreatingPost(false); createPost(title, content, image);}}>
          Confirm
      </button>
    </div>
  )
}

export default CreatePostForm