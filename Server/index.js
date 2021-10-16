//env variable
require ("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// config
import googleAuthConfig from "./googleConfig/google.config";

// API

import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant/index";
import Food from "./API/Food/index";
import Menu from "./API/Menu/index";

//Database connection
import ConnectDB from "./database/connection";

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({extended: false}));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// passport configuration
googleAuthConfig(passport);

//for application routes
// localhost:3000/auth/signup
zomato.use("/auth", Auth);
zomato .use("/restaurant", Restaurant);
zomato.use("/food",Food);
zomato.use("/menu",Menu);

zomato.get("/", (req,res) =>
    res.json({message: "server setup successfull"}));

zomato.listen(3000, ()=>
ConnectDB().then(()=> console.log("Server up and running"))
.catch(() => console.log("DB connection failed"))
);
 