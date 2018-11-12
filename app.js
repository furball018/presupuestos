var calcularotApp = new Vue({
    el: '#calculator-app',
    data:{
        selected: ''
    },
    methods:{
        addBudget: function(){
            budgetApp.budgets.push({
                'nombre': 'presupuesto agregado',
                'precio': 99
            });
        }
    }
});



var budgetApp = new Vue({
    el: '#budget-app',
    data: {
        budgets: [
            {
                'nombre': 'presupuesto 1',
                'precio': 30
            },
            {
                'nombre': 'presupuesto 2',
                'precio': 40
            },
            {
                'nombre': 'presupuesto 3',
                'precio': 50
            },
        ]
    }
});