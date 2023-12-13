import { useEffect, useState } from "react"
import ErrorFallback from "./fallbacks/ErrorFallback";

const CreatePostForm = ({setCreatingPost, createPost}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [isTitleError, setIsTitleError] = useState(false);
  const [isContentError, setIsContentError] = useState(false);

  useEffect(() => {
    setIsTitleError(false);
  }, [title])

  useEffect(() => {
    setIsContentError(false);
  }, [content])

  useEffect(() => {
    if(!isTitleError && !isContentError) {
      setIsError(false);
      setError('');
    }
  }, [isTitleError, isContentError])

  const handleSubmit = () => {
    if(title === ''){
      setIsTitleError(true);
    }
    if(content === ''){
      setIsContentError(true);
    }

    if(title === '' || content === ''){
      setIsError(true);
      setError('Fields cannot be empty');
      return;
    }

    setCreatingPost(false); 
    createPost(title, content, image);
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  return (
    <div className='create-post'>
      <input 
        className={`create-post-input ${isTitleError ? 'create-post-input-error' : ''}`}
        type="text"
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder='Title'
      />
      <textarea 
        className={`create-post-textarea ${isContentError ? 'create-post-input-error' : ''}`}
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
        onClick={handleSubmit}>
          Confirm
      </button>
      {isError && <ErrorFallback error={error}/>}
    </div>
  )
}

export default CreatePostForm