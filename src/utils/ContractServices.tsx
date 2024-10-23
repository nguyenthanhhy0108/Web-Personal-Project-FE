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

      const data = await response.json();
      console.log(data);
      if (data.code == 9045) {
        return data.message;
      }
      if (data.code == 1000) {
        return 'Deposite successfully';
      } else {
        return 'Deposite fail, please try again later';
      }
    } catch (error) {
      console.error('Error:', error);
      return 'Deposite fail, please try again later';
    }
  }
}
