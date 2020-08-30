/**
 * Valida o cpf passado retornando se for valido e uma mensagem
 * @param {string} cpf cpf a ser validado
 * @returns {[boolean, string]} return [true/false, mensagem]
 */
function validaCPF(cpf) {
    var valorOriginal = cpf.toString().replace(/[^0-9]/g, "");
    var valor = valorOriginal;

    if (valorOriginal.length !== 11) return [false, "O formato do CPF passado está invalido, por favor passar no formato Ex.: 000.000.000-00"];

    if (checarCPFComDigitosTodosIguais(valorOriginal)) return [false, "Não é possivel existir um cpf com esses padrões(todos os digitos repetidos) Ex.: 111.111.111-11"];

    // Pega somente os 9 primeiros digitos para calcular se o cpf é valido
    valor = valor.substr(0, 9);

    // Concatena o penultimo digito após o calculo
    valor += calculaDigitosCPF(valor);

    // Concatena o ultimo digito após o calculo
    valor += calculaDigitosCPF(valor);

    // Caso o cpf orginal passado seja difirente do cpf calculado ele é um cpf invalido.
    if (valorOriginal !== valor) {
        return [false, "O CPF passado não é valido, por favor revisar."];
    }
    else {
        return [true, "O CPf é valido para utilização"];
    }
}

/**
 * Calcula o penultimo ou ultimo digito do cpf
 * @param {string} cpfDigitos cpf a ser validado
 * @returns {boolean} return true/false
 */
function calculaDigitosCPF(cpfDigitos) {
    var digito = 0;
    var posicoes = 0;


    /*
     * Checa o tamanho do cpf passado para checar se o digito a ser válidado é o primerio ou o segundo digito
     * Caso o tamanho seja igual a 9 é o penultimo digito do cpf a ser validado
     * Caso não é o ultimo digito.
     */
    if (cpfDigitos.length === 9) {
        posicoes = 10;
    }
    else {
        posicoes = 11;
    }


    /*
     * Loop para realizar a soma de cada digito pela posição
     *    
     * EX: 4    2    3    2    2    9    4    1    8   ... -> Digitos do cpf
     *     x    x    x    x    x    x    x    x    x
     *   [10]  [9]  [8]  [7]  [6]  [5]  [4]  [3]  [2]  ... -> Posições
     */
    for (var i = 0; i < cpfDigitos.length; i++) {

        digito += (parseInt(cpfDigitos[i]) * posicoes);

        posicoes--;
    }

    /*
     * Tira o resto da divisão por 11
     */
    digito %= 11;


    /*
     * Subtrai o valor do resto por 11
     */
    digito = 11 - digito;


    /*
     * Caso o valor da subtração seja maior ou igual a 10 o penultimo/ultimo digito é 0.
     * Caso não, o valor do digito é o resto da divisão.
     */
    if (digito >= 10) {
        digito = 0;
    }

    return digito;
}


/**
 * Checa se o cpf passado não segue um padrão de todos os digitos serem iguais Ex: 111.111.111-11
 * Por mais que o seja valido pelo calculo, é um tipo de cpf que não é cadastrado pelo governo.
 * @param {string} cpfDigitos cpf a ser validado
 * @returns {boolean} return true/false
 */
function checarCPFComDigitosTodosIguais(cpfDigitos) {
    cpfDigitos = cpfDigitos.toString();

    return cpfDigitos.split('').every(char => char === cpfDigitos[0]);
}