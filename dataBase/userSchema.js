const mongoose=require('mongoose')
const {isEmail}=require('validator')
const bcrypt=require('bcrypt')
const userDataSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,'please enter email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'please enter a valid email']

    },
    password:{
        type:String,
        required:[true,'please enter password'],
        minlength:[6,'minimum password lenght is 6 characters']
    }

})
//hashing the password using bcrypt node module
userDataSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt()
    this.password=await bcrypt.hash(this.password,salt)
    next()
})

//.............This is optional..... in order to validate any kind of data tranfer in db
//fire a function after doc/data is created and saved in db
// userDataSchema.post('save',function(doc,next){
//     console.log(doc,'new user created and saved')
//     next()
// })
//next() function : Once a certain operation/funtion is executed, the next() triggers and run the other following functions
//fire a function before doc/data is created and saved in db
// userDataSchema.pre('save',function(next){
//     console.log('new user about to creat',this)
//     next()
// })


//static method for login users
userDataSchema.statics.userLogin=async function(email, password){
    const currentUser=await this.findOne({email})//here we are checking weather the email exit's in Db
    if(currentUser){//if the email present in Db, later we compare the passwords 
    const auth = await bcrypt.compare(password , currentUser.password)
    if(auth){//if the password is correct then we will return  'current user'
        return currentUser
    }
    throw Error('this is incorrect password')//if password is wrong we throw Error
    }
    throw Error('this is a invalid email')//if email is wrong we throw Error
}

//once the user create the schema for the database we need to keep the schema in a model and export it 
const User=mongoose.model('user',userDataSchema)

module.exports=User 