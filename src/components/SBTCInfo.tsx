import { useEffect, useState } from 'react';
import { typedCallReadOnlyFunction } from 'clarity-abitype';
import { NETWORK } from '../lib/constants';
import { sbtcRegistryAbi } from '../lib/abi';

export function SBTCInfo({ assetId }: { assetId: string }) {
  const [info, setInfo] = useState<string>();
  // fetch current signer data
  useEffect(() => {
    const fn = async () => {
      const [contractId, _] = assetId.split('::');
      const [contractAddress] = contractId.split('.');
      const response = await typedCallReadOnlyFunction({
        abi: sbtcRegistryAbi,
        contractAddress,
        contractName: 'sbtc-registry',
        functionName: 'get-current-signer-data',
        senderAddress: contractAddress,
        network: NETWORK,
      });

      setInfo(`Current sBTC signer Stacks address: ${response['current-signer-principal']}`);
    };
    fn().catch(e => {
      setInfo(`Failed to load signer data. (${e.message})`);
      console.info(e);
    });
  }, [assetId]);

  if (info) {
    return <p>{info}</p>;
  } else {
    return <p>Loading sBTC info..</p>;
  }
}
