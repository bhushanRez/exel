const checkPassword=async(password,foundEmp)=>{
    const checkPassword=await bcrypt.compare(password,foundEmp[0][0].password);
    return checkPassword;
}

module.exports={checkPassword}