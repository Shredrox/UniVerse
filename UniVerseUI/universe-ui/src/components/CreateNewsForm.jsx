import { useState } from 'react';

const CreateNewsForm = ({setIsAddingNews, addNewsMutation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  const handleCreateNews = async () =>{
    const requestData = new FormData();
    requestData.append('title', title);
    requestData.append('content', content);
    if(image !== null){
      requestData.append('image', image);
    }
    requestData.append('pinned', pinned);

    await addNewsMutation(requestData);

    setIsAddingNews(false);
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleCancel = () =>{
    setIsAddingNews(false);
  }

  return (
    <div className="profile-edit-container">
      <label 
        htmlFor="file"
        className="profile-page-add-image">
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
      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title'/>
      <textarea className="edit-textarea" value={content} onChange={(e) => setContent(e.target.value)} type="text" placeholder='Content' />
      <div className="pinned">
        Pinned: <input type="checkbox" checked={pinned} onChange={() => setPinned(!pinned)} />
      </div>
      
      <div className="profile-edit-button-container">
        <button onClick={handleCancel} className="confirm-button">Cancel</button>
        <button onClick={handleCreateNews} className="confirm-button">Save</button>
      </div>
    </div>
  )
}

export default CreateNewsForm