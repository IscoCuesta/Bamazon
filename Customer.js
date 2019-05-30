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

function run(){
    inquirer.prompt([
        {
        type: "list",
        message: "Hello! what do you want to do??",
        choices: ["BUY AN ITEM", "EXIT"],
        name: "DIB"
    }        
    ]).then(function(resp){
        if(resp.DIB === "BUY AN ITEM"){
            Buy();
        }else{
            connection.end()

            return true;
        }
    })
}

function Buy (){
    inquirer.prompt([
        {
        type: "input",
        message: "type the item id that you want.",
        name: "id"
        },
        {
        type: "input",
        message: "how many do you want?",
        name: "quantity"
        }
    ]).then(function(resp){
        var stock = 0;
        var price = 0;
        connection.query(`SELECT stock_quantity, price FROM products
        where item_id = `+ resp.id, function(err, res) {
            if (err) throw err;
            // Log all results of the SELECT statement
            stock = res[0].stock_quantity;
            price = res[0].price;
            console.log(price);

            if(resp.quantity < stock){
                console.log("your total is: $" + (price * parseInt(resp.quantity)));
                
                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: stock - parseInt(resp.quantity)
                        },
                        {
                        item_id: resp.id
                      }
                    ],
                    function(err, response) {
                        if (err) throw err;
                      console.log(response.affectedRows + "items updated!\n");
                      readProducts();
                    }
                );



            }else{
                console.log("Insufficient quantity!")
                run();
            }
        });
    })

}