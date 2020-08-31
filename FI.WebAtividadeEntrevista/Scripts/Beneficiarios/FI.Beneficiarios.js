/**
 * Cria um beneficiario, mostrando-o na tabela.
 * @param {string} cpf CPF do novo registro
 * @param {string} nome Nome do novo registro
 */
var criarBeneficiario = (cpf, nome) => {
    var idGUID = gerarGUID();

    var tr = `<tr class="row rowBeneficiario" id="rowBeneficiario_${idGUID}">
                        <td class="hidden" id="id_beneficiario_list_${idGUID}">-1</td>
                        <td class="col-md-4 infos" id="cpf_beneficiario_list_${idGUID}">${cpf}</td>
                        <td class="col-md-4 infos" id="nome_beneficiario_list_${idGUID}">${nome}</td>
                        <td class="col-md-2"><button id="btn_beneficiario_editar_${idGUID}" class="btn btn-info btn-sm" onclick="editarBeneficiario(event)">Editar</button></td>
                        <td class="col-md-2"><button id="btn_beneficiario_excluir_${idGUID}" class="btn btn-info btn-sm" onclick="removerBeneficiario(event)">Excluir</button></td>
                    </tr>`;
    $("#tabela_beneficiarios tbody").append(tr);

    $("#CPFBeneficiario").val("");
    $("#NomeBeneficiario").val("");

};

/**
 * Faz a alteração dos campos do beneficiario
 * @param {string} id ID da linha a ser editada(Segue o padrao GUID)
 * @param {string} cpf CPF alterado
 * @param {string} nome Nome alterado
 */
var editarCamposBeneficiario = (id, cpf, nome) => {

    $("#rowBeneficiario_" + id).find("#cpf_beneficiario_list_" + id).text(cpf);
    $("#rowBeneficiario_" + id).find("#nome_beneficiario_list_" + id).text(nome);

    $("#IdBeneficiario").val("");
    $("#CPFBeneficiario").val("");
    $("#NomeBeneficiario").val("");
}

/**
 * Pega as informações do beneficiario e seta para edição.
 * @param {any} event Evento da function
 */
var editarBeneficiario = (event) => {
    var tr = $(event.target).parent().parent()[0];
    var idLinha = tr.id.split("_")[1];
    var cpf = $(tr).find("#cpf_beneficiario_list_" + idLinha).text();
    var nome = $(tr).find("#nome_beneficiario_list_" + idLinha).text();
    $("#IdBeneficiario").val(idLinha);
    $("#CPFBeneficiario").val(cpf);
    $("#NomeBeneficiario").val(nome);

};

/**
 * Faz a remoção do da linha do Beneficiario e mantem o controle das linhas deletadas
 * @param {any} event Evento da function
 */
var removerBeneficiario = (event) => {
    event.stopPropagation();
    var tr = $(event.target).parent().parent()[0];
    var idLinha = tr.id.split("_")[1];
    var id = $(tr).find("#id_beneficiario_list_" + idLinha).text();

    if (id !== "-1") {
        var listaDeletados = $("#ListaDeletados").val();
        if (listaDeletados === "") {
            $("#ListaDeletados").val(listaDeletados + id);
        }
        else {
            $("#ListaDeletados").val(listaDeletados + "," +id );
        }
        
    }
    $(event.target).parent().parent().remove();
};

/**
 * Function para checar se o cpf passado ja existe.
 * @param {string} cpf CPF a ser validado
 * @returns {bool} true/false
 */
var existeCPFCadastrado = (cpf) => {
    console.log("existecpf");
    console.log(cpf);
    var existe = [];   
    var registros = getAllRegistrosExistentes();
    existe = registros.filter((v, i) => {
        return v.CPF === cpf;
    });
    console.log(registros);
    console.log(existe);
    if (existe.length > 0) {
        return true;
    }
    else {
        return false;
    }
};

/*
 * Function para gerar um GUID para controle dos beneficiarios
 */
var gerarGUID = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};