export async function getChatBotResponse(input: string | undefined) {
  const request = {
    message: input,
  };

  const url = process.env.NEXT_PUBLIC_DOMAIN + '/chat/gemini';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
