export default () => ({
        auth_server: "https://nodo-centrale-casa.herokuapp.com",
        resource_server: "https://nodo-centrale-casa.herokuapp.com",

        authorization_url: "https://nodo-centrale-casa.herokuapp.com/oauth/authorize",
        token_url: "https://nodo-centrale-casa.herokuapp.com/oauth/token",
        validation_url: "https://nodo-centrale-casa.herokuapp.com/oauth/verify",


        frontend_url: process.env.NODE_ENV === "DEV" ? "localhost:3000" : "https://thermostat.now.sh/"
})