import { themeChange } from 'theme-change'
import React, { useEffect, useState } from "react";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import { ethers } from 'ethers';
import threeRandomWordsNft from './utils/ThreeRandomWordsNFT.json'
const TWITTER_HANDLE = '_indras_net_';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

//const OPENSEA_LINK = 'testnets.opensea.io';
//const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x4CfD7b12f2E925d4403493B80A81670ba3940368"

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
    let chainId = await ethereum.request({ method: 'eth_chainId' });
    console.log("Connected to chain " + chainId);
    
    // String, hex code of the chainId of the Rinkebey test network
    const rinkebyChainId = "0x4"; 
    if (chainId !== rinkebyChainId) {
      alert("You are not connected to the Rinkeby Test Network!");
    }

    if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)

        // If the user comes to our site and ALREADY has metamask connected and authorized,
        // we need to set up the event listener at that point.
        setupEventListener();

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
      
      // Setup the listener in the event the user ocmes to the site and connects their wallet for the first time
      setupEventListener();

    } catch (error) {
      console.log(error)
    }
  }

  // Set up our event listener.
  const setupEventListener = async () => {
    // really similar to our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, threeRandomWordsNft.abi, signer);
        
        // This captures our event that will be thrown when the contract is engaged with by the signer
        // its basically a webhook
        connectedContract.on("NewThreeRandomWordNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`);
        });

        console.log("Event listener set up");
      } else {
        console.log("Ethereum object doesn't exist, so we can't setup the event listener");
      }

    } catch (error){
      console.log(error);
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
            Each one is unique. Mint you randomized NFT today!
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
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};


export default App;