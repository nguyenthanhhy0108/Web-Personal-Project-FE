export const legalAPI = ['/auth', '/home', '/forgot'];

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

export const brandLogos = new Map([
  ['audi', '/images/car-logo/audi.png'],
  ['bmw', '/images/car-logo/bmw.png'],
  ['ford', '/images/car-logo/ford.png'],
  ['honda', '/images/car-logo/honda.png'],
  ['hyundai', '/images/car-logo/hyundai.png'],
  ['jaguar', '/images/car-logo/jaguar.png'],
  ['kia', '/images/car-logo/kia.png'],
  ['landrover', '/images/car-logo/landrover.png'],
  ['lexus', '/images/car-logo/lexus.png'],
  ['mazda', '/images/car-logo/mazda.png'],
  ['mercedes', '/images/car-logo/mercedes.png'],
  ['mg', '/images/car-logo/mg.png'],
  ['mini-cooper', '/images/car-logo/mini-cooper.png'],
  ['mitsubishi', '/images/car-logo/mitsubishi.png'],
  ['nissan', '/images/car-logo/nissan.png'],
  ['peugeot', '/images/car-logo/peugeot.png'],
  ['porsche', '/images/car-logo/porsche.png'],
  ['subaru', '/images/car-logo/subaru.png'],
  ['suzuki', '/images/car-logo/suzuki.png'],
  ['toyota', '/images/car-logo/toyota.png'],
  ['vinfast', '/images/car-logo/vinfast.png'],
  ['volvo', '/images/car-logo/volvo.png'],
  ['volkswagen', '/images/car-logo/volkswagen.png'],
]);

export const brandLogosList = Array.from(brandLogos);

export const searchProductPageSize = 12;
