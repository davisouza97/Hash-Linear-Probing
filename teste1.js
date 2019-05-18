class Hash {
    constructor(numero) {
        this.lista = new Array(numero); //this == publico/ var == private
        this.size = this.lista.length;

        this.add = function (indice, valor) {
            if (indice < 0 || indice >= this.size) {
                return;
            }
            if (this.lista[indice] === undefined) //se vazio
            {
                this.lista[indice] = valor;
            } else {
                this.colisao(indice, valor);
            }
        };
        this.colisao = function (indice, valor) {  //adicionar um controle para evitar loop infinito se a lista estiver cheia 
            for (let i = indice; i < this.size;) {
                if (this.lista[i] === undefined) {
                    this.lista[i] = valor;
                    break;
                }
                if (i === this.size-1) {
                    i = -1;
                }
                i++;
            }
        };
    };
}

var hash = new Hash(10);

hash.add(9, 40);
hash.add(9, 50);
hash.add(9, 100);

console.log("############################");

for (let index = 0; index < hash.lista.length; index++) {
    console.log(hash.lista[index]);
}