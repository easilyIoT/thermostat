require("dotenv").config();

module.exports = {
        type: "mongodb",
        url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0-e0cg8.mongodb.net/dev?retryWrites=true`,
        entities: ["dist/**/*.entity{.ts,.js}"],
        logging: true,
        synchronize: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
}