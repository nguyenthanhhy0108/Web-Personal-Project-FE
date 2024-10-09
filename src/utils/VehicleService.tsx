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

export function priceNumberToString(price: number) {
  return price.toLocaleString('en-US');
}

export async function getBrandNameByVehicleName(vehicleName: string|null) {
  if (vehicleName) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DOMAIN}/vehicle-inventory/vehicles/` + vehicleName + "/brand",
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
    } catch (ex) {
      console.log(ex)
    }
  }
}

export const changeSearchStateValue = (key: string, value: string) => {
  const storedState = localStorage.getItem('searchState');
  const searchState = storedState ? JSON.parse(storedState) : {};

  searchState[key] = value;
  localStorage.setItem('searchState', JSON.stringify(searchState));
}