import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


const router = express.Router();



// =======================
// Signup API
// =======================

router.post("/signup", async (req, res) => {


    try {


        const {
            name,
            email,
            password
        } = req.body;





        const existingUser = await User.findOne({

            email

        });





        if (existingUser) {


            return res.status(400).json({

                message: "User already exists"

            });


        }







        const hashedPassword = await bcrypt.hash(

            password,

            10

        );







        const user = await User.create({


            name,

            email,

            password: hashedPassword


        });








        const token = jwt.sign(

            {

                id: user._id

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );







        // Save JWT in Cookie

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });







        res.status(201).json({


            success: true,


            message: "Signup successful",


            user: {


                name: user.name,

                email: user.email


            }


        });






    }

    catch (error) {


        res.status(500).json({

            message: error.message

        });


    }


});









// =======================
// Login API
// =======================


router.post("/login", async (req, res) => {


    try {


        const {

            email,

            password

        } = req.body;







        const user = await User.findOne({

            email

        });







        if (!user) {


            return res.status(400).json({

                message: "User not found"

            });


        }








        const passwordMatch = await bcrypt.compare(

            password,

            user.password

        );







        if (!passwordMatch) {


            return res.status(400).json({

                message: "Invalid password"

            });


        }










        const token = jwt.sign(

            {

                id: user._id

            },


            process.env.JWT_SECRET,


            {

                expiresIn: "7d"

            }


        );









        // Save JWT in Cookie

      res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
});



        res.status(200).json({


            success: true,


            message: "Login successful",


            user: {


                name: user.name,

                email: user.email


            }


        });







    }

    catch (error) {


        res.status(500).json({

            message: error.message

        });


    }



});


export default router;