import mongoose ,{Schema}from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const UserSchema=new Schema({
    name:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        lowercase:true,
        index:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        require:[true,'password is required'],
    },
    Refreshtoken:{
    type:String
    },    

},{
    timestamps:true
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isPasswordCorrect = async function(password) {
    // Check if Password is provided
    if (!password) {
        throw new Error("Password is required for comparison.");
    }
    // Check if this.Password is set
    if (!this.password) {
        throw new Error("Hashed password is missing in the database.");
    }
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
        _id:this.id,
        Name:this.Name,
        Email:this.Email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {                                                               // generating token 
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}                
    UserSchema.methods.generateRefreshToken=function(){
        return jwt.sign(
            {
            _id:this.id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        }

export const User = mongoose.model("User",UserSchema)