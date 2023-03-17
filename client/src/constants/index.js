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

export const proposals = [
  {
    id: '0xAE0a1eA3509E8109d1F21fDeD172Ab330F99f004',
    start: 14187241,
    end: 14232143,
    status: 'success',
    description: "This is a test proposal",
  },
  {
    id: '0x942a59f7b182a8942e09f4696da0b08c7219e739111b6c6f6ed39c7705713228',
    start: 15387241,
    end: 16432143,
    status: 'defeated',
    description: "Fund 500 tokens for Marketing ",
  },
  {
    id: '0x893dhwa59f7b182a8942e09f4696da0b08c7219e739111b6c6f6ed39wdwq',
    start: 15318316,
    end: 16631319,
    status: 'defeated',
    description: "Fund 200 tokens for Development ",
  }
] 

