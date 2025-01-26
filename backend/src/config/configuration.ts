export default () => ({
    port: process.env.PORT || 5001,
    database: {
        url: process.env.MONGODB_URL,
        name: process.env.MONGODB_NAME,
        user: {
            name: process.env.MONGODB_USER,
            password: process.env.MONGODB_PASS
        }
    }
})