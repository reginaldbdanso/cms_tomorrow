import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const { Schema } = mongoose

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function (email, password) {

    // validate email
    if (!email || !password) {
        throw Error('Email and password are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }
    const exists = await this.findOne({email})
    if (exists) {
        throw Error('User already exists')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    

    // generate salt and password hashing
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // create new user
    const user = await this.create({ email, password: hash })

    return user;

}

//static login method
userSchema.statics.login = async function (email, password) {
    // validate email
    if (!email || !password) {
        throw Error('Email and password are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }

    // check if user exists
    const user = await this.findOne({email})
    if (!user) {
        throw Error('User not found')
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw Error('Invalid password')
    }

    return user

}

export default mongoose.model('User', userSchema)