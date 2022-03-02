import { ethers } from 'ethers';
import { useState } from 'react';

function WalletBalance({ user, signOut, auth }) {
  const [balance, setBalance] = useState();

  const getBalance = async () => {
    const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {' '}
          {user}&apos;s Wallet: {balance}
        </h5>
        <button type="button" className="btn btn-success" onClick={() => getBalance()}>
          Show Wallet Balance
        </button>
        &nbsp;
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            signOut(auth)
              .then(() => {
                console.log('user signed out');

                //   window.location.reload();
              })
              .catch((err) => {
                console.log(err.message);
              });
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default WalletBalance;
