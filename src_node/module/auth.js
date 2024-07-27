//
//
const { passwordHash, comparePassword } = require('../util/bcrypt')
const { createToken, decodeToken } = require('../util/jwt')

const User = require('../model/user')
const Otp = require('../model/otp')

const { validationResult } = require('express-validator')
const CF = require('../conf/conf_app')


exports.find_all = async(req, res) => {
    try {
        let arr = await User.find()
        return res.status(200).json({
            "data": arr
        })
    } catch( err ) {
        return res.status(401).json({
            "error": err
        })
    }
}


exports.register = async(req, res) => {
    const { email, password, name, ...otherKeys } = req.body
    console.log(email, name, password)

    let otp = null
    // let tokenGenerated=null;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        error.statusCode = 422
        error.data = errors.array()
        console.log(error,error[0])
        res.status(422).json({ message: errors.array() })
        throw error;
    }

    let userData = {
        email: email,
        password: await passwordHash(password),
        name: name,
        ...otherKeys
    }

    const user = await User.create(userData)
    if (!user) {
        error.statusCode = 401
        error.data = errors.array()
        res.status(401).json({ message: 'fail register user' })
        throw error
    } else {
        return res.status(201).json({ message: "user registered" });
    }

}

// exports.otpVerification = (req, res, next)=>{
//     const receivedOtp=req.body.otp;
//     const email=req.body.email;
//
//     // validation
//     console.log(receivedOtp,email);
//
//     Otp.findOne({email:email})
//     .then(user=>{
//         if(!user){
//             const error = new Error("Validation failed ,this user does not exist"); // when user not found
//             error.statusCode = 403;
//             error.data = {
//             value: receivedOtp,
//             message: "Invalid email",
//             param: "otp",
//             location: "otpVerification",
//             };
//             res.status(422).json({message:error.data})
//
//             throw error;
//         }
//
//
//         if(user.otp!=receivedOtp){
//             const error = new Error("Wrong Otp entered");
//             error.statusCode = 401;
//             res.status(401).json({ message: "wrong otp entered " });
//             error.data = {
//             value: receivedOtp,
//             message: "Otp incorrect",
//             param: "otp",
//             location: "otp",
//             };
//             throw error;
//         }
//         else{
//             //  correct OTP
//             User.findOne({email:email})
//             .then(user=>{
//                 user.isverified=true;
//
//                 const access_token=jwt.sign({email:email,userId:user._id}, CF.jwt.accessToken,{
//                     algorithm: "HS256",
//                     expiresIn: CF.jwt.accessTokenLife
//                 });
//                 const referesh_token = jwt.sign({email:email}, CF.jwt.refreshToken,{
//                     algorithm: "HS256",
//                     expiresIn:CF.jwt.refreshTokenLife})
//
//                 user.save(result=>{
//                     return res.status(200).json({
//                         message: "otp entered is correct, user successfully added",
//                         access_token:access_token,
//                         referesh_token:referesh_token,
//                         userId:user._id.toString(),
//                         username:user.name,
//                       });
//                 })
//
//
//             })
//         }
//
//
//     })
//     .catch((err) => {
//         if (!err.statusCode) {
//           err.statusCode = 500;
//         }
//         next(err);
//       });
//
// }
//
// // to re send the otp to user
// exports.resendOtp = (req,res,next)=>{
//     const email=req.body.email;
//     const received_otp=req.body.otp;
//     let otp =null;
//
//     Otp.findOne({email:email})
//     .then(user=>{
//         if(!user){
//             const error = new Error("Email doesnt exist"); // when token not found
//             error.statusCode = 401;
//             error.data = {
//             value: received_otp,
//             message: "Invalid email",
//             param: "otp",
//             location: "otpVerification",
//             };
//             res.status(401).json({ message: "Email doesn't exist" });
//             throw error;
//         }
//         otp=Math.floor(100000 + Math.random()*900000);
//
//             user.otp=otp;
//             user.save();
//             console.log(otp);
//             res.status(201).json({ message: "OTP sent to your Email" });
//     })
//     .then( ()=>{
//         // transporter.sendMail({
//         //     to:email,
//         //     from:"ayush1911052@akgec.ac.in",
//         //     subject:"OTP Verification",
//         //     html:` '<h1>Please Verify your account using this OTP: !</h1>
//         //             <p>OTP:${otp}</p>'`
//         // })
//         console.log("mail sent")
//     })
//
//     .catch(err=>{
//         err=>{
//             if (!err.statusCode) {
//                 err.statusCode = 500;
//               }
//               next(err);
//         }
//     })
// }



