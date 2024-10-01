export async function getInitialVehicle() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DOMAIN}/vehicle-inventory/vehicles/porsche`,
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
    }
  } catch (error) {
    console.log('Error');
  }
}

export function priceStringToNumber(price: string) {
  return Number(price.replace(/,/g, ''));
}
