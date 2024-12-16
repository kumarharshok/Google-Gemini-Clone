import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'




const Main = () => {
    const {
        input,
        setInput,
        recentPrompt,
        prevPrompts,
        showResult,
        loading,
        resultData,
        onSent,
      } = useContext(Context);



    const handleChange = (e) => {
      setInput(e.target.value); // Update input state on change
    };
  
    const handleSend = () => {
      if (input.trim() === "") {
        console.log("Input is empty. Please enter a prompt.");
        return;
      }
      onSent(input); // Call onSent with the current input value
    };

  return (
    <div className='main'>
        <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />    
        </div>
        <div className="main-container">

            {!showResult
            ? <>
            <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful Places to see on an upcoming roadt trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            : <div className='result'>
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading ? (<div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    ): (<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    )}
                </div>
            </div>
        }


            
            <div className="main-bottom">
                <div className="search-box">
                    <input 
                    type="text" 
                    value={input}
                    placeholder='Enter a prompt here'
                    onChange={handleChange} />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img
                        onClick={handleSend}
                        src={assets.send_icon} alt="" />: null }
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info, including about people, so double-check its response. Your privacy and Gemini Apps
                </p>
            </div>
        </div>        
    </div>
  )
}

export default Main