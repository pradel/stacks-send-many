import { describe, it, expect } from 'vitest';
import { getNameFromAddress } from '../lib/names';
import { hex_to_ascii } from '../lib/string-utils';

describe('getNameFromAddress', () => {
  it('should resolve friedger.btc from mainnet address', async () => {
    // friedger.btc is owned by SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X
    const address = 'SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X';
    const result = await getNameFromAddress(address);

    // Should return a successful response
    expect(result.ok).toBeTruthy();
    const name = result.ok?.name || '';
    const namespace = result.ok?.namespace || '';

    // Convert hex-encoded values to ASCII
    const nameStr = hex_to_ascii(name);
    const namespaceStr = hex_to_ascii(namespace);

    // Should resolve to friedger.btc
    expect(nameStr).toBe('friedger');
    expect(namespaceStr).toBe('btc');

    console.log(`Resolved: ${nameStr}.${namespaceStr}`);
  }, 10000); // Increase timeout for network call
});
