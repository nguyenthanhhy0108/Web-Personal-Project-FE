export const legalAPI = ['/auth', '/home'];

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
    url: "/videos/self-driving.mp4"
  },
  {
    id: 2,
    url: "/videos/awd.mp4"
  },{
    id: 3,
    url: "/videos/interior.mp4"
  },{
    id: 4,
    url: "/videos/hybrid.mp4"
  },
]

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

export const brandLogosList = Array.from(brandLogos)
