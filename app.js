var preciosData =
{
    "laserColor":{
        "SA3G" : {
            "unacopia" : 37,
            "dosacinco" : 27,
            "seisaveinte" : 23,
            "masdeveinte" : 22
        },
        "SA3F" : {
            "unacopia" : 32,
            "dosacinco" : 22,
            "seisaveinte" : 18,
            "masdeveinte" : 17
        },
        "SA3AA" : {
            "unacopia" : 36,
            "dosacinco" : 30,
            "seisaveinte" : 28,
            "masdeveinte" : 25
        },
        "SA3S" : {
            "unacopia" : 62,
            "dosacinco" : 52,
            "seisaveinte" : 48,
            "masdeveinte" : 47
        },
        "SA3I" : {
            "unacopia" : 115,
            "dosacinco" : 105,
            "seisaveinte" : 100,
            "masdeveinte" : 95
        },
        "A4G" : {
            "unacopia" : 20,
            "dosacinco" : 16,
            "seisaveinte" : 15,
            "masdeveinte" : 14
        },
        "A4F" : {
            "unacopia" : 18,
            "dosacinco" : 14,
            "seisaveinte" : 13,
            "masdeveinte" : 12
        },
        "A4AA" : {
            "unacopia" : 18,
            "dosacinco" : 15,
            "seisaveinte" : 14,
            "masdeveinte" : 12
        },
        "papelGrueso" : 5,
        "papelEspecial" : 30,
        "corteGuillotina" : 10,
        "corteMano" : 1,
        "laminado" : 17,
        "marcado" : 2
    },
    "laserBN":{
        "A3":{
            "simplefaz":{
                "cincuentaomas" : 3.5,
                "menosdecincuenta" : 5
            },
            "doblefaz":{
                "cincuentaomas" : 2.5,
                "menosdecincuenta" : 3.5
            }
        },
        "A4":{
            "simplefaz":{
                "cincuentaomas" : 2.5,
                "menosdecincuenta" : 3
            },
            "doblefaz":{
                "cincuentaomas" : 2,
                "menosdecincuenta" : 2.5
            }
        }
    },
    "plotPapel":{
        "90cm":{
            "lineasBN": 85,
            "lineasColor": 105,
            "plenos": 270
        },
        "60cm":{
            "lineasBN": 75,
            "lineasColor": 80,
            "plenos": 220
        },
        "doblado": 20
    }
}

