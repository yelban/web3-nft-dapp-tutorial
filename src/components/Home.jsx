import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import TABCerts from '../artifacts/contracts/MyNFT.sol/TABCerts.json';
import WalletBalance from './WalletBalance';

const contractAddress = '0xd8DD9A4DF405007a1cc36A95244c070233e67aFa';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, TABCerts.abi, signer);

function Home() {
  const [totalMinted, setTotalMinted] = useState(0);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await contract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <WalletBalance />

      <h1>AUO Art NFT Collection</h1>
      <div className="container">
        <div className="row">
          {Array(totalMinted + 1)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="col-sm">
                <NFTImage tokenId={i} getCount={getCount} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmSs5rywjUexihZf5uhyqwiYfDqFxXTSWTmkjh8ETAg2gM';
  const metadataURI = `${contentId}/${tokenId}.json`;
  const imageURI = `https://cloudflare-ipfs.com/ipfs/QmTfyPzjCudY4PuMmxEpDKqvZqS6gkcDGfXFLHouZCvrYw/${tokenId}.gif`;
  //   const imageURI = `img/${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await contract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther('0.001'),
    });

    await result.wait();
    getMintedStatus();
    getCount();
  };

  async function getURI() {
    const uri = await contract.tokenURI(tokenId);
    alert(uri);
  }
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img className="card-img-top" alt="NFT" src={isMinted ? imageURI : 'img/placeholder.png'} />
      <div className="card-body">
        <h5 className="card-title">ID #{tokenId}</h5>
        {!isMinted ? (
          <button type="button" className="btn btn-primary" onClick={mintToken}>
            Mint
          </button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={getURI}>
            Taken! Show URI
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
