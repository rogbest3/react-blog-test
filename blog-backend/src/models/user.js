import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
    username : String, 
    hashedPassword : String
})

UserSchema.methods.setPassword = async function(password){
    // this : UserSchema 문서 인스턴스를 가리킴
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
}

UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result;
} 

UserSchema.methods.serialize = function(){
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}

UserSchema.methods.generateToken = function(){
    const token = jwt.sign(
        {
            _id : this.id,
            username : this.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn : '3d' // 3일 동안 유효
        }
    )
    return token;
}

UserSchema.statics.findByUsername = function(username){
    // this : User 모델을 가리킴
    return this.findOne({username})
}

const User = mongoose.model('User', UserSchema);
export default User;