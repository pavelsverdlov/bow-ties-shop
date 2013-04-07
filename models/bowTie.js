var BowTie = function(_id, _title,_imgPath, _iraty, _price, _descr, _size){

    this.id = _id,
    this.title = _title;
    this.imgPath = _imgPath;
    this.iRaty = _iraty;
    this.price = _price;
    this.descr = _descr;
    this.size = _size;
};

exports.createBowTie = function(_title,_imgPath, _iraty, _price){ return new BowTie('',_title,_imgPath, _iraty, _price, '')};
exports.createBowTie = function(dbModel){
    return new BowTie(dbModel._id,dbModel.name,dbModel.imgPath, dbModel.rating, dbModel.price, dbModel.descr, dbModel.size)
};