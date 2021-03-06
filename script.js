const input1_field = document.getElementById("firstinput");
const input2_field = document.getElementById("secondinput");
const out_field = document.getElementById("output");
const sum_button = document.getElementById("sum");
const mult_button = document.getElementById("mult");
const div_button = document.getElementById("div");
const mod_button = document.getElementById("mod");
const swap_button = document.getElementById("swap");
const poly1_field = document.getElementById("firstPolynom");
const poly2_field = document.getElementById("secondPolynom");
const outPoly_field = document.getElementById("outputPolynom");
const clear_button = document.getElementById("clear");
const sign_div = document.getElementById("sign");
const history_div = document.getElementById("history");

let iter = 0;

function calc(choice){
	first = getArray(input1_field);
	second = getArray(input2_field);

	sign_div.innerHTML = "";

	showPolynom(first, poly1_field);
	showPolynom(second, poly2_field);

	result = [];

	switch (choice){
		case 1:
			result = binArraySum(first, second); 
			sign_div.innerHTML = "+";
			break;
		case 2:
			result = binArrayMult(first, second); 
			sign_div.innerHTML = "*";
			break;
		case 3:
			result = binArrayDiv(first, second,1);
			sign_div.innerHTML = "/";
			break;
		case 4:
			result = binArrayDiv(first, second,2);
			sign_div.innerHTML = "%";
			break;
	}

	showPolynom(result, outPoly_field);
	out_field.value = result.join("");
	
	iter = makeHistory (first, second, result, sign_div.innerHTML, iter);
}

function getArray(field){
	string = field.value;

	array = JSON.parse("[" + string.split("") + "]");
	array = cutArray(array);
	return array;
}

function binArrayMult(arr1, arr2){
	(mult = []).length = arr1.length + arr2.length - 1;
	mult.fill(0);
	
	for (var i = 0; i < arr1.length; i++){
		for (var j = 0; j < arr2.length; j++){
			if (arr1[i] == 1 && arr2[j]== 1){
				mult[i+j] = (mult[i+j] + 1) % 2;
				
			}
		}
	}

	return mult;
}

function showPolynom(array, field){
	field.innerHTML = "";
	array = cutArray(array);
	if ((array.length == 1) && (array[0] == 0)){
		field.innerHTML += "0";
	}
	for (var i = array.length-1; i > 1; i--){
		if (array[i] == 1){
			if (i != array.length-1)
				field.innerHTML += " + ";
			field.innerHTML += "x^" + i;
		}
	}
	if (array[1] == 1){
		if (array.length > 2){
			field.innerHTML += " + ";
		}
		field.innerHTML += "x";
	}
	if (array[0] == 1){
		if (array.length > 1){
			field.innerHTML += " + ";
		}
		field.innerHTML += "1";
	}
	
}

function binArraySum(arr1, arr2){
	sum = [];
	while (arr1.length < arr2.length){
		arr1.push(0);
	}
	while (arr2.length < arr1.length){
		arr2.push(0);
	}
	for (let i = 0; i < arr1.length; i++){
		sum[i] = (arr1[i] + arr2[i]) % 2;
	}
	sum = cutArray(sum);

	return sum;
}

function binArrayDiv(arr1, arr2, param){
	result = [0];

	curPoly = [];
	curRem = [];
	curRem = arr1;

	var i = 0;
	if (arr2.length == 1){
		return arr1;
	}
	while (curRem.length >= arr2.length){
		curMult = createSinglePolynom((curRem.length - 1) - (arr2.length - 1));
		result = binArraySum(result, curMult);
		curPoly = binArrayMult(curMult, arr2);
		curRem = binArraySum(curRem, curPoly);
	}
	if (param == 1){
		return result;
	}
	else{
		return curRem;
	}
}


function createSinglePolynom(degree){
	(newPolynom = []).length = degree + 1;
	newPolynom.fill(0);
	newPolynom[degree] = 1;
	return newPolynom; 
}

function cutArray(arr){
	while (arr[arr.length-1] == 0 && (arr.length > 1)){
		arr.pop();
	}
		
	return arr;
}

function clear(){
	poly1_field.innerHTML = " ";
	poly2_field.innerHTML = " ";
	outPoly_field.innerHTML = " ";
	input1_field.value = "";
	input2_field.value = "";
	out_field.value = "";
}

function swapInputs(){
	var temp = input1_field.value;
	input1_field.value = input2_field.value;
	input2_field.value = temp;
}

function makeHistory(arr1, arr2, arrResult, sign, iter){
	var div;

	div = document.createElement("div");
	div.id = "history" + iter;
	history_div.appendChild(div);
	showPolynom(arr1, div);
	iter++;

	div = document.createElement("div");
	div.id = "history" + iter;
	history_div.appendChild(div);
	div.innerHTML = sign;
	iter++;

	div = document.createElement("div");
	div.id = "history" + iter;
	history_div.appendChild(div);
	showPolynom(arr2, div);
	iter++;

	div = document.createElement("div");
	div.id = "history" + iter;
	history_div.appendChild(div);
	div.innerHTML = "=";
	iter++;

	div = document.createElement("div");
	div.id = "history" + iter;
	history_div.appendChild(div);
	showPolynom(arrResult, div);
	iter++;

	div = document.createElement("div");
	div.id = "history" + iter;
	history_div.appendChild(div);
	div.innerHTML = "###########################" ;
	iter++;

	return iter;
}

sum_button.addEventListener('click', function(){calc(1);});
mult_button.addEventListener('click', function(){calc(2);});
div_button.addEventListener('click', function(){calc(3);});
mod_button.addEventListener('click', function(){calc(4);});
swap_button.addEventListener('click', swapInputs);
clear_button.addEventListener('click', clear);