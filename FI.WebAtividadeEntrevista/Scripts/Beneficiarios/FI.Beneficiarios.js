
var criarEditarBeneficiario = (id, cpf, nome) => {
    if (id === "" || id === null) {
        var idCont = $("#IdCont").val();

        var tr = `<tr class="row rowBeneficiario" id="rowBeneficiario_${idCont}">
                        <td class="col-md-4 infos" id="cpf_beneficiario_list_${idCont}">${cpf}</td>
                        <td class="col-md-4 infos" id="nome_beneficiario_list_${idCont}">${nome}</td>
                        <td class="col-md-2"><button id="btn_beneficiario_editar_${idCont}" class="btn btn-info btn-sm" onclick="editarBeneficiario(event)">Editar</button></td>
                        <td class="col-md-2"><button id="btn_beneficiario_excluir_${idCont}" class="btn btn-info btn-sm" onclick="removerBeneficiario(event)">Excluir</button></td>
                    </tr>`
        $("#tabela_beneficiarios tbody").append(tr);
        $("#IdCont").val(parseInt(idCont) + 1);

        $("#CPFBeneficiario").val("");
        $("#NomeBeneficiario").val("");

        //ModalDialog("Sucesso", "Beneficiario criado com sucesso");
    }
    else {
        $("#rowBeneficiario_" + id).find("#cpf_beneficiario_list_" + id).text(cpf);
        $("#rowBeneficiario_" + id).find("#nome_beneficiario_list_" + id).text(nome);

        $("#IdBeneficiario").val("");
        $("#CPFBeneficiario").val("");
        $("#NomeBeneficiario").val("");

        //ModalDialog("Sucesso", "Beneficiario editado com sucesso");
    }

};

var editarBeneficiario = (event) => {
    var tr = $(event.target).parent().parent()[0];
    var idLinha = tr.id.split("_")[1];
    var cpf = $(tr).find("#cpf_beneficiario_list_" + idLinha).text();
    var nome = $(tr).find("#nome_beneficiario_list_" + idLinha).text();
    $("#IdBeneficiario").val(idLinha);
    $("#CPFBeneficiario").val(cpf);
    $("#NomeBeneficiario").val(nome);
};

var removerBeneficiario = (event) => {
    event.stopPropagation();
    $(event.target).parent().parent().remove();
};

var existeCPFCadastrado = (cpf) => {
    var registros = getAllRegistrosExistentes();
    var existe = registros.filter((v, i) => {
        console.log(v)
        return v.cpf === cpf;
    });

    if (existe.length > 0) {
        return true;
    }
    else {
        return false;
    }
}