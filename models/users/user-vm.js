var UserViewModel = function(_fname,_lname,_email){
    this.id ='';
    this.firstName = _fname;
    this.lastName = _lname;
    this.email = _email;
    this.orders = [];
    this.role = '';
}

exports.create = function(fname,lname,email){ return new UserViewModel(fname,lname,email);}
