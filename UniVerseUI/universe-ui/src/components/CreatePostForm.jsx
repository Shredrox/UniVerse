import { useState } from "react"
import { useForm } from "react-hook-form";

const CreatePostForm = ({setCreatingPost, createPost}) => {
  const {register, handleSubmit, formState: {errors}, resetField} = useForm();

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const onSubmit = (data) => {
    setCreatingPost(false); 
    createPost(data);
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='create-post'>
      <input 
        className={`create-post-input ${errors.title ? 'input-error' : ''}`}
        type="text"
        placeholder='Title'
        {...register("title", {required: "Title is required"})}
      />
      {errors.title && <span style={{color: "red"}}>{errors.title?.message}</span>}
      <textarea 
        className={`create-post-textarea ${errors.content ? 'input-error' : ''}`}
        type="text" 
        placeholder='Content'
        {...register("content", {required: "Content is required"})}
      />
      {errors.content && <span style={{color: "red"}}>{errors.content?.message}</span>}
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
        {...register("image",{
          onChange: (e) => handleImageChange(e)
        })}
      />
      {image &&
      <div className="create-post-image-container">
        <button
          onClick={() => {setImage(null); resetField("image", { defaultValue: null })}}>
            X
        </button>
        <img src={URL.createObjectURL(image)} alt="PostImagePreview"/>
      </div> 
      }
      <button 
        type="submit"
        className="confirm-button">
          Confirm
      </button>
    </form>
  )
}

export default CreatePostForm
