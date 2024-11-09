export const legalAPI = [
  '/auth',
  '/home',
  '/forgot',
  '/vehicles',
  '/car',
  '/chat',
];

export const errors = new Map([
  [9001, 'Username is missing'],
  [9002, 'Password is missing'],
  [9003, 'Username existed, please choose another one'],
  [9004, 'Email existed, please choose another one'],
  [9005, 'Your age must be at least {min}'],
  [9006, 'Your username must be between {min} and {max} characters'],
  [9007, 'Your password must be between {min} and {max} characters'],
  [9008, 'Wrong credentials'],
  [9009, 'Google code is invalid'],
  [9010, 'Google redirect URI is invalid'],
  [9011, 'Vehicle brand existed'],
  [9012, 'Vehicle brand not exist'],
  [9013, 'Vehicle not exist'],
  [9014, 'Vehicle in inventory less than your desire'],
  [9015, 'Invalid vehicle amount, at least is {min}'],
  [9016, 'Brand name can not be blank'],
  [9017, 'Vehicle name can not be blank'],
  [9018, 'Vehicle price can not be blank'],
  [9019, 'Vehicle image can not be blank'],
  [9020, 'Vehicle description can not be blank'],
  [9021, 'Deleting error'],
  [9022, 'An error related to foreign key'],
  [9023, 'Persisting banner fail'],
  [9024, 'Image not exist'],
  [9025, 'Deleting error'],
  [9026, 'Banner title must not be blank'],
  [9027, 'Banner description must not be blank'],
  [9028, 'Banner URL must not be blank'],
  [9029, 'Username must not be blank'],
  [9030, 'Password must not be blank'],
  [9031, 'An error occurred when retrieving all emails'],
  [9032, 'Brand name is missing'],
  [9033, 'URL problem'],
  [9034, 'Invalid page parameters'],
  [9035, 'Invalid page number'],
  [9036, 'Invalid page size'],
  [9037, 'Email and username not match'],
  [9038, 'Request must not a blank'],
  [9039, 'Invalid verification code'],
  [9040, 'Expiry verification code'],
  [9041, 'Username not exist'],
  [9042, 'Save contract fail'],
  [9043, 'Invalid contract id'],
  [9044, 'Get contract fail'],
  [9045, 'Vehicle out of stock'],
  [9998, 'You do not have enough permission'],
  [9999, 'Uncategorized error'],
  [10000, 'Service unavailable, please try again later.'],
]);

export const mainServices = [
  {
    title: 'Car Repair Services',
    description:
      'We specialize in professional car repair services, offering everything from routine maintenance to complex mechanical fixes, ensuring your vehicle runs smoothly and safely.',
    img: '/images/repair-service.jpg',
  },
  {
    title: 'Car Maintain Services',
    description:
      'Our car maintenance services ensure your vehicle stays in top condition with regular check-ups, oil changes, tire rotations, and overall system diagnostics to prevent potential issues before they arise.',
    img: '/images/maintain-service.jpg',
  },
  {
    title: 'Engine Upgrade Services',
    description:
      "Our engine upgrade services offer enhanced performance, power, and efficiency through cutting-edge upgrades and modifications tailored to your vehicle's needs.",
    img: '/images/engine-service.jpg',
  },
  {
    title: 'Periodic Vehicle Check',
    description:
      'Our periodic vehicle check service includes a thorough inspection of all essential systems, from engine and brakes to suspension and tires, ensuring your car is always road-ready and preventing costly repairs down the line.',
    img: '/images/periodical-check.jpg',
  },
];

export const otherServices = [
  {
    title: 'Professional Car Wash',
    description:
      'Thorough washing service from exterior to interior using advanced technology to keep your car clean and shiny.',
    img: '/images/professional-car-wash.jpg',
  },
  {
    title: 'Custom Decals',
    description:
      'Personalized decal application service to give your vehicle a unique look and style, tailored to your preferences.',
    img: '/images/custom-decal.jpg',
  },
  {
    title: 'Interior Cleaning',
    description:
      "Deep cleaning service for your car's interior, including upholstery, carpets, and all surfaces to ensure a fresh environment.",
    img: '/images/interior-cleaning.jpg',
  },
  {
    title: 'Window Tinting',
    description:
      'Service that applies window film to reduce interior temperature, protect against UV rays, and enhance privacy.',
    img: '/images/window-tinting.jpg',
  },
];

export const imageLinks = [
  {
    id: 0,
    url: '/images/m-image-1.jpg',
  },
  {
    id: 1,
    url: '/images/m-image-2.jpg',
  },
  {
    id: 2,
    url: '/images/m-image-3.jpg',
  },
  {
    id: 3,
    url: '/images/m-image-4.jpg',
  },
  {
    id: 4,
    url: '/images/m-image-5.jpg',
  },
  {
    id: 5,
    url: '/images/m-image-6.jpg',
  },
];

export const videoLinks = [
  {
    id: 1,
    url: '/videos/self-driving.mp4',
  },
  {
    id: 2,
    url: '/videos/awd.mp4',
  },
  {
    id: 3,
    url: '/videos/interior.mp4',
  },
  {
    id: 4,
    url: '/videos/hybrid.mp4',
  },
];