var calcularotApp = new Vue({
    el: '#calculator-app',
    data:{
        selected: '',
        precios: preciosData, 
        laserColor:{
            title: 'Trabajo Laser Color',
            papel: 'select',
            dimensiones: {
                x: 0,
                y: 0,
                m: 0,
            },
            hojas: 0,
            lados: 1,
            laminado: 0,
            dispos: 0,
            recortes: {
                x: 0,
                y: 0
            },
            corte: 'no',
            showRecortes: false,
            disableLados: false,
            resultados: {
                invertido: false,
                unidadesTotales: 0,
                entranX: 0,
                entranY: 0,
                corteGuillotina: 0,
                corteMano: 0,
                precioPagina: 0,
                precioLaminado: 0,
                precioCorte: 0,
                total: 0,
                description: ''
            }
        },
        laserBN:{
            title: 'Nuevo Presupuesto',
            papel: 'select',
            hojas: 0,
            lados: 'simplefaz',
            cortes: 0,
            dispos: 0,
            resultados:{
                precioPagina: 0,
                total: 0,
                description: ''
            }
        },
        plotPapel:{
            title: "Nuevo Presupuesto",
            rollo: "90cm",
            largo: 0,
            tipo: "lineasBN",
            cantidad: 0,
            doblado: 0,
            dispos: 0,
            resultados:{
                precioPlano: 0,
                precioDoblado: 0,
                total: 0,
                description: ""
            }
        }
    },
    methods:{
        cambiarDimensiones: function(){
            if(this.laserColor.papel == 'SA3G' || this.laserColor.papel == 'SA3F' || this.laserColor.papel == 'SA3AA' || this.laserColor.papel == 'SA3I' || this.laserColor.papel == 'SA3S'){
                this.laserColor.dimensiones.x = 450;
                this.laserColor.dimensiones.y = 320;
                this.laserColor.dimensiones.m = 7;
            }else if(this.laserColor.papel == 'A4G' || this.laserColor.papel == 'A4F' || this.laserColor.papel == 'A4AA'){
                this.laserColor.dimensiones.x = 297;
                this.laserColor.dimensiones.y = 210;
                this.laserColor.dimensiones.m = 7;
            }
        },
        addBudget: function(type){
            if(type == "laser-color"){
                budgetApp.budgets.push({
                    'topColor': 'top-laser-color',
                    'name': this.laserColor.title,
                    'description': this.laserColor.resultados.description,
                    'cost': this.laserColor.resultados.total,
                    'active': true
                });
            }
            if(type == "laser-bn"){
                budgetApp.budgets.push({
                    'topColor': 'top-laser-bn',
                    'name': this.laserBN.title,
                    'description': this.laserBN.resultados.description,
                    'cost': this.laserBN.resultados.total,
                    'active': true
                });
            }
            if (type == "plot-papel") {
                budgetApp.budgets.push({
                    'topColor': 'top-plot-papel',
                    'name': this.plotPapel.title,
                    'description': this.plotPapel.resultados.description,
                    'cost': this.plotPapel.resultados.total,
                    'active': true
                });
            }
        },
        reiniciar: function(type){
            if(type == "laser-color"){
                this.laserColor.title = 'Nuevo Presupuesto';
                this.laserColor.papel = 'select';
                this.laserColor.dimensiones.x = 0;
                this.laserColor.dimensiones.y = 0;
                this.laserColor.dimensiones.m = 0;
                this.laserColor.hojas = 0;
                this.laserColor.lados = 1;
                this.laserColor.laminado = 0;
                this.laserColor.dispos = 0;
                this.laserColor.recortes.x = 0;
                this.laserColor.recortes.y = 0;
                this.laserColor.corte = 'no';
                this.laserColor.showRecortes = false;
                this.laserColor.disableLados = false;
                this.laserColor.resultados.invertido = false;
                this.laserColor.resultados.unidadesTotales = 0;
                this.laserColor.resultados.entranX = 0;
                this.laserColor.resultados.entranY = 0;
                this.laserColor.resultados.corteGuillotina = 0;
                this.laserColor.resultados.corteMano = 0;
                this.laserColor.resultados.precioPagina = 0;
                this.laserColor.resultados.precioLaminado = 0;
                this.laserColor.resultados.precioCorte = 0;
                this.laserColor.resultados.total = 0;
                this.laserColor.resultados.description = '';
            }
            if(type == "laser-bn"){
                this.laserBN.title = 'Nuevo Presupuesto';
                this.laserBN.papel = 'select';
                this.laserBN.hojas = 0;
                this.laserBN.lados = 'simplefaz';
                this.laserBN.dispos = 0;
                this.laserBN.resultados.precioPagina = 0;
                this.laserBN.resultados.total = 0;
                this.laserBN.resultados.description = '';
            }
            if(type == "plot-papel"){
                this.plotPapel.title = 'Nuevo Presupuesto';
                this.plotPapel.rollo = '90cm';
                this.plotPapel.largo = 0;
                this.plotPapel.tipo = 'lineasBN';
                this.plotPapel.cantidad = 0;
                this.plotPapel.doblado = 0;
                this.plotPapel.dispos = 0;
                this.plotPapel.resultados.precioPlano = 0;
                this.plotPapel.resultados.precioDoblado = 0;
                this.plotPapel.resultados.total = 0;
                this.plotPapel.resultados.description = '';
            }
        },
        toggleRecortes: function(){
            this.laserColor.showRecortes = !this.laserColor.showRecortes;
            if (!this.laserColor.showRecortes) {
                this.laserColor.recortes.x = 0;
                this.laserColor.recortes.y = 0;
                this.laserColor.corte = 'no';
            }
        }
        
    },
    computed:{
        laserColor_disableLados: function(){
            if (this.laserColor.papel == 'SA3AA' || this.laserColor.papel == 'SA3I' || this.laserColor.papel == 'A4AA') {
                this.laserColor.lados = 1;
                return true;
            }else{
                return false;
            }
        },
        laserColor_calcularPrecioPagina: function(){
            var categoria;
            var descuentoDobleFaz = 0;
            if (this.laserColor.hojas > 20) {
                categoria = 'masdeveinte';
            }else if (this.laserColor.hojas > 6){
                categoria = 'seisaveinte';
            }else if (this.laserColor.hojas > 1){
                categoria = 'dosacinco';
            }else if (this.laserColor.hojas == 1){
                categoria = 'unacopia';
            }else{
                return 0;
            }

            switch (true) {
                case (this.laserColor.papelGrueso == 'SA3G' || this.laserColor.papelGrueso == 'SA3F'):
                    descuentoDobleFaz = this.precios.laserColor.papelGrueso;
                    break;
                case 'SA3S':
                    descuentoDobleFaz = this.precios.laserColor.papelEspecial;
                    break;
                case 'A4G' || 'A4F':
                    descuentoDobleFaz = this.precios.laserColor.papelGrueso / 2;
                    break;
            }
            this.laserColor.resultados.precioPagina = parseFloat(this.precios.laserColor[this.laserColor.papel][categoria] * this.laserColor.lados) - descuentoDobleFaz;
            return parseFloat(this.precios.laserColor[this.laserColor.papel][categoria] * this.laserColor.lados) - descuentoDobleFaz;
        },
        laserColor_calcularLaminado: function(){
            var a = parseInt(this.laserColor.laminado);
            var b = parseInt(this.precios.laserColor.laminado);
            var c = parseInt(this.laserColor.hojas);
            this.laserColor.resultados.precioLaminado = a * b * c;
            return a * b * c;
        },
        laserColor_calcularUnidadesPorPagina: function(){
            var a = Math.trunc((this.laserColor.dimensiones.x - (this.laserColor.dimensiones.m * 2)) / this.laserColor.recortes.x) * Math.trunc((this.laserColor.dimensiones.y - (this.laserColor.dimensiones.m * 2)) / this.laserColor.recortes.y);
            var b = Math.trunc((this.laserColor.dimensiones.x - (this.laserColor.dimensiones.m * 2)) / this.laserColor.recortes.y) * Math.trunc((this.laserColor.dimensiones.y - (this.laserColor.dimensiones.m * 2)) / this.laserColor.recortes.x);
            var r = Math.max(a, b);

            this.laserColor.resultados.unidadesTotales = r * this.laserColor.hojas;

            if(a > b){
                this.laserColor.resultados.invertido = true;
                this.laserColor.resultados.entranX = Math.trunc((this.laserColor.dimensiones.y - (this.laserColor.dimensiones.m * 2)) / this.laserColor.recortes.y);
                this.laserColor.resultados.entranY = Math.trunc((this.laserColor.dimensiones.x - (this.laserColor.dimensiones.m * 2)) / this.laserColor.recortes.x);
            }else{
                this.laserColor.resultados.invertido = false;
                this.laserColor.resultados.entranX = Math.trunc((this.laserColor.dimensiones.x - (this.laserColor.dimensiones.m * 2)) / this.laserColor.recortes.y);
                this.laserColor.resultados.entranY = Math.trunc((this.laserColor.dimensiones.y - (this.laserColor.dimensiones.m * 2)) / this.laserColor.recortes.x);
            }

            return r;
        },
        laserColor_calcularCortesGuillotina: function(){
            var a = parseInt(this.laserColor.resultados.entranX) + 1;
            var b = parseInt(this.laserColor.resultados.entranY) + 1;
            var c = 0;
            if(a == Infinity || b == Infinity || isNaN(a) || isNaN(b)){
                return 0;
            }
            while( a + b != 2 ){
                if(a >= b){
                    a = Math.ceil(a / 2);
                }else{
                    b = Math.ceil(b / 2);   
                }
                c++;
            }
            this.laserColor.resultados.corteGuillotina = Math.max(4, c);
            return Math.max(4, c);
        },
        laserColor_calcularCortesMano: function(){
            var a = parseInt(this.laserColor.resultados.entranX);
            var b = parseInt(this.laserColor.resultados.entranY);
            var c = parseInt(this.laserColor.hojas);
            this.laserColor.resultados.corteMano = (a + b + 2) * c;
            return (a + b + 2) * c;

        },
        laserColor_calcularPrecioCorte: function(){
            if(this.laserColor.corte == 'no'){
                this.laserColor.resultados.precioCorte = 0;
                return 0;
            }else if(this.laserColor.corte == 'guillotina'){
                var a = parseInt(this.laserColor.resultados.corteGuillotina);
                var b = parseInt(this.precios.laserColor.corteGuillotina);
                this.laserColor.resultados.precioCorte = a * b;
                return a * b;
            }else if(this.laserColor.corte == 'mano'){
                var a = parseInt(this.laserColor.resultados.corteMano);
                var b = parseInt(this.precios.laserColor.corteMano);
                this.laserColor.resultados.precioCorte = a * b;
                return a * b;
            }
        },
        laserColor_calcularTotal: function(){
            var a = parseInt(this.laserColor.resultados.precioPagina);
            var b = parseInt(this.laserColor.hojas);
            var c = parseInt(this.laserColor.resultados.precioLaminado);
            var d = parseInt(this.laserColor.dispos);
            var e = parseInt(this.laserColor.resultados.precioCorte);
            this.laserColor.resultados.total = (a * b) + c + d + e;
            return (a * b) + c + d + e;
        },
        laserColor_calcularDescription: function(){
            var d = '';
            d += this.laserColor.hojas + ' copias laser color';
            d += this.laserColor.papel != 'select' ? (' '+this.laserColor.papel) : '';
            var l = this.laserColor.lados == 1? 'simplefaz' : 'doblefaz';
            d+= ', ' + l;
            var lam;
            if (this.laserColor.laminado == '1') {
                d+= ', ' + 'laminado sólo frente'
            }else if(this.laserColor.laminado == '2'){
                d+= ', ' + 'laminado ambos lados'
            }
            if(this.laserColor.showRecortes){
                d += ' (';
                if((this.laserColor.recortes.x != 0) && (this.laserColor.recortes.y != 0)){
                    d += 'unidades de ' + this.laserColor.recortes.x + ' x ' + this.laserColor.recortes.y + ' mm';
                }
                if(this.laserColor.corte == 'guillotina'){
                    d += ', cortados a guillotina';
                }else if(this.laserColor.corte == 'mano'){
                    d += ', cortados a mano';
                }
                d += ')';
            }
            d += this.laserColor.dispos != 0 ? ' (se agregan $'+this.laserColor.dispos+' de diseño/pose)' : '';
            d += '.'

            this.laserColor.resultados.description = d;
            return d;
        },
        laserBN_calcularPrecioPagina: function(){
            var categoria;
            if (this.laserBN.hojas >= 50) {
                categoria = 'cincuentaomas';
            }else if(this.laserBN.hojas > 0){
                categoria = 'menosdecincuenta';
            }else{
                return 0;
            }

            this.laserBN.resultados.precioPagina = parseFloat(this.precios.laserBN[this.laserBN.papel][this.laserBN.lados][categoria]);
            return parseFloat(this.precios.laserBN[this.laserBN.papel][this.laserBN.lados][categoria]);
        },
        laserBN_calcularTotal: function(){
            var a = parseInt(this.laserBN.resultados.precioPagina);
            var b = parseInt(this.laserBN.hojas);
            var c = parseInt(this.laserBN.dispos);
            this.laserBN.resultados.total = (a * b) + c;
            return (a * b) + c;
        },
        laserBN_calcularDescription: function(){
            var d = '';
            d += this.laserBN.hojas + ' copias blanco y negro';
            d += this.laserBN.papel != 'select' ? (' '+this.laserBN.papel) : '';
            d+= ', ' + this.laserBN.lados;
            d += this.laserBN.dispos != 0 ? ' (se agregan $'+this.laserBN.dispos+' de diseño/pose)' : '';
            d += '.'

            this.laserBN.resultados.description = d;
            return d;
        },
        plotPapel_calcularPrecioPlano: function(){
            var r = parseInt(this.precios.plotPapel[this.plotPapel.rollo][this.plotPapel.tipo] * (this.plotPapel.largo / 100));
            this.plotPapel.resultados.precioPlano = r;
            return r;
        },
        plotPapel_calcularPrecioDoblado: function(){
            var r = parseFloat(this.plotPapel.doblado * this.precios.plotPapel.doblado);
            this.plotPapel.resultados.precioDoblado = r;
            return r;
        },
        plotPapel_calcularTotal: function(){
            var a = parseFloat(this.plotPapel.resultados.precioPlano * this.plotPapel.cantidad);
            var b = parseFloat(this.plotPapel.resultados.precioDoblado);
            var c = parseFloat(this.plotPapel.dispos);
            var r = a + b + c;
            this.plotPapel.resultados.total = r;
            return r;
        },
        plotPapel_calcularDescription: function(){
            var d = '';
            d += this.plotPapel.cantidad != 1 ? this.plotPapel.cantidad + ' ploteos' : this.plotPapel.cantidad + ' ploteo';
            if(this.plotPapel.tipo == "lineasBN"){
                d += ', lineas en negro';
            }else if(this.plotPapel.tipo == "lineasColor"){
                d += ', lineas a color';
            }else{
                d += ', con plenos de tinta'
            }
            d += ', en rollo de ' + this.plotPapel.rollo;
            d += this.plotPapel.doblado == 0 ? '' : ' (' + this.plotPapel.doblado + ' con corte y doblado)';
            d += this.plotPapel.dispos != 0 ? ' (se agregan $'+this.plotPapel.dispos+' de diseño/pose)' : '';
            d += '.'

            this.plotPapel.resultados.description = d;
            return d;
        }
    }
});



var budgetApp = new Vue({
    el: '#budget-app',
    data: {
        discount:{
            'show': false,
            'type': '$',
            'amount': 0
        },
        budgets: []
    },
    methods:{
        removeBudget: function(index){
            this.budgets.splice(index, 1);
        },
        removeAllBudgets : function (){
            this.budgets = [];
        },
        printPage: function(){
            window.print();
        },
        toggleDiscount: function(){
            if(this.discount.show){
                this.discount.show = false;
                this.discount.amount = 0;
            }else{
                this.discount.show = true;
            }
        }
    },
    computed:{
        calcTotal: function(){
            var t = 0;
            this.budgets.forEach(b => {
                if(b.active){
                    t += b.cost;
                }
            });

            if(this.discount.type == '$'){
                t -= this.discount.amount;
            }else{
                t *= Math.abs((this.discount.amount / 100) -1);
            }

            return t.toFixed(2);
        },
        calcTotalNoDisc: function(){
            var t = 0;
            this.budgets.forEach(b => {
                t += b.cost;
            });

            return t.toFixed(2);
        }
    }
});