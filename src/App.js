import { themeChange } from 'theme-change'
import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from 'ethers';
import threeRandomWordsNft from '../utils/ThreeRandomWordsNFT.json'
const TWITTER_HANDLE = '_indras_net_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

//const OPENSEA_LINK = 'testnets.opensea.io';
//const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x93F312De7e1C3097FA20792C3da0E1c8983D4f3a"

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

  // Method for minting the NFT
  const askContractToMintNft = async () => {
    // Deployed Rinkeby contract address. 
    // Use .env environment variables to change this later if we want to switch between test networks and mainnet
    try {
      // We will have access to an window.Ethereum object if signed in via Metamask
      const { ethereum } = window;

      if(ethereum) {
        // A "Provider" helps us talk to Eth nodes
        // See: https://docs.ethers.io/v5/api/signer/#signers
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        // Create the connection to our contract
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, threeRandomWordsNft.abi, signer);
        
        // Now we call our contract's method 
        console.log("Going to pop wallet open to pay gas...");
        let nftTxn = await connectedContract.makeAnNFT();

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
        <div id="my-modal" class="modal">
          <div class="modal-box">
            <p>Make sure your Metamask wallet is connected to the Rinkeby test network! You can get free test Ether from a faucet;<br/> try <a href='https://faucet.rinkeby.io/' target='_blank' className='link-accent'>here</a> or <a href='https://rinkeby-faucet.com/' target='_blank' className='link-accent'> here</a>.</p> 
            <div class="modal-action">
              <a href="/components/modal#">
              <button onClick={askContractToMintNft} className="btn btn-primary">
                      Mint your NFT
                    </button></a>
              <a href="/components/modal#" class="btn">Close</a>
            </div>
          </div>
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