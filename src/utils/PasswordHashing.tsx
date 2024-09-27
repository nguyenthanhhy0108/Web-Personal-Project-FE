export const hashStringShort = async (inputString: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(inputString);
  
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex.slice(0, 8);
};