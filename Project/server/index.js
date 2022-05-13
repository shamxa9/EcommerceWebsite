const express = require('express')
const cors = require('cors')
const app=express() 
const bodyParser= require('body-parser')
const mysql= require("mysql");  
var id1;

const db=mysql.createPool({
    host: "localhost",
    user:"root",
    password: "k190294",
    database: "ecommerce",

});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.post("/customer/signup/",(req,res)=>{
    const fname= req.body.fname
    const lname=req.body.lname
    const address = req.body.address
    const pnumber = req.body.pnumber
    const city = req.body.city
    //const email = req.body.email
    const pcode= req.body.pcode
    const age = req.body.age;
    const password= req.body.password;
     

    
    const sqlInsert ="insert into personalinfo(address,phone_no,city,postalcode) values(?,?,?,?)";
    db.query(sqlInsert,[address,pnumber,city,pcode],(err,result)=>{
        if(err) console.log(err);


        console.log("success");
        //res.send("nice");
    });
    
    const sqlInsert1="insert into customer(fname,lname,password) value (?,?,?);";
    db.query(sqlInsert1,[fname,lname,password],(err,result)=>{
        var id2;
        if(err)   console.error('error connecting: ' + err.stack);

        else{
            console.log("inserted");
            //res.send("hgya bhai insert");
        }
        console.log("inserted");
    });

    db.query("update customer set p_id=(select max(id) from personalinfo) where fname=?;",[fname],(err,result)=>{
        if(err)  console.log(err);
        else{
        console.log(result);
        res.send(result);}

    })



});

app.post("/supplier/signup",(req,res)=>{
    const fname= req.body.fname
    const lname=req.body.lname
    const address = req.body.address
    const pnumber = req.body.pnumber
    const city = req.body.city
    //const email = req.body.email
    const pcode= req.body.pcode
    const age = req.body.age;
    const password= req.body.password;
     

    
    const sqlInsert ="insert into personalinfo(address,phone_no,city,postalcode) values(?,?,?,?)";
    db.query(sqlInsert,[address,pnumber,city,pcode],(err,result)=>{
        if(err) console.log(err);


        console.log("success");
        //res.send("nice");
    });
    
    const sqlInsert1="insert into supplier(fname,lname,password) value (?,?,?);";
    db.query(sqlInsert1,[fname,lname,password],(err,result)=>{
        var id2;
        if(err)   console.error('error connecting: ' + err.stack);

        else{
            console.log("inserted");
            //res.send("hgya bhai insert");
        }
        console.log("inserted");
    });

    db.query("update supplier set p_id=(select max(id) from personalinfo) where fname=?;",[fname],(err,result)=>{
        if(err)  console.log(err);
        else{
        console.log(result);
        res.send(result);}

    })




})
app.post("/get/bill",(req,res)=>{
    const cid=req.body.cid;
    const c=parseInt(cid);
    sql = "select * from billing_info where customer_id = ?;";
    db.query(sql,[c],(err,result)=>{
        if(err)  console.log(err);

        else{
        console.log("yotal")
        res.send(result);}
    })
})
app.post("/check/customer",(req,res)=>{
    const cid=req.body.cid;
    const c=parseInt(cid);
    const sqlc="select * from cart where customer_id=?;";
    db.query(sqlc,[c],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

app.post("/create/bill",(req,res)=>{
    const cid=req.body.cid;
    const c=parseInt(cid);
    sql="insert into billing_info(billing_date,customer_id) values (sysdate(),?);";
    db.query(sql,[c,c],(err,result)=>{
        if(err)
            console.log(err);
        else
            console.log("date generate");
    });
    sql="update billing_info set total=(select total_price from cart where customer_id=?)where customer_id=?;";
    db.query(sql,[c,c],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        console.log(result);
    })
    
})
app.post("/get/cus",(req,res)=>{
    const cid=req.body.cid;
    const c=parseInt(cid);
    sql = "select * from personalinfo p,customer c where c.id = ? and p.id=c.p_id;";
    db.query(sql,[c],(err,result)=>{
        if(err)  console.log(err);

        else{
        console.log("done1")
        res.send(result);}
    })
    sql="delete from cart where customer_id=?;";
    db.query(sql,[c],(err,result)=>{
        if(err)
            console.log(err);
        else
            console.log("done");
    })
})
// app.post("/get/bill",(req,res)=>{
//     const cid=req.body.cid;
//     const c=parseInt(cid);
//     sql = "select * from billing_info where customer_id = ?;";
//     db.query(sql,[c],(err,result)=>{
//         if(err)  console.log(err);

//         else{
//         console.log("yotal")
//         res.send(result);}
//     })
// })
app.post("/add/cart",(req,res)=>{
    const cid=req.body.cid;
    const c=parseInt(cid);
    const price=req.body.price;
    const sqlcr="update cart set total_price=total_price+? , num_of_products=num_of_products+1 where customer_id=?;";
    db.query(sqlcr,[price,c],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("hgya add");
        }
    })
})
app.post("/add/customer",(req,res)=>{
    const cid=req.body.cid;
    const c=parseInt(cid);
    sqlid="insert into cart(customer_id) values(?);";
    db.query(sqlid,[c],(err,result)=>{
        if(err)
        {
            console.log(error);
        }
        else
            console.log("cid done");
    })
})
app.post("/Admin/login",(req,res)=>{
    
    sqlogin="select * from admin where id=? and password=?;"
    const id=req.body.id;
    const password = req.body.password;
    console.log(id);
    db.query(sqlogin,[id,password],(err,result)=>{
        if(err)   console.log(err);
        else if(result)  {
            console.log(result);
            res.send(result);
            
        }
    })
});
app.get("/home/product",(req,res)=> {
    const sql="select * from product where status='approved';";
   db.query(sql,(err,result)=>{
        if (err)  console.log(err);


       res.send(result);

   })
});

