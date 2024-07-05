const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com', 
      'platform-lookaside.fbsbx', 
      'firebasestorage.googleapis.com', 
      'lh3.googleusercontent.com', 
      'avatars.githubusercontent.com', 
      'www.pexels.com', 
      'hotdesipics.co', 
      'i.picsum.photos', 
      'static-ca-cdn.eporner.com', 
      'imggen.eporner.com', 
      'www.pezporn.com', 
      'pornpics.de', 
      'cdni.pornpics.de', 
      'static-sg-cdn.eporner.com'
    ],
  },
  env: {
    CLOUDFLARE_STORAGE: 'https://pub-46cdeefeaf774247ab99232ab1ebaa66.r2.dev/',
    BACKEND_URL: 'https://my-worker.ukdevelopers007.workers.dev/',
    FRONTEND_URL: 'https://www.chutlunds.com/',
    FACEBOOK_APP_SECRET: '691004714be90ba61d9ab8e0ba0d0c5e',
    FACEBOOK_APP_ID: '412940630805200',
    GOOGLE_CLIENT_ID: '1004706057785-k3qei8am5at1g5789vqudsgr13455a0o.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    MONGODB_URI_STRING: 'mongodb+srv://bhola:IyNs48Pf1SNHUWpu@cluster0.acjho.mongodb.net/chutlunds?retryWrites=true&w=majority',
    PAYPAL_CLIENT_ID: 'AQEfZ9BtOjDaH-FAfZX-yRRFO7RmeSyNycJmJ8IiykzjBWGEKF_5yQJs-xagJEAT0D_fI-7GVdlYrrtX',
    PAYPAL_CLIENT_SECRET: 'EHdwoyfs3cRT6bFCDBgnwIQR67PW8C4AK5spurQoW7A92YBNUPodWG_vtz5XRfBhMouwisgZPVn5ltaV',
    PAYPAL_ENDPOINT: 'https://api-m.sandbox.paypal.com',
    JWT_SECRET: 'dsaljfhsaldkfsldaflksdf;afd',
    NEXTAUTH_URL: 'dsaljfhsaldkfsldaflksdf;afd',
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};
