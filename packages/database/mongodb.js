const express=require('express');
const mongoose=require('mongoose');

const app=express();
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/login_signup_db', {
  useNewUrlParser:true,
  useUnifiedTopology:true,
})
  .then(()=>console.log('Connected to MongoDB'))
  .catch((err)=>console.log('Error connecting to MongoDB:', err));

const userSchema=new mongoose.Schema({
  username:{ type:String, required:true },
  email:{ type:String, required:true, unique:true },
  password:{ type:String, required:true },
});

const User=mongoose.model('User', userSchema);

app.post('/signup', async (req, res)=>{
  const { username, email, password }=req.body;

  try {
    const existingUser=await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message:'User already exists' });
    }

    const user=new User({ username, email, password });
    await user.save();

    res.status(201).json({ message:'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message:'Server error' });
  }
});

app.post('/login', async (req, res)=>{
  const { email, password }=req.body;

  try {
    const user=await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message:'Invalid email or password' });
    }

    res.status(200).json({ message:'Login successful' });
  } catch (error) {
    res.status(500).json({ message:'Server error' });
  }
});

app.listen(3000, ()=>console.log('Server running on port 3000'));
