const Modal = () => {
    return(
    <div id="my-modal" className="modal">
          <div className="modal-box">
            <p>Make sure your Metamask wallet is connected to the Rinkeby test network! You can get free test Ether from a faucet;<br/> try <a href='https://faucet.rinkeby.io/' target='_blank' className='link-accent'>here</a> or <a href='https://rinkeby-faucet.com/' target='_blank' className='link-accent'> here</a>.</p> 
            <div className="modal-action">
              <a href="/components/modal#">
              <button onClick={askContractToMintNft} className="btn btn-primary">
                      Mint your NFT
                    </button></a>
              <a href="/components/modal#" className="btn">Close</a>
            </div>
          </div>
      </div>
    );
}

export default Modal;