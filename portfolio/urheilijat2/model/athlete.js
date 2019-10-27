var mongoose  = require('mongoose');


var schema = mongoose.Schema({
  firstname : { 
    type: String,
    //required: true, 
    max: 50
  },
  lastname : { 
    type: String,
    required: true, 
    max: 50
  },
  nickname : { 
    type: String,
    required: true, 
    max: 50
  },
  age : { 
    type: Date,
    required: true, 
  },
  weight : { 
    type: Number,
    required: true, 
    max: 200
  },
  img : {
    type : String,
    required: true
  },
  sports : {
    type : String,
    required: true
  },
  stats :  {
    type : String ,
    required: true
  }

});

// create the model for athletes and expose it to the application
module.exports = mongoose.model('Athlete', schema);