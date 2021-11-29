import { themeChange } from 'theme-change'
import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import Modal from './components/Modal';

const TWITTER_HANDLE = '_indras_net_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

//const OPENSEA_LINK = '';
//const TOTAL_MINT_COUNT = 50;

function App() {

    const [currentAccount, setCurrentAccount] = useState("");
    
    const checkIfWalletIsConnected = async () => {
      const { ethereum } = window;

      if (!ethereum) {
          console.log("Make sure you have metamask!");
          return;
      } else {
          console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          setCurrentAccount(account)
      } else {
          console.log("No authorized account found")
      }
  }

  /*
  * Implement connectWallet method to connect to MetaMask
  */
  const connectWallet = async () => {
    try {

      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      *  Request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * This prints out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 

    } catch (error) {
      console.log(error)
    }
  }

  // Render Methods
  // cta-button connect-wallet-button
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="btn btn-primary">
      Connect to Metamask
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
    themeChange(false);
  }, [])

  /*
  * Only show Connect to Wallet if we're not already conencted.
  */
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">NFTSouls - Randomly Generated NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          <p>
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <a href='/components/modal#my-modal' class="btn btn-primary">I want one!</a> 
          )}
          </p>
        </div>
       <Modal/>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};


export default App;