import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'
const Sidebar = () => {



const [extended, setExtended] = useState(false)
const [searchQuery, setSearchQuery] = useState("")
const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)
const [showHelp, setShowHelp] = useState(false);

const toggleHelp = () => {
    setShowHelp(!showHelp);
  };


const loadPrompt = async (prompt)=> {
    console.log('load prompt', prompt)
    setRecentPrompt(prompt)
    await onSent(prompt)
}
 const filteredPrompts = prevPrompts.filter(prompt =>
    prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='sidebar'>
    <div className="top">
      <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
      <div onClick={()=> newChat()} className="new-chat">
        <img src={assets.plus_icon} alt="" />
        {extended ? <p>New Chat</p> : null}
      </div>
      {extended && (
        <div className="recent">
          <p className="recent-title">Recent</p>
          <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          {filteredPrompts.map((item, index) => (
            <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
              <img src={assets.message_icon} alt="" />
              <p>{item.slice(0, 18)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
       <div className="bottom">
        <div className="bottom-item recent-entry" onClick={toggleHelp}>
            <img src={assets.question_icon} alt="" />
           {extended?<p>Help</p> : null} 
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="" />
            {extended?<p>Activity</p>: null }
        </div>
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="" />
            {extended?<p>Setings</p>: null }
        </div>
       </div>
       {showHelp && (
        <div className="help-info">
          <p>Email: harshcseaiml@gmail.com</p>
          <a href="https://www.linkedin.com/in/harsh-kumar-7a4652262/">Linkedin</a>
        </div>
      )}
        </div>
  )
}

export default Sidebar