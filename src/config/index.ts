export default {
    db: {
        url: process.env.DATABASE_URL || "mongodb://localhost:27017/blog-service",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    basicAuth: {
        user: process.env.AUTH_USERNAME || "coolblog",
        password: process.env.AUTH_PASSWORD || "yP%n478U6Jpx#@&&2RB%"
    }
}