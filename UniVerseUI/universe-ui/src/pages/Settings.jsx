import { useState } from 'react';
import { useSocket } from '../hooks/useSocket'

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [pendingChanges, setPendingChanges] = useState(false);
  const { unsubscribeFromGeneralNotifications, subscribeToGeneralNotifications } = useSocket();

  const handleSave = () =>{
    switch(selectedOption){
      case 'Off': 
        unsubscribeFromGeneralNotifications();
        break;
      case 'On': 
        subscribeToGeneralNotifications();
        break;
    }
    setPendingChanges(false);
  }

  return (
    <div className='settings-container'>
      <h2>Settings</h2>
      <div className='notification-settings-container'>
        General Notifications: 
        <select value={selectedOption} onChange={(e) => {setPendingChanges(true); setSelectedOption(e.target.value)}} name="notificationOptions" className='notification-settings-select'>
          <option value="On">On</option>
          <option value="Off">Off</option>
        </select>
      </div>
      {pendingChanges && <span>You have unsaved changes</span>}
      <button onClick={handleSave} className='confirm-button'>Save</button>
    </div>
  )
}

export default Settings