export const accessories = [
  {
    id: 0,
    title: 'Anti Glare For Mirror',
    url: '/images/accessories/anti-glare.jpg',
    price: '1,000,000 VND',
    description:
      'Anti-glare mirrors for cars reduce headlight reflections, improving night driving visibility and safety.',
  },
  {
    id: 1,
    title: 'Dash Camera',
    url: '/images/accessories/dash-cam.jpg',
    description:
      'High-definition dash cam with night vision, perfect for recording every trip and enhancing vehicle security.',
    price: '2,000,000 VND',
  },
  {
    id: 2,
    title: 'Handpresso Auto Set',
    url: '/images/accessories/handpresso-auto-set.jpg',
    description:
      'Portable espresso machine designed for cars, allowing you to brew fresh coffee on the go.',
    price: '3,000,000 VND',
  },
];
export const brandLogos = new Map([
  ['audi', 'https://pluspng.com/img-png/audi-logo-png-audi-logo-eps-pdf-500.png'],
  ['bmw', 'https://cdn.freebiesupply.com/logos/large/2x/bmw-01-logo-png-transparent.png'],
  ['ford', 'https://uploads-ssl.webflow.com/60354ef0fd8c3eec37bbd984/6064e6a2e2ca67a95014a126_ford-logo-512x512.png'],
  ['honda', 'https://www.freeiconspng.com/thumbs/honda-logo-png/honda-logo-png-picture-20.png'],
  ['hyundai', 'https://www.tsikot.com/assets/frontend/images/make-brands/hyundai-logo.png'],
  ['jaguar', 'https://logos-world.net/wp-content/uploads/2021/03/Jaguar-Logo-2012-present.png'],
  ['kia', 'https://logos-world.net/wp-content/uploads/2021/03/Kia-Logo.png'],
  ['landrover', 'https://i0.wp.com/cruzeauto.com/wp-content/uploads/2018/10/fdd7768ec16652d1f8438fa95f23e96c.png'],
  ['lexus', 'https://www.pngmart.com/files/22/Lexus-Logo-PNG-HD.png'],
  ['mazda', 'https://logos-world.net/wp-content/uploads/2020/05/Mazda-Logo.png'],
  ['mercedes', 'https://thebrakereport.com/wp-content/uploads/2017/07/Mercedes-Benz-Logo-PNG-File.png'],
  ['mg', 'https://cdn.freebiesupply.com/logos/large/2x/mg-1-logo-png-transparent.png'],
  ['mini-cooper', 'https://www.tommysautomotive.com/wp-content/uploads/2015/11/Mini-Cooper-Logo.png'],
  ['mitsubishi', 'https://purepng.com/public/uploads/medium/purepng.com-mitsubishi-logomitsubishimitsubishi-groupmitsubishi-automobilesmitsubishi-logo-1701527515641yceqq.png'],
  ['nissan', 'https://brandlogos.net/wp-content/uploads/2014/10/nissan-logo-preview.png'],
  ['peugeot', 'https://www.autobotsrentacar.com/assets/images/gateway/643c7ddf5a6321681685983.png'],
  ['porsche', 'https://logos-world.net/wp-content/uploads/2021/04/Porsche-Logo.png'],
  ['subaru', 'https://cdn.officialpsds.com/imageview/72/6n/726nk3_large.png?1235307187'],
  ['suzuki', 'https://logospng.org/download/suzuki/logo-suzuki-4096.png'],
  ['toyota', 'https://clipground.com/images/toyota-logo-png-9.png'],
  ['vinfast', 'https://th.bing.com/th/id/R.6b933f45972d615d6cdfb461493858c9?rik=OhMtQ2%2faqevnSA&riu=http%3a%2f%2fcarlogos.org%2fcar-logos%2fvinfast-logo.png&ehk=0U7ut31%2fd93QmJJErpeWvPGKlCz%2bxftyPoWOtZI%2bITY%3d&risl=&pid=ImgRaw&r=0'],
  ['volvo', 'https://purepng.com/public/uploads/medium/purepng.com-volvo-logovolvovolvo-carsvolvo-automobilevolvo-stylish-carvolvo-logo-1701527683337qlqmk.png'],
  ['volkswagen', 'https://logospng.org/download/volkswagen/logo-volkswagen-4096.png'],
]);

export const brandCountries = new Map([
  ['audi', 'Germany'],
  ['bmw', 'Germany'],
  ['ford', 'United States'],
  ['honda', 'Japan'],
  ['hyundai', 'South Korea'],
  ['jaguar', 'United Kingdom'],
  ['kia', 'South Korea'],
  ['landrover', 'United Kingdom'],
  ['lexus', 'Japan'],
  ['mazda', 'Japan'],
  ['mercedes', 'Germany'],
  ['mg', 'China'],
  ['mini-cooper', 'United Kingdom'],
  ['mitsubishi', 'Japan'],
  ['nissan', 'Japan'],
  ['peugeot', 'France'],
  ['porsche', 'Germany'],
  ['subaru', 'Japan'],
  ['suzuki', 'Japan'],
  ['toyota', 'Japan'],
  ['vinfast', 'Vietnam'],
  ['volvo', 'Sweden'],
  ['volkswagen', 'Germany'],
]);

export const brandLogosList = Array.from(brandLogos);

export const searchProductPageSize = 12;
