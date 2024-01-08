import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NewsEditForm = ({news, setIsEditOn, updateNewsMutation}) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pinned, setPinned] = useState(false);

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');

  useEffect(() =>{
    if(news !== null){
      setTitle(news.title);
      setContent(news.content);
      setPinned(news.pinned);
    }
  }, [news])

  const handleNewsEdit = async () =>{
    const requestData = new FormData();
    requestData.append('id', news.id);
    requestData.append('title', title);
    requestData.append('content', content);
    if(image !== null){
      requestData.append('image', image);
    }
    requestData.append('pinned', pinned);

    await updateNewsMutation(requestData);

    navigate(`/news/${news.id}`)
    window.location.reload(); 
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  const handleCancel = () =>{
    setIsEditOn(false);
    setPassword('');
  }

  return (
    <div className="profile-edit-container">
      <label 
        htmlFor="file"
        className="profile-page-add-image">
        {image ? "Change Image" : "Update News Image"}
      </label>
      {image && <label>{imageName}</label>}
      <input 
      	type="file"
        id="file"
        accept="image/*"
        style={{display: "none"}}
        onChange={handleImageChange}
      />
      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" />
      <textarea className="edit-textarea" value={content} onChange={(e) => setContent(e.target.value)} type="text" />
      <div className="pinned">
        Pinned: <input type="checkbox" checked={pinned} onChange={() => setPinned(!pinned)} />
      </div>
      
      <div className="profile-edit-button-container">
        <button onClick={handleCancel} className="confirm-button">Cancel</button>
        <button onClick={handleNewsEdit} className="confirm-button">Save</button>
      </div>
    </div>
  )
}

export default NewsEditForm
