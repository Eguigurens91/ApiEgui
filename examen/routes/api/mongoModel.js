var ObjectId = require("mongodb").ObjectID;

function mongoModel(db){
  var lib = {};
  var obt = db.collection('empleado');

  lib.getAllEmpleados = (handler)=>{
      obt.find({}).toArray(
        (err , docs) => {
          if(err){
            handler(err, null);
          }else{
            handler(null, docs);
          }
        }
       ); //toArray
  } //getAllEmpleados

  lib.getEmpleadosById = (empleadoId, handler)=>{
    obt.findOne({ "_id": new ObjectId(empleadoId)}, (err, doc)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, doc);
        }
      }); 
  } 


  lib.addNewEmpleado = (newEmpleado, handler)=>{
    obt.insertOne(newEmpleado, (err, r)=>{
      if(err){
        handler(err, null);
      }else{
        handler(null, r.result);
      }
    }); 
  }

  lib.addTagsToEmpleado = (tags, id , handler) => {
    var curatedTags = Array.isArray(tags)? tags: [tags];
    var updateObject = { "$set": { "tags": curatedTags}};
    obt.updateOne({"_id": ObjectId(id)}, updateObject, (err, rsult)=>{
        if(err){
          handler(err, null);
        }else{
          handler(null, rsult.result);
        }
    } ); 
  } 
  lib.searchByTag = (tags, handler)=>{
    var queryObject= {"tags": {"$in": Array.isArray(tags)? tags: [tags]}};
    obt.find(queryObject).toArray((err, docs) => {
      if(err){
        handler(err, null);
      }else{
        handler(null, docs);
      }
    }); 
  } 

  lib.toggleOBTDone = (id, handler) => {
    var filter = {"_id": ObjectId(id)};
    obt.findOne(filter, (err, doc) => {
      if(err) {
        handler(err, null);
      } else {
          if(doc){
              var updateExpression = {};
              if(doc.done){
                  updateExpression = {"$set": {done : false, fcDone:null} };
              }else{
                  updateExpression = { "$set": { done: true, fcDone:new Date() } };
              }
              obt.updateOne(filter, updateExpression, (err, rslt)=> {
                  if(err) {
                    handler(err, null);
                  }else{
                    handler(null, rslt.result);
                  }
              }); 
          }else{
            handler(new Error("El documento no Existe"), null)
          }
      }
    } );
  }

  lib.deleteById = (Id, handler)=>{
    obt.deleteOne({"_id": ObjectId(Id)}, (err, rslt)=>{
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
 module.exports = mongoModel;
