import User from "../models/userModel.js";

export const renderAll = async (req,res)=>{
  try{
    const users = await User.find().lean();
    res.render("index",{users, message: users.length? null:"No users found."});
  }catch(e){ res.status(500).render("index",{users:[], message:"Server error"}); }
};

export const fetch = async (req,res)=>{
  try{
    const users = await User.find();
    if(!users.length) return res.json({message:"User not Found."});
    res.json(users);
  }catch(e){ res.status(500).json({error:e.message}); }
};

export const showCreateForm = (req,res)=> res.render("create",{error:null});

export const create = async (req,res)=>{
  try{
    const {name,email,age}=req.body;
    if(!name || !email){
      return res.render("create",{error:"Name and email required"});
    }
    const user=new User({name,email,age});
    await user.save();
    res.redirect("/api/user");
  }catch(e){ res.status(500).json({error:e.message}); }
};

export const showEditForm = async (req,res)=>{
  try{
    const user = await User.findById(req.params.id).lean();
    if(!user) return res.redirect("/api/user");
    res.render("edit",{user,error:null});
  }catch(e){ res.redirect("/api/user"); }
};

export const update = async (req,res)=>{
  try{
    const {name,email,age}=req.body;
    await User.findByIdAndUpdate(req.params.id,{name,email,age});
    res.redirect("/api/user");
  }catch(e){ res.status(500).json({error:e.message}); }
};

export const deleteUser = async (req,res)=>{
  try{
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/api/user");
  }catch(e){ res.status(500).json({error:e.message}); }
};
