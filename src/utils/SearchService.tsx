export const fetchRecommendedCarNames = async(typedString: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/search/vehicles/` + typedString,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    if (data.code == 1000) {
      return data.data;
    } else {
      console.error(`Error fetching data: ${data.message}`);
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}