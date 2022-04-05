const {Sequelize}=require("sequelize");
const db=require("../configs/dbconfig");

let person=db.define('person',{
    firstName:{
        type:Sequelize.STRING
    },
    lastName:{
        type:Sequelize.STRING
    },
    gender:{
        type:Sequelize.STRING
    },
    country:{
        type:Sequelize.STRING
    },
    age:{
        type:Sequelize.STRING
    },
    date:{
       type:Sequelize.STRING
    }
},
{
    timestamps:false
});

module.exports=person;