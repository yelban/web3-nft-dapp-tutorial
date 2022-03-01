const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('MyNFT', () => {
  it('Should mint and transfer an NFT to someone', async () => {
    const TABCerts = await ethers.getContractFactory('TABCerts');
    const tabCerts = await TABCerts.deploy();
    await tabCerts.deployed();

    const recipient = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';
    const metadataURI = 'cid/test.png';

    let balance = await tabCerts.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await tabCerts.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther('0.05'),
    });

    // wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await tabCerts.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await tabCerts.isContentOwned(metadataURI)).to.equal(true);
    const newlyMintedToken2 = await tabCerts.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') });
  });
});
