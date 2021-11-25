import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import heroImg from './assets/hero.png'
import myEpicNft from './utils/MyEpicNFT.json';
import { ethers } from "ethers";
const TWITTER_HANDLE = '_indras_net_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
//const OPENSEA_LINK = '';
//const TOTAL_MINT_COUNT = 50;

const App = () => {

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

  // Method for minting the NFT
  const askContractToMintNft = async () => {
    // Deployed Rinkeby contract address. 
    // Use .env environment variables to change this later if we want to switch between test networks and mainnet
    const CONTRACT_ADDRESS = "0xAAcbc249CbC9fA33bC32163FB63f88fe4Ccbc9C2"
    try {
      // We will have access to an window.Ethereum object if signed in via Metamask
      const { ethereum } = window;

      if(ethereum) {
        // A "Provider" helps us talk to Eth nodes
        // See: https://docs.ethers.io/v5/api/signer/#signers
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Create the connection to our contract
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
        
        // Now we call our contract's method 
        console.log("Going to pop wallet open to pay gas...");
        let nftTxn = await connectedContract.makeAnEpicNFT();

        // Wait for it to be mined
        console.log("Mining...please wait.");
        await nftTxn.wait();

        // And output the transaction hash
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`)

      } else {
        console.log("Ethereum object doesn't exist!");
      }        
    } catch (error) {
      console.log(error);
    }
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Metamask
    </button>
  );

  // styles
  const imgStyle = {
    width: '225px',
    position: 'absolute',
    right: '0',
    left: '0',
    top: '0',
    bottom: '0',
    margin: 'auto auto'
  };

  const imageContainer = {
    width: '500px',
    height: '500px',
    position: 'relative'
  };

  useEffect(() => {
    checkIfWalletIsConnected();
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
          {currentAccount === "" ? (
            renderNotConnectedContainer()
          ) : (
            <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
              Mint your NFT
            </button>
          )}
        </div>
        <div className = "container" style={imageContainer}>
          <img src={heroImg} alt="Hero Logo" style={imgStyle}/>
        </div>
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