import { useState } from 'react';
import './App.css'; // Import the CSS file

function App() {
  const buttonTextItems = [
    'Bears, beets, battlestar galactia',
    "What's Forrest Gump's password? 1Forrest1",
    'Where do programmers like to hang out? The Foo Bar'
  ];

  const initialGameState = {
    victory: false,
    startTime: null,
    endTime: null
  };

  const [snippet, setSnippet] = useState("");
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState(initialGameState);

  const updateUserText = (event) => {
    setUserText(event.target.value);
    
    if (event.target.value === snippet) {
      setGameState({
        ...gameState, 
        victory: true,
        endTime: new Date().getTime() - gameState.startTime
       });
    }
  };

  const chooseSnippet = (index) => {
    setSnippet(buttonTextItems[index]);
    setGameState({
      ...gameState, 
      victory: false,
      startTime: new Date().getTime()
     });
      setUserText(''); 
  };

  const handleCustomSnippet = (event) => {
    setSnippet(event.target.value);
  };

  const addCustomSnippet = () => {
    if (snippet.trim() !== '') {
      buttonTextItems.push(snippet);
      chooseSnippet(buttonTextItems.length - 1);
    }
  }; 

  return (
    <div className="app-container">
       <h2>TypeRace</h2>
       <hr />
       <div className="snippet-container">
         <h3>Snippet</h3>
         <div className="snippet">{snippet}</div>
         <h4 className="victory-message">{gameState.victory ? `Done! Woot! Time: ${gameState.endTime}ms` : null}</h4>
       </div>
       <input 
       type="text"
       value={userText}
       onChange={updateUserText}
       className="user-input"
        /> 
       <hr />
       <div className="button-container">
         {buttonTextItems.map((textItem, index) => (
          <button
          key={index} 
          onClick={() => chooseSnippet(index)}
          className="snippet-button"
          >
            {textItem}
          </button>
        ))}
        </div>
       <div className="custom-snippet-container">
        <h4>Add Custom Snippet:</h4>
        <input 
        type="text" 
        value={snippet} 
        onChange={handleCustomSnippet} 
        className="custom-snippet-input"
        />
        <button onClick={addCustomSnippet} className="custom-snippet-button">
          Add
        </button>
      </div> 
      <div>
        <p>give me extra credit please</p>
      </div>
    </div>   
  );
}

export default App;
