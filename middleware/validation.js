const Employee=require('../dto/Employe.dto')

const validateAuth = (req, res, next) => {
  const { name, email, password } = req.body;
  let path=req.path;
  if(path.includes("login")){
      const dtoValidation = new Employee("name", email, password);
      if (!dtoValidation.validateLogin().isValid) {
        return res.status(400).json({ error: dtoValidation.validateLogin().error });
      } else {
        next();
      }
  }else if (path.includes("register")){
    const dtoValidation = new Employee(name, email, password);
    if (!dtoValidation.validateRegister().isValid) {
      return res.status(400).json({ error: dtoValidation.validateRegister().error });
    } else {
      next();
    }
  }
};

module.exports = validateAuth;
