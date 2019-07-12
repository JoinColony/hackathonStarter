// This is what will become a part of ColonyJS - The Extended Colony Protocol

// It will make the Colony Network more human usable with functionality for
// non-consensus-relevant contexts by enriching the data stored on chain with
// metadata (which might be too expensive to store on chain).

// It helps developers building on the Colony Network provide a web 2.0 like
// user experience, without compromising decentralisation.

const IPFS = require('ipfs');

const { Buffer } = IPFS;

let node;

const waitForIPFS = () => {
  node = new IPFS({
    repo: './tmp/ipfs/data',
    start: false,
  });
  return new Promise((resolve, reject) => {
    node.on('ready', () => resolve(true));
    node.on('error', err => reject(err));
  })
};

exports.init = async () => {
  if (node) {
    // eslint-disable-next-line no-console
    console.warn('Using existing IPFS node');
    return node;
  }
  await waitForIPFS();
  return node.start();
}

exports.saveHash = async (obj) => {
  const data = Buffer.from(JSON.stringify(obj));
  const result = await node.add(data);
  return result[0].hash;
}

exports.getHash = async (hash) => {
  const buf = await node.cat(`/ipfs/${hash}`);
  let obj;
  try {
    obj = JSON.parse(buf.toString());
  } catch (err) {
    throw new Error(`Could not get hash ${hash}`);
  }
  return obj;
}

exports.stop = async () => {
  try {
    await node.stop();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('IPFS failed a clean stop', error);
  }
}
