var UserViewModel = function(){
    this._id ='';
    this.getId = function(){
        return this._id.toHexString();
    };
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.date_bord = '';
    this.phone = '';
    this.orders = [];
    this.isSubscribe = false;
    this.role = 2;
    this.idate_reg = '';
    //
    this.salt = '';
    this.hashed_password = '';
    this.passwd = '';
    //
    this.isAuth = false;
    this.isConfirm = false;
};

exports.get = function(){ return new UserViewModel(); }

exports.createModel = function(dbModel){
    var user = new UserViewModel();
    user.firstName = dbModel.firstName;
    user.lastName = dbModel.lastName;
    user.email = dbModel.email;
    user._id = dbModel._id;//._id.toHexString();
    user.role = dbModel.role;
    user.salt = dbModel.salt;
    user.hashed_password = dbModel.hashed_password;
    user.idate_reg = parseInt(dbModel.idate_reg);
    user.isConfirm = dbModel.isConfirm;

    return user;
};