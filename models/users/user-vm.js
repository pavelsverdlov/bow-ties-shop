var UserViewModel = function(){
    this._id =null;
    this.id ='';
//    this.getId = function(){
//        return this._id;
//    };
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.date_bord = '';
    this.phone = '';
    this.orders = [];
    this.isSubscribe = false;
    this.role = 2;
    this.idate_reg = 0;
    //
    this.salt = '';
    this.hashed_password = '';
    this.passwd = '';
    //
    this.isAuth = false;
    this.isConfirm = false;
};

exports.get = function(firstname, lastname, email){
    var user = new UserViewModel();
    user.firstName = firstname;
    user.lastName = lastname;
    user.email = email;
    return user;
}


exports.createModel = function(dbModel){
    var user = new UserViewModel();
    user.firstName = dbModel.firstName;
    user.lastName = dbModel.lastName;
    user.email = dbModel.email;
    user.id = dbModel._id.toHexString();
    user.role = dbModel.role;
    user.salt = dbModel.salt;
    user.hashed_password = dbModel.hashed_password;
    user.idate_reg = parseInt(dbModel.idate_reg);
    user.isConfirm = dbModel.isConfirm;
    user.orders = dbModel.orders;

    return user;
};