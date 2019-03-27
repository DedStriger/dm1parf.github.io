const input1_field = document.getElementById("firstinput");
const input2_field = document.getElementById("secondinput");
const out_field = document.getElementById("output");
const sum_button = document.getElementById("sum");
const mult_button = document.getElementById("mult");
const div_button = document.getElementById("div");
const mod_button = document.getElementById("mod");
const cycl_button = document.getElementById("cycl");
const poly1_field = document.getElementById("firstPolynom");
const poly2_field = document.getElementById("secondPolynom");
const outPoly_field = document.getElementById("outputPolynom");
const clear_button = document.getElementById("clear");

let iteration = 1;

function calc(choice){
	first = getArray(input1_field);
	second = getArray(input2_field);

	showPolynom(first, poly1_field);
	showPolynom(second, poly2_field);

	result = [];

	switch (choice){
		case 1:
			result = binArraySum(first, second); 
			/*
			console.log('calculation: ' + iteration);
			console.log(first);
			console.log('+');
			console.log(second);
			console.log(result);
			*/
			break;
		case 2:
			result = binArrayMult(first, second); 
			break;
		case 3:
			result = binArrayDiv(first, second,1);
			break;
		case 4:
			result = binArrayDiv(first, second,2);
			break;
	}

	showPolynom(result, outPoly_field);
	out_field.value = result.join("");
	iteration++;
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
	for (var i = array.length-1; i > 0; i--){
		
		if (array[i] == 1){
			if (i != array.length-1)
				field.innerHTML += " + ";
			field.innerHTML += "x^" + i;
		}
	}
	if (array[0] == 1){
		if (array.length > 1){
			field.innerHTML += " + ";
		}
		field.innerHTML += "1";
	}
	if (array.length == 0)
		field.innerHTML = "0";
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
	while (arr[arr.length-1] == 0)
		arr.pop();
	if (arr.length == 0){
		arr.length = 1;
		arr[0] = 0;
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

function cycl(){
	degree = input1_field.value;
	poly1_field.innerHTML = "Cyclonomical polynoms of x^" + degree;
	(result = []).length = degree - 1; //[1][2][...][degree-1] cuz [0]=[degree]
	result.fill(0);
	var j;
	temp = [1];
	var current = 1;
	while (current % degree != 1){
		console.log(current);
		current *= 2;
	}
	
	return result;
}

sum_button.addEventListener('click', function(){calc(1);});
mult_button.addEventListener('click', function(){calc(2);});
div_button.addEventListener('click', function(){calc(3);});
mod_button.addEventListener('click', function(){calc(4);});
cycl_button.addEventListener('click', cycl);
clear_button.addEventListener('click', clear);