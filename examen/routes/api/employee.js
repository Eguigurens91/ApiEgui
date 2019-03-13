var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);
  var jsonModel = require ('/jsonModel')(db); 

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all ///// Ya..
      GET       /byid/:id ///ya
      GET       /bycompany/:company ///ya 
      GET       /byagerange/:min/:max  ///NO se!
      GET       /bytag/:tag ///ya
      POST      /addtag/:id ///ya              tag
      DELETE    /delete/:id //// ya
      POST      /makeolder               age
   */
  var employeed = {
    '_id':'',
    'Nombre':'',
    'phone':null,
    'email':'',
    'type': 'small' 
  };
  router.get('/all', function( req, res, next) {
    if(!data){
      fileModel.read(function(err, filedata){
        if(err){
          console.log(err);
          data = [];
          return res.status(500).json({'error':'Error al obtener la data requerida.'});
        }
        data = JSON.parse(filedata);
        return res.status(200).json(data);
      });
    } else {
      return res.status(200).json(data);
    }
  });

  router.get('/byid/:id', (req, res, next)=>{
    empModel.getEmploById(req.params.Emploid, (err, emploDoc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error al obtener el empleado"});
      }
      return res.status(200).json(thingDoc);
    } );
  }); 

  router.get('/bycompany/:company', (req, res, next)=>{
   empModel.getEmployeesByCompany(req.params.companyId, (err, companyDoc)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"Error al obtener el empleado por compania"});
      }
      return res.status(200).json(employeedDoc);
    } );
  }); 

  router.get('/bytags/:tag', (req, res, next)=>{
    empModel.searchByTag((req.params.tag || '').split('_'), (err, docs)=>{
      if(err){
        console.log(err);
        return res.status(500).json({"error":"No se encontro la data"});
      }else{
        return res.status(200).json(docs);
      }
    } ); 
  }); 
  
  router.delete('/delete/:employeedId', function(req, res, next){
    var _employeedId = req.params.employeedId;
    empModel.deleteById(_employeedId, (err, result)=>{
      if(err){
        return res.status(500).json({"error":"No se pudo eliminar dato"});
      }
      return res.status(200).json(result);
    }); 
  }); 
  
  fileModel.read(function(err , filedata){
    if(err){
      console.log(err);
    } else{
      data = JSON.parse(filedata);
    }
  });
  
  return router;
}

module.exports = initEmployee;

