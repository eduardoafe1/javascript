// Função para máscara de CNPJ
function maskCnpj(campo) {

	if (campo.value.length > 17) {

		$jB('.cnpj').mask('00.000.000/0000-00', {
			reverse : true

		});

	}
	if (campo.value.length > 8) {

		var _val = campo.value.substring(0, 8);
	} else {
		var _val = campo.value;
	}
	var _paddingLeft = paddingLeft(_val, 8);
	_paddingLeft = completaCnpj(_paddingLeft);
	campo.value = _paddingLeft.replace(
			/([0-9]{2})([0-9]{3})([0-9]{3})([0-9]{4})([0-9]{2})/g,
			"$1.$2.$3/$4-$5");
}

// Função para máscara de CPF
function maskCpf(campo) {
	if (campo.value.length >= 14) {

		$jB('.cpf').mask('000.000.000-00', {
			reverse : true
		});

	}

	if (campo.value.length > 9) {
		var _val = campo.value.substring(0, 9);
	} else {
		var _val = campo.value;
	}
	var _paddingLeft = paddingLeft(_val, 9);
	_paddingLeft = completaCpf(_paddingLeft);
	campo.value = _paddingLeft.replace(
			/([0-9]{3})([0-9]{3})([0-9]{3})([0-9]{2})/g, "$1.$2.$3-$4");
}

//Função para completar campos de CNPJ com replace
function completaCampo(campo) {
	var _val = campo.value;

	var testCnpj = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}-[0-9]{2}$/;

	if (testCnpj.test(_val)) {
		campo.value = _val.replace(/([0-9]{4}-[0-9]{2})/, "").replace(/[\.]+/g,
				"").replace("/", "").replace(/^[0]+/g, "");
	} else {
		campo.value = _val.replace(/-([0-9]{2})/, "").replace(/[\.]+/g, "")
				.replace(/^[0]+/g, "");
	}

	campo.setSelectionRange(_val.length, _val.length);
}

//Função para completar campo de CPF calculando digito
function completaCpf(campo) {
	var soma;
	var resto;
	var novo;
	soma = 0;

	for (i = 1; i <= 9; i++) {
		soma = soma + parseInt(campo.substring(i - 1, i)) * (11 - i);
	}

	resto = (soma % 11);
	if (resto >= 2) {
		resto = 11 - resto;
	} else {
		resto = 0;
	}

	novo = campo + resto;
	soma = 0;
	for (i = 1; i <= 10; i++) {
		soma = soma + parseInt(novo.substring(i - 1, i)) * (12 - i);
	}

	resto = (soma % 11);
	if (resto >= 2) {
		resto = 11 - resto;
	} else {
		resto = 0;
	}

	novo = novo + resto;

	return novo;

}

//Função para completar campos de CNPJ calculando digito
function completaCnpj(campo) {
	var soma;
	var resto;
	var novo;
	soma = 0;

	for (i = 1; i <= 4; i++) {
		soma = soma + parseInt(campo.substring(i - 1, i)) * (6 - i);
	}
	for (i = 5; i <= 8; i++) {
		soma = soma + parseInt(campo.substring(i - 1, i)) * (14 - i);
	}

	soma = soma + 2;

	resto = (soma % 11);

	if (resto >= 2) {
		resto = 11 - resto;
	} else {
		resto = 0;
	}

	novo = campo + '0001' + resto;
	soma = 0;

	for (i = 1; i <= 5; i++) {
		soma = soma + parseInt(novo.substring(i - 1, i)) * (7 - i);
	}
	for (i = 6; i <= 13; i++) {
		soma = soma + parseInt(novo.substring(i - 1, i)) * (15 - i);
	}

	resto = (soma % 11);
	if (resto >= 2) {
		resto = 11 - resto;
	} else {
		resto = 0;
	}

	novo = novo + resto;

	return novo;

}