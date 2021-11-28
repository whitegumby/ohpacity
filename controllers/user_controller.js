import bcrypt from 'bcrypt'
import { Prismaclient } from '@prisma/client'
import { PrismaClientValidationError } from '@prisma/client/runtime'
const prisma = new Prismaclient()
import Helper from '../utilities/helper.mjs'
import validator from 'validator'

class UserController {
    async create (req, res) {
        try {
        const password = req.body.password
        if (password.length < 8){
            return new Helper(res).sendError("Password is too short", 'password')
        }
        const hash = await bcrypt.hash(req.body.password, 12)
        const email = req.body.email
        if (!validator.isEmail(email)){
            return new Helper(res).sendError('${email} is not a valid email', 'email')
        }
        const user = await prisma.user.create({ data: {email: email, password: hash} })
        delete user.dataValues.password
        return res.send({user: user})
    } catch (error) {
        return res.status(500).send({ errors: error.errors.map(error => { return {message: error.message, field: error.path} }) })
    }
}



}