import { createCampaign, dashboard, logout, payment, profile, withdraw, glogo, rocket } from '../assets';

export const navlinks = [
  {
    name: 'Explorer',
    imgUrl: dashboard,
    link: '/explorer',
  },
  {
    name: 'start',
    imgUrl: logout,
    link: '/create',
  },
  {
    name: 'Trxn',
    imgUrl: withdraw,
    link: '/transaction',
  },
  {
    name: 'token',
    imgUrl: payment,
    link: '/token',

  },

  {
    name: 'Dash',
    imgUrl: profile,
    link: '/dash',
  },

  // {
  //   name: 'profile',
  //   imgUrl: profile,
  //   link: '/profile',
  // },
  // {
  //   name: 'logout',
  //   imgUrl: logout,
  //   link: '/',
  //   disabled: true,
  // },
];


// export const cards = [
//   { 
//     heading: "ERC20 Token", 
//     description: "Create Or Manage your ERC20 token on FTM blockchain with minimal fee and seemless UI/UX", 
//     status: "live",
//     link: "/token" 
//   }, 
//   { 
//     heading: "Crowdsale", 
//     description: "Raise funds by selling a token which binds the tokenomics of your project.", 
//     status: "coming soon",
//     link: "/crowdsale",
//   }, 
//   { 
//     heading: "DAO", 
//     description: "Govern together with the help of your community and our simple to use tech tools", 
//     status: "coming soon",
//     link: "dao" 
//   }
// ]

