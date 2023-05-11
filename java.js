var budgetController = (function(){


    var Expense = function(id , description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id , description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };


    var data = {
        allItem: {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0
        }
    };
    return{
        addItem : function(type, des, val){
            var newItem, ID;

            if(data.allItem[type].length > 0 ){
                ID = data.allItem[type][data.allItem[type].length -1]. id + 1;

            }else{
                ID = 0;
            }
            

            if(type === "exp"){
                newItem =  new Expense (ID , des , val);
            } else if(type === "inc" ){
                newItem =  new Income (ID , des , val);
            };
            data.allItem[type].push(newItem);
            return newItem;
        },

        addListItems: function (obj , type){
            var html, newHtml,element;

            if(type === "inc"){
                element = DOMstrings.incomeList
              html =   '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item--delete--btn"><ion-icon name="trash"><ion-icon name="close"></ion-icon></ion-icon></button></div></div></div>';
            }else if (type === "exp"){
                element = DOMstrings.ExpensesList;
                html = '<div class="item clearfix" id="expense-%id%><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><ion-icon name="close"></ion-icon></button></div></div></div>';
            }
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", obj.value);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

            return this.addListItems;
        },

        testing : function(){
            console.log(data)
        }

    };
})();


var UIController = (function(){
    DOMstrings = {
        type :'.addType',
        description : ".addDescription",
        value : ".addValue",
        btn : ".addBtn",
        incomeList : ".incomeList",
        expensesList : ".expensesList"
    }
    return{
        getInput : function(){
            return {
                inputType : document.querySelector(DOMstrings.type).value,
                inputDescription : document.querySelector(DOMstrings.description).value,
                inputValue : document.querySelector(DOMstrings.value).value         
            };
        },
        getDOMstrings : function(){
            return DOMstrings;
        }
    };
})();

var Controller = (function  (budgetCtrl, UICtrl){
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.btn).addEventListener("click", contrAddItem);
        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
              contrAddItem();
            }
          });
    },


    contrAddItem = function(){
        var input , newItem;
        input = UICtrl.getInput();
        newItem = budgetCtrl.addItem(input.inputType, input.inputDescription, input.inputValue);  
        
        UICtrl.addListItems(newItem, input.inputType);
    };

    return {
        init: function(){
            console.log("application has started")
            setupEventListeners();

        }
    };
})(budgetController, UIController);

Controller.init();