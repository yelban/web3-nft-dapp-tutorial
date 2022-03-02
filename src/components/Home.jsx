import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import TABCerts from '../artifacts/contracts/MyNFT.sol/TABCerts.json';
import WalletBalance from './WalletBalance';

// const contractAddress = '0xd8DD9A4DF405007a1cc36A95244c070233e67aFa';
// const contractAddress = '0xbBa888f5423cc3C7Bb4DF084188b478d588c315C';
// const contractAddress = '0xd8DD9A4DF405007a1cc36A95244c070233e67aFa';

// RINKEBY
// const contractAddress = '0xf50a31A53aDbe4643FeA029151bD74Cb5eaF3Be5';
// const contractAddress = '0x5ab5e0600597332013Cd95e81f81496F4eE468c4';
const contractAddress = '0x3eaB12171abDF45467834D50B5E299F434B851a5';

// MATIC
// const contractAddress = '0x3eaB12171abDF45467834D50B5E299F434B851a5';

const provider = new ethers.providers.Web3Provider(window.ethereum);

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, TABCerts.abi, signer);

function Home({ user, setUser, signOut, auth }) {
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
      <WalletBalance user={user} signOut={signOut} auth={auth} />

      <h1 className="my-5 font-bold text-center">TAB NFT Certification</h1>
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
  const contentIdJSON = 'QmTaFEMzPGUF8hqj6QvZoy1UmAvobUFL5z8d7GnXWpS84j';
  const contentIdAssets = 'QmRbwNcf8MKiTUYvfsiDnhN3Mk5JMej1h3W2EaHDmMbEgZ';
  const metadataURI = `${contentIdJSON}/${tokenId}.json`;
  const imageURI = `https://cloudflare-ipfs.com/ipfs/${contentIdAssets}/${tokenId}.png`;
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
