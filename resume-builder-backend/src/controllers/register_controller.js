import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user_register_model.js";
                                 // REGISTERING THE USER // 

const Userregister=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
       console.log(name,email)
        if(name===""){
            throw new ApiError(400,"Name is required ")
        }
        if(email===""){
            throw new ApiError(400,"Email is required ")
        }
        if(password===""){
            throw new ApiError(400,"password is required")
        }

    
        const existeduser=await User.findOne({
            $or:[{name},  {email}]
        })
        
        if(existeduser){
            throw new ApiError(409,"user already existed with this username")
        }



        const  user=await User.create({
            name,
            email,
            password,
        })

        const createdUser=await User.findById(user._id).select(
            "-Password -refreshToken"
        )

        if(!createdUser){
            throw new ApiError(500,"Sorry unable to register user ")
        }
        return res.json({ "User successfully registered": true });
})



         // GENERATING TOKEN WHEN USER IS LOGIN THIS WILL WORK AFTER USER ENTER CORRECT USERNAME AND PASSWORD //
const generateAcessTokenAndRefereshTokens=async(userId)=>{
    try {
        const user=await User.findById(userId)
        console.log(user);
        const accessToken=user.generateAcessToken()
        const refreshToken=user.generateRefreshToken()
        console.log("accessToken is :",accessToken)
        console.log("refreshToken is :",refreshToken
        )
        user.refreshToken=refreshToken;
        await user.save();
       console.log("token aagya hai wth ")
        // console.log(refreshToken)
        // await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"somethning went wrong  while generating tokens")
    }
    }


    // USER ENTERING THE USERNAME AND PASSWORD FOR LOGIN//

const loginuser=(async(req,res)=>{
    const {email,Password}=req.body
    console.log(email,Password)
    
    if(!email){
        throw new ApiError(400,"email is required")
    }
    const user=await User.findOne({
        $or:[{email}]
    })
    if(!user){
        throw new ApiError(400,"user doesnot exist with this username and email")
    }
    const isPasswordvalid=await user.isPasswordCorrect(Password)
    console.log(isPasswordvalid)

    if(!isPasswordvalid){
        throw new ApiError(400,"Password enter by you is incorrect please enter the correct password")
    }

    
 const {accessToken,refreshToken}= 
    await generateAcessTokenAndRefereshTokens(user._id)
    console.log(accessToken)
    console.log(refreshToken)
 
     const loggedInUser=await User.findById(user._id)
    //  select({ password: 0, refreshToken: 0 });
     console.log(loggedInUser)
 
     const options={
         httpOnly:true,
         secure:true
     }
     const Username=email;
     
                                // SENDING THE TOKEN IN THE COOKIES//
                                
     return res
     .status(200).cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json({
        message:"Login successfully",
        data:Username
     })
     
})

export {Userregister,loginuser}