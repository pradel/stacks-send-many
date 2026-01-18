import { typedCallReadOnlyFunction } from 'clarity-abitype';
import { BNS_CONTRACT_ADDRESS, BNS_CONTRACT_NAME, NETWORK } from './constants';
import { bnsV2Abi } from './abi';

export const getNameFromAddress = async (addr: string) => {
  const result = await typedCallReadOnlyFunction({
    abi: bnsV2Abi,
    contractAddress: BNS_CONTRACT_ADDRESS,
    contractName: BNS_CONTRACT_NAME,
    functionName: 'get-primary',
    functionArgs: [addr],
    senderAddress: addr,
    network: NETWORK,
  });
  return result;
};

export const getNameInfo = async (fqName: string) => {
  const [name, namespace] = fqName.split('.');
  const result = await typedCallReadOnlyFunction({
    abi: bnsV2Abi,
    contractAddress: BNS_CONTRACT_ADDRESS,
    contractName: BNS_CONTRACT_NAME,
    functionName: 'get-bns-info',
    functionArgs: [
      `0x${Array.from(new TextEncoder().encode(name))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')}`,
      `0x${Array.from(new TextEncoder().encode(namespace))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')}`,
    ],
    senderAddress: BNS_CONTRACT_ADDRESS,
    network: NETWORK,
  });
  console.log({ result });
  return result;
};
