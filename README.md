# Bamazon

## About

Bamazon is an application build whith JavaScript. it runs with node and uses some npm pakages like:

    * inquirer
    * MySql

The final goal of the application is to reproduce the interacction of an amazon database. it has three parts that are divided on three different files, which are:

        * Customer.js
        * Manager.js
        * Supervisor.js

Each one has different options.

## Instructions

It works by opening in your terminal the folder where you download the pakage and runing the Index.js file with node lake this: Node **name of the file you want to use**

### files:

1. **Customer.js**

    * Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
    * The app then prompt user with two messages.

        * The first ask them the ID of the product they would like to buy.
        * The second message ask how many units of the product they would like to buy.

    * Once the customer has placed the order, the application check if your store has enough of the product to meet the customer's request.

        * If not, the app log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

    * However, if your store _does_ have enough of the product, the app fulfill the customer's order, displays the total, and updates the DataBase.

2. **Manager.js**

    * First you run the application ask the user what they want to do and give them options:

        * View Products for Sale

        * View Low Inventory
        
        * Add to Inventory
        
        * Add New Product

        * Exit

    * If a manager selects `View Products for Sale`, the app list every available item: the item IDs, names, prices, and quantities.

    * If a manager selects `View Low Inventory`, then it list all items with an inventory count lower than 7.

    * If a manager selects `Add to Inventory`, your app display a prompt that will let the manager "add more" of any item currently in the store.

    * If a manager selects `Add New Product`, it allow the manager to add a completely new product to the store.

3. **Supervisor.js**

    * Not yet coded.


## More Information

    * for more information about how to run the app you can see the 2 videos that are un de Repo.

    * For more information about the app you can contact me.