import localFont from 'next/font/local';

export const euclid = localFont({
  src: [
    {
      path: '../fonts/Euclid Circular B Regular.ttf', 
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Euclid Circular B Medium.ttf', 
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Euclid Circular B Bold.ttf', 
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-euclid',
  display: 'swap',
});