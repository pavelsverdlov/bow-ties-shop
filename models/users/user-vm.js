var UserViewModel = function(_fname,_lname,_email){
    this.id ='';
    this.firstName = _fname;
    this.lastName = _lname;
    this.email = _email;
    this.orders = [];
    this.role = '';
    //
    this.salt = '';
    this.hashed_password = '';
};

exports.get = function(){ return new UserViewModel('','','');}

exports.createModel = function(dbModel){
    var user = new UserViewModel(dbModel.firs_name,dbModel.last_name,dbModel.email);
    user.id = dbModel._id.toHexString();
    user.role = dbModel.role;
    user.salt = dbModel.salt;
    user.hashed_password = dbModel.hashed_password;

    return user;
};