import { Strategy } from "passport-local";
import { encryptPassword, isValidPassword } from "../utils/bcrypt.js";
import UserModel from "../contenedores/mongo/usuarios.js";
import passport from "passport";
import path from "path";

const options = {
  usernameField: "email"
}
  
passport.use("login", new Strategy(options, async (email, password, done) => {
  try {
    const user = await UserModel.findOne({email})
    console.log(user);
      if(!user){
        console.log(`El usuario ${email} no fue encontrado`);
        return done(null, false, {message: `El usuario ${email} no fue encontrado`});
      }
      if(!isValidPassword(password, user.password)){
        console.log("Contraseña invalida");
        return done(null, false, {message: "Contraseña invalida"})
      }
    done(null, user);
  } catch (error) {
    console.log("Error in login\n", error.message);
    done(error)
  }
}))

passport.use("register", new Strategy({...options, passReqToCallback: true}, async (req, email, password, done) => {
  try {
    console.log(email, password);
    const user = await UserModel.findOne({email})
      if(user){
        console.log(`El usuario ${email} ya existe`);
        return done(null, false, {message: `El Usuario ${email} ya existe`});
      }
      const {name, age, phone_number} = req.body;
      const fileDest = `${req.file.destination.slice(1)}/${req.file.filename}`;
      const newUser = {
        email,
        password: encryptPassword(password),
        name,
        age,
        phone_number,
        file: fileDest
      };
    const created = await UserModel.create(newUser);
    console.log(created);
    console.log(`User ${email} has succesfully registered`);
    done(null, created)
  } catch (error) {
    console.log("Error in register\n", error.message);
    done(error)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.email);
})

passport.deserializeUser(async (email, done) => {
  try {
    done(null, await UserModel.findOne({email}));
  } catch (error) {
    done(error);
  }
})

export default passport;