exports.login = async (req, res, next) => {
    const { email, password, ...otherKeys } = req.body

    const errors = validationResult(req)

    if ( !errors.isEmpty() ) {
        const error=new Error('Validation failed')
        error.statusCode = 422
        error.data = errors.array()
        console.log( error,error[0] )
        res.status(422).json({ message:"User with this email doesnt exists" })
        throw error
    }

    const user = await User.findOne({ email: email })

    let match = await comparePassword(password, user.password)
    if (!match) {
        error.statusCode = 401
        error.data = errors.array()
        res.status(401).json({ message:"password incorrect" })
        throw error
    }

    const accessToken = createToken({ email: user.email }, CF.jwt.accessToken, CF.jwt.accessTokenLife)
    const refreshToken = createToken({ email: user.email }, CF.jwt.refreshToken, CF.jwt.refreshTokenLife)

    return res.status(201).json({
        message:"User logged in!",
        access_token: accessToken,
        refresh_token: refreshToken,
        username: user.name,
        userId: user._id
    })

}


// exports.resetOtpVerification = (req,res,next)=>{
//     const email=req.body.email;
//     const otp=req.body.otp;
//     console.log("reset::",otp);
//
//     Otp.findOne({email:email})
//     .then(user=>{
//         if(!user){
//             const error = new Error("Validation Failed");
//             error.statusCode = 401;
//             res.status(401).json({ message: "Otp is incorrect" });
//             error.data = {
//             value: email,
//             message: " otp is incorrect"}
//             res.status(422).json({message: " otp is incorrect or otp expired!" });
//             throw error;
//         }
//
//          if(user.otp==otp){
//             User.findOne({email:email})
//             .then(matched=>{
//                 matched.resetVerified=true;
//                 matched.save();
//             })
//             res.status(201).json({ message: "Email verified successfully", email:email})
//         }
//         else res.status(402).json({ message: "Wrong Otp entered", email:email})
//     })
//     .catch(err=>{
//         if (!err.statusCode) {
//             err.statusCode = 500;
//           }
//         next(err);
//     })
// }




exports.newPassword = (req,res,next)=>{
    const email=req.body.email;
    const newPassword = req.body.newPassword;
    const confirmPassword=req.body.confirmPassword;
    let resetUser;

    User.findOne({email:email})
    .then(user=>{

        if(!user){
            const error = new Error("user with this email doesnt exists");
            error.statusCode = 401;
            res.status(401).json({ message: "user with this email doesnt exists" });
            error.data = {
            value: email,
            message: "user with this email doesnt exists"}
            res.status(422).json({
                message: " User doesn't exists"
              });
            throw error;
        }
        if(user.resetVerified){
                resetUser=user;
                resetUser.resetVerified=false;
                return bcrypt.hash(newPassword,12)
                .then(hashedPassword=>{
                resetUser.password=hashedPassword;
                return resetUser.save();
                })

                .then(result=>{
                console.log("result",result)
                res.status(201).json({message:"password changed successfully"});
            })
                            }  // end of if condition

        else {
            console.log("Please,verify your email first")
            res.status(401).json({message:"Please,verify your email first "})
        }

 })
    .catch(err=>{
        if (!err.statusCode) {
            err.statusCode = 500;
          }
        next(err);
    })

}
