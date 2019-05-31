var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Santander7",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});



function readProducts() {
console.log("Selecting all products...\n");
connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    run();
});
}


function readLowProducts() {
console.log("Selecting all products...\n");
connection.query("SELECT item_id, product_name, stock_quantity FROM products where stock_quantity < 7", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    run();
});
}

function run(){
    inquirer.prompt([
        {
        type: "list",
        message: "Hello! what do you want to do??",
        choices: ["View Products for sale", "View Low Inventory", "Add Inventory", "Add new Product", "EXIT"],
        name: "DIB"
    }        
    ]).then(function(resp){
        if(resp.DIB === "View Products for sale"){
            readProducts();
        }else if(resp.DIB === "View Low Inventory"){
            readLowProducts();
        }else if(resp.DIB === "Add Inventory"){
            addInv();
        }else if(resp.DIB === "Add new Product"){
            addProducts();
        }else{
            connection.end()
            return true;
        }
    })
}

function addInv (){
    inquirer.prompt([
        {
        type: "input",
        message: "type the item id.",
        name: "id"
        },
        {
        type: "input",
        message: "how many do you want to add?",
        name: "quantity"
        }
    ]).then(function(resp){
        var stock = 0;

        connection.query(`SELECT stock_quantity FROM products
        where item_id = `+ resp.id, function(err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            stock = res[0].stock_quantity;
              
            connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                stock_quantity: stock + parseInt(resp.quantity)
                },
                {
                item_id: parseInt(resp.id)
                }
            ],
            function(err, response) {
                if (err) throw err;
                console.log(response.affectedRows + " items updated!\n");
                readProducts();
            }
        );
        });
    });
}


function addProducts (){
    inquirer.prompt([
        {
        type: "input",
        message: "Product name",
        name: "name"
        },
        {
        type: "input",
        message: "department",
        name: "dept"
        },
        {
        type: "input",
        message: "sell price",
        name: "price"
        },
        {
        type: "input",
        message: "stock quantity",
        name: "stock"
        }
    ]).then(function(resp){
        var query = connection.query(
            "INSERT INTO products SET ?",
            {
                product_name: resp.name,
                department_name: resp.dept,
              price: resp.price,
              stock_quantity: resp.stock

            },
            function(err, res) {
              console.log(res.affectedRows + " product inserted!\n");
              // Call updateProduct AFTER the INSERT completes
              run();
            }
          );

    })

}