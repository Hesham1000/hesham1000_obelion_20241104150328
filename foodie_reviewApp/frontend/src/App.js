import React from 'react';
import AccountCreation from './src/components/AccountCreation/AccountCreation.js';
import Login from './src/components/Login/Login.js';
import ReviewSubmission from './src/components/ReviewSubmission/ReviewSubmission.js';
import Search from './src/components/Search/Search.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the React App</h1>
      </header>
      <main>
        <AccountCreation />
        <Login />
        <ReviewSubmission />
        <Search />
      </main>
    </div>
  );
}

export default App;
