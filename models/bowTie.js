var BowTie = function(_title,_imgPath, _iraty, _price, _descr){

    this.title = _title;
    this.imgPath = _imgPath;
    this.iRaty = _iraty;
    this.price = _price;
    this.descr = _descr;
};

exports.createBowTie = function(_title,_imgPath, _iraty, _price){ return new BowTie(_title,_imgPath, _iraty, _price, '')};
exports.createBowTie = function(dbModel){
    return new BowTie(dbModel.name,dbModel.imgPath, dbModel.rating, dbModel.price, dbModel.descr)
};