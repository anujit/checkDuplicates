var dataArr = [1,7,8,11,46,0];	// The original data

console.log('The numbers array : ',dataArr);

var duplicates = '';
var newlyAdded = '';

var dataObj = {};

modifyDataArr();	// to make an object of existing num array

var inputTimeout;
var inputArr = [];
var num = document.getElementById('numInput');

num.onkeyup = function(e){
	if(e.keyCode < 48 || (e.keyCode > 57 && e.keyCode != 188 && e.keyCode != 219 && e.keyCode != 221)) return;
	
	if(inputTimeout) clearTimeout(inputTimeout);
	
	console.log('Waiting for input..');
	
	inputTimeout = setTimeout(function(){
		console.log('Calculating..');
		var inputString = parseInput(num.value);
		console.log('Input -- ' + inputString);
		convertInput(inputString);
	},1000);
	
};

function convertInput(str){
	inputArr = str.split(',');
	
	checkInput();
};

function checkInput(){

	for(var i=0;i<inputArr.length;i++){
		if(dataObj[inputArr[i]]){		//Number already present
			console.log('Duplicate -- '+inputArr[i]);
			duplicates += duplicates ? ',' + inputArr[i] : inputArr[i];
		} else {
			if(!isNaN(parseInt(inputArr[i],10)) && inputArr[i].length > 0){
				dataArr.push(parseInt(inputArr[i],10));
				console.log('Adding new -- ',inputArr[i]);
				newlyAdded += newlyAdded ? ',' + inputArr[i] : inputArr[i];
			}
		}
	}
	
	newlyAdded && showMessage(true);
	duplicates && showMessage();
	
	duplicates = '';
	newlyAdded = '';
	
	console.log('New numbers array : ',dataArr);
	
	modifyDataArr();
	
	//setTimeout(function(){$('.alert').fadeOut(2000)},5000);
};

function showMessage(isSuccess){
	var alertBox = $('<div class="alert alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong></strong></div>');	
	var alert = alertBox.clone();
	var str = '';
	var aClass = '';
	var rClass = '';
	if(isSuccess){
		str = newlyAddedMessage();
		aClass = 'alert-success';
		rClass = 'alert-danger';
	} else {
		str = duplicatesMessage();
		aClass = 'alert-danger';
		rClass = 'alert-success';
	}
	alert.addClass(aClass).removeClass(rClass).find('strong').html(str);	
	alert.appendTo('#mainWrapper');
};

function duplicatesMessage(){
	return 'These numbers are already present: ' + duplicates;
};

function newlyAddedMessage(){
	return 'Added these numbers: ' + newlyAdded;
};

function modifyDataArr(){
	for(var i=0;i<dataArr.length;i++){
		dataObj[dataArr[i]] = 1;
	}
};

function parseInput(valueList){
	var re = /(\[)([0-9]+)(\-)([0-9]+)(\])/g;
	while ((match = re.exec(valueList)) != null) {
		var rangeStrLength = match[0].length;
		var index = match.index;
		var startInt = parseInt(match[2]);
		var endInt = parseInt(match[4]);
		var prefxStr = valueList.substring(0,index-1);
		var postfxStr = valueList.substring(index+rangeStrLength);
		var rangeStr = '';
		
		for(var i=startInt;i<=endInt;i++){	
			if(rangeStr.length>0) rangeStr += ',';
			rangeStr += i;
		}
		valueList = prefxStr +',' +rangeStr + postfxStr;
		
	}
	return valueList;
};