app.post("/search/search",(req,res)=>{
    const product=req.body.product;
    console.log("product");
    const abc="select * from product where name=?;";
    db.query(abc,[product],(err,result)=>{
        if(err) console.log(err);
        console.log(result);
        res.send(result);
        
    })
});
app.get("/home/search",(req,res)=> {
   
       const sqla ="select * from product;";
       db.query(sqla,(err,result)=>{
           res.send(result);
       })
});
app.post("/admin/add",(req,res)=>{
    const id=req.body.id;
    sqlad="update product set status='approved' where id=?;";
    db.query(sqlad,[id],(err,res)=>{
        if(err) console.log(err);

        else
        console.log("success");
    })
});
app.post("/admin/reject",(req,res)=>{
    const id=req.body.id;
    sqlad="delete from product where id=?;";
    db.query(sqlad,[id],(err,res)=>{
        if(err) console.log(err);

        else
        console.log("success");
    })
});
app.get("/admin/product",(req,res)=>{
    const sqladmin="select * from product where status='not approved';";
      db.query(sqladmin,(err,result)=>{
        if (err)  console.log(err);



       res.send(result);

   })
});
app.post('/supplier/add',(req,res)=>{

    const productname=req.body.productname;
    const price=req.body.price;
    const supplier=req.body.supplier;
    const cat=req.body.cat;
    const qty=req.body.qty;
    console.log(supplier+price);
    sqladd="insert into product(name,price,quantity) values (?,?,?);";
    db.query(sqladd,[productname,price,qty],(err,res)=>{
        if(err) console.log(err);

        else
        console.log("done");

    })

    sqlsup="update product set s_id=(select id from supplier where fname=?) where name=? and price=? and quantity=?";
    db.query(sqlsup,[supplier,productname,price,qty],(err,res)=>{
        if(err) console.log(err);
    })

    sqlcat="update product set category=(select id from category where name=?) where name=? and price=? and quantity=? "
    db.query(sqlcat,[cat,productname,price,qty],(err,res)=>{
        if(err) console.log(err);
    })
});
//app.use(express.params());
app.post("/customer/login",(req,res)=>{
    //const table=req.body.table;
    sqlogin="select * from customer where fname=? and password=?;"
    const username=req.body.username;
    const password = req.body.password;
    console.log(username);
    db.query(sqlogin,[username,password],(err,result)=>{
        if(err)   console.log(err);
        else if(result)  {
            console.log(result);
            res.send(result);
            
        }
    })
});

app.post("/supplier/login",(req,res)=>{
    
    sqlogin="select * from supplier where fname=? and password=?;"
    const username=req.body.username;
    const password = req.body.password;
    console.log(username);
    db.query(sqlogin,[username,password],(err,result)=>{
        if(err)   console.log(err);
        else if(result)  {
            console.log(result);
            res.send(result);
            
        }
    })
});



app.listen(3001, () => {
    console.log("running port 3001");
});
