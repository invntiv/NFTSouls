import { ethers } from 'ethers';
import threeRandomWordsNft from '../utils/ThreeRandomWordsNFT.json'

  // Method for minting the NFT
  const askContractToMintNft = async () => {
    // Deployed Rinkeby contract address. 
    // Use .env environment variables to change this later if we want to switch between test networks and mainnet
    const CONTRACT_ADDRESS = "0x93F312De7e1C3097FA20792C3da0E1c8983D4f3a"
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

const Modal = () => {
    return(
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
    );
}

export default Modal;