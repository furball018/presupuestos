var calcularotApp = new Vue({
    el: '#calculator-app',
    data:{
        selected: ''
    },
    methods:{
        addBudget: function(){
            budgetApp.budgets.push({
                'topColor': 'top-blue',
                'name': 'presupuesto 1',
                'description': '100 hojas SA3 color',
                'cost': 30
            });
        }
    }
});



var budgetApp = new Vue({
    el: '#budget-app',
    data: {
        budgets: [
            {
                'topColor': 'top-blue',
                'name': 'presupuesto 1',
                'description': '100 hojas SA3 color',
                'cost': 30
            },
            {
                'topColor': 'top-purple',
                'name': 'presupuesto 2',
                'description': '100 hojas SA3 Adhesivo color',
                'cost': 70
            },
            {
                'topColor': 'top-gray',
                'name': 'presupuesto 3',
                'description': '100 hojas SA3 asdasdasdasdasd dasdasd asdasdasd asdasdasdasd asdasda asd color',
                'cost': 40
            },
        ]
    },
    methods:{
        removeBudget: function(i){
            this.budgets.splice(i, 1);
        }
    },
    computed:{
        calcTotal: function(){
            var t = 0;
            this.budgets.forEach(b => {
                t += b.cost;
            });
            return t;
        }
    }
});