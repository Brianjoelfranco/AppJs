class Totalcarrito{
    constructor(factorPrecio,factorHora,factorEnvio,iva){
        this.factorPr = parseInt(factorPrecio) || 1
        this.factorHora = parseInt(factorHora) || 1
        this.fartorEn = parseFloat(factorEnvio) || 0
        this.iva = parseFloat(iva) 
    }
    preciofinal() {
        return Math.floor((this.factorPr * this.factorHora * this.iva + this.fartorEn).toFixed(2))
    }
};