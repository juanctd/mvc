var express = require('express');
var router = express.Router();

var bd= require('../routes/bd');

/* GET users listing. */
router.get('/listar', (req, res, next) =>{
    try {
      bd.getConnection().then(con=>{
        con.query('SELECT * FROM users').then(data=> {
          res.render('users/listar',{users: data});
        });
      });
    } catch (error) {
     console.log("Error en la consulta", error);
  }
    
});

router.get('/create', function(req, res, next) {
  res.render('users/create');
});

router.post('/store', (req, res, next) =>{
  console.log(req.body);
  var registro=[
    usuario=req.body.usuario,
    clave=req.body.clave
  ];
  
    try {
      bd.getConnection().then(con=>{
        con.query('insert into users(usuario,clave) values(?,?)',registro).then(data=> {
          bd.getConnection().then(con=>{
            con.query('SELECT * FROM users').then(data=> {
                res.render('users/listar',{users: data});
            });
          });
        });
      });
    }catch (error) {
        console.log("Error al insertar los datos", error);
    }
  });

router.get('/edit/:id', (req, res, next) =>{
    console.log("entre");
      try {
        bd.getConnection().then(con=>{
          con.query('SELECT * FROM users where id='+req.params.id).then(data=> {
            res.render('users/edit',{users: data});
          });
        });
      } catch (error) {
       console.log("Error al listar el usuario", error);
    }
      
  });

  router.get('/eliminar/:id', (req, res, next) =>{
      console.log("entre");
        try {
          bd.getConnection().then(con=>{
            con.query('SELECT * FROM users where id='+req.params.id).then(data=> {
              res.render('users/delete',{users: data});
            });
          });
        } catch (error) {
         console.log("Error al listar el usuario", error);
      }
        
    });

    router.post('/update', (req, res, next) =>{
        const fecha_actualizacion = new Date(Date.now());
        let parametros = [req.body.clave, fecha_actualizacion, req.body.id];
        try {
          bd.getConnection().then(con=>{
            console.log("update users set clave='"+req.body.clave+"' where id="+req.body.id);
            let sql = `UPDATE users SET clave = ?, fecha_actualizacion = ? WHERE id = ?`;
            con.query(sql,parametros).then(data=> {
              bd.getConnection().then(con=>{
                  con.query('SELECT * FROM users').then(data=> {
                      res.render('users/listar',{users: data});
                  });
                });
              });
          });
        }catch (error) {
            console.log("Error al actualizar los datos", error);
        }
          
    });

    router.post('/delete', (req, res, next) =>{
          const id=req.body.id;
          try {
            bd.getConnection().then(con=>{
              con.query('delete FROM users where id='+req.body.id).then(data=> {
                bd.getConnection().then(con=>{
                  con.query('SELECT * FROM users').then(data=> {
                      res.render('users/listar',{users: data});
                  });
                });                
              });
            });
          } catch (error) {
            console.log("Error al eliminar los datos", error);
        }
            
    });  
 
module.exports = router;
