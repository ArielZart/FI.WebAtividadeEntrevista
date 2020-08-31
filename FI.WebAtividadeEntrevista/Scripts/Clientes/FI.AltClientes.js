
$(document).ready(function () {

    $("#CPF").mask('000.000.000-00', { reverse: true });
    $("#CEP").mask('00000-000');
    $("#Telefone").mask('(00) 0000-0000');

    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
        $('#formCadastro #CPF').val(obj.CPF);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        var cpf = $("#CPF").val();

        // Retorno [bool, string] => [validado, mensagem]
        var valido = validaCPF(cpf.toString());
        console.log(valido);
        if (valido[0]) {
            $.ajax({
                url: urlPost,
                method: "POST",
                data: {
                    "NOME": $(this).find("#Nome").val(),
                    "CEP": $(this).find("#CEP").val(),
                    "Email": $(this).find("#Email").val(),
                    "Sobrenome": $(this).find("#Sobrenome").val(),
                    "Nacionalidade": $(this).find("#Nacionalidade").val(),
                    "Estado": $(this).find("#Estado").val(),
                    "Cidade": $(this).find("#Cidade").val(),
                    "Logradouro": $(this).find("#Logradouro").val(),
                    "Telefone": $(this).find("#Telefone").val(),
                    "CPF": $(this).find("#CPF").val()
                },
                error:
                    function (r) {
                        if (r.status === 400)
                            ModalDialog("Ocorreu um erro", r.responseJSON);
                        else if (r.status === 500)
                            ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                    },
                success:
                    function (r) {
                        $("#formCadastro")[0].reset();

                        salvarBeneficiarios(r);                        
                    }
            });
        }
        else {
            ModalDialog("Ocorreu um erro", valido[1]);
        }


    });

    $("#btn_beneficiario").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
        var listaDeletados = getListaDeletados();

        var listaRegistros = getAllRegistrosExistentes();

        // Caso a quantidade de beneficiarios ou os deletados sejam maior que 0, realiza a chamada do post para o servidor para realizar a abertura do modal persistindo as alterações realizadas.
        // Caso não realiza uma chamada get normal para listar os beneficiarios a partir do cliente que está selecionado
        if (listaRegistros.length > 0 || listaDeletados.length > 0) {
            $.ajax(urlBeneficiarios, {
                method: "POST",
                data: { "beneficiarioViewModel": { "listaBeneficiarios": listaRegistros } },
                success: (data) => {
                    $("#modal").modal({ show: true, backdrop: "static" });
                    $("#CPFBeneficiario").mask('000.000.000-00', { reverse: true });
                    $("#IdBeneficiario").val("");
                    $("#CPFBeneficiario").val("");
                    $("#NomeBeneficiario").val("");
                }
            });
        }
        else {
            $.ajax(urlListarBeneficiarios, {
                method: "GET",
                data: { "id": parseInt(obj.Id) },
                success: (data) => {
                    $("#modal").modal({ show: true, backdrop: "static" }).html(data);
                    $("#CPFBeneficiario").mask('000.000.000-00', { reverse: true });
                    $("#IdBeneficiario").val("");
                    $("#CPFBeneficiario").val("");
                    $("#NomeBeneficiario").val("");
                }
            });
        }


    });

});

/**
 * Function para realizar a atualização dos beneficiarios do cliente sendo alterado.
 * Começa excluindo os registros que foram deletados da tabela.
 * Depois faz a atualização dos registros no Banco
 * @param {string} msg Mensagem do resultado da alteração do cliente.
 */
function salvarBeneficiarios(msg) {
    var listaDeletados = getListaDeletados();
    console.log(listaDeletados);
    $.ajax(urlExcluirBeneficiarios, {
        method: "POST",
        data: { "lista": listaDeletados },
        success: (d) => {
            console.log(d);
            $("#ListaDeletados").val("");
            var listaRegistros = getAllRegistrosExistentes(obj.Id);
            $.ajax(urlAlterarBeneficiarios, {
                method: "POST",
                data: { "lista": listaRegistros },
                success: (data) => {
                    console.log(data);
                    ModalDialog("Sucesso!", msg);
                    window.location.href = urlRetorno;
                }
            });
        }
    });
}



