export const environment = {
    production:false,
    auth:{
        domain : 'luv2shop.us.auth0.com',
        clientId : 'yf72wXeoxuJZdynTqwcPVSJhBFPfvacV',
        redirectUri: window.location.origin,
        audience : 'https://gatekeeper/api/orders/**'

    },
    
    dev: {
        serverUrl : 'http://localhost:8080'
    },
};
