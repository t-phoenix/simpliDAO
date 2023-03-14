import { createCampaign, dashboard, logout, payment, profile, withdraw, glogo } from '../assets';

export const navlinks = [
  {
    name: 'create',
    imgUrl: withdraw,
    link: '/create',
  },
  {
    name: 'token',
    imgUrl: payment,
    link: '/token',

  },
  {
    name: 'IDO',
    imgUrl: dashboard,
    link: '/crowdsale',
  },
  {
    name: 'DAO',
    imgUrl: createCampaign,
    link: '/dao',
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

