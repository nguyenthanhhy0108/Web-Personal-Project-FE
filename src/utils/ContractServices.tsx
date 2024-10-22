import { getCookie } from './Cookie';
import parseToken from './JwtParser';

export async function saveContract(formData: FormData) {
  const token = getCookie('access-token');
  if (token) {
    const userId = parseToken(token)?.sub;

    const url = process.env.NEXT_PUBLIC_DOMAIN + '/deposite-contract/contracts';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  return null;
}
