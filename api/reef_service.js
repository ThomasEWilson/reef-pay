const { mnemonicGenerate } = require('@polkadot/util-crypto'); 
const { keyring } = require('@polkadot/ui-keyring'); 
const { WsProvider } = require('@polkadot/rpc-provider'); 
const { Provider } = require('@reef-defi/evm-provider'); 
const { Keyring } = require('@polkadot/api'); 

const GAS = 1.5

let evmProvider = new Provider({
    provider: new WsProvider('wss://rpc-testnet.reefscan.com/ws')
});
await evmProvider.api.isReady
await keyring.loadAll({ ss58Format: 42, type: 'sr25519' });

export async function genReefPayAddress() {
    const phrase = mnemonicGenerate(12);
    const { address } = keyring.createFromUri(phrase);
    const keyring_ = new Keyring({ type: 'sr25519' });
    const newPair = keyring_.addFromUri(phrase);

    return { address, newPair }
}

export async function getAddressBalance(address) {
    const balance = await evmProvider.api.derive.balances.all(address)
        .then((res) => res.freeBalance / 1e18)
        .then((res) => res === '0' ? '0' : res);
    console.log(`address:${address}, balance:${balance}`)
    return balance
}

export async function transferToMainAccount(sender, recipient, balance, alicePair) {
    console.log(`transferToMainAccount from:${sender} -> to:${recipient}, balance:${balance}`)
    await evmProvider.api.tx.balances
        .transfer(recipient, BigInt(1e18 * (balance - GAS)))
        .signAndSend(alicePair)
}

