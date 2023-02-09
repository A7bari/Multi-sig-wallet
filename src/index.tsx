import { Web3ReactProvider } from '@web3-react/core';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Web3 from 'web3';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ThemeCustomization from './theme';

const getLibrary = (provider: any) => {
  return new Web3(provider);
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeCustomization>
      <BrowserRouter>
        <Web3ReactProvider getLibrary={getLibrary} >  
            <App />
        </Web3ReactProvider>
      </BrowserRouter>
    </ThemeCustomization>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
