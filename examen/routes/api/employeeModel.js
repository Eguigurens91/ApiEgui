var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){
  var lib = {};
  var empColl = db.collection('empleado');
  
  lib.getEmployees = (handler)=>{
    empColl.find({}).toArray(
      (err , docs) => {
        if(err){
          handler(err, null);
        }else{
          handler(null, docs);
        }
      }
     ); 
  }


  lib.getEmployeesById = (id, handler) => {
  empColl.findOne({ "_id": new ObjectId(empleadoId)}, (err, doc)=>{
      if(err){
        handler(err, null);
      }else{
        handler(null, doc);
      }
    });
  }

  lib.getEmployeesByCompany = (company, handler) => {
    empColl.findOne({"_idcompany":new ObjectID(companyId)},(err,doc)=>{
      if (err){
        handler(err,null);
      }else{
        handler(null,doc);
      }
    });  
  }

  lib.getEmployeesByTag = (tag, handler) => {
    var queryObject= {"tags": {"$in": Array.isArray(tags)? tags: [tags]}};
    empColl.find(queryObject).toArray((err, docs) => {
      if(err){
        handler(err, null);
      }else{
        handler(null, docs);
      }
    }); 
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    var curatedTags = Array.isArray(tags)? tags: [tags];
    var updateObject = { "$set": { "tags": curatedTags}};
    empColl.updateOne({"_id": ObjectId(id)}, updateObject, (err, rsult)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, rsult.result);
        }
    } ); 
  }

  lib.removeEmployee = (id, handler) => {
      empColl.deleteOne({"_id": ObjectId(Id)}, (err, rslt)=>{
      if(err){
        console.log(err);
        handler(err, null);
      } else {
        handler(null, rslt.result);
      }
    }); 
     }

  return lib;
}

module.exports = employeeModel;
