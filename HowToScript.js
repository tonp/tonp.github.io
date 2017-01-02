$('form').on('submit', function(event){
	
	var from = document.getElementById("inputFrom").value; 
	var to = document.getElementById("inputTo").value; 
	var country = document.getElementById("inputCountry").value; 
	
	var path = 'http://api.worldbank.org/countries/'
	var indicator = '/indicators/NY.GDP.MKTP.CD'
	var url = path + country+ indicator;

  
  $.ajax({
		type: 'GET', 
		url: url, 
		data: { 'date': from + ':' + to, 'format':'jsonP'},
		jsonp: 'prefix',
		dataType: 'jsonp', 
		success: function getResults(data){
			tableResults(data); 
}
  });
  
  event.preventDefault();

});



function tableResults(data){
	
	var table = document.createElement('table');
	table.id = "myTable";
	table.border = 1;
	
	var from = document.getElementById("inputFrom").value; 
	var to = document.getElementById("inputTo").value; 
	
	var totalYrs = to-from;
	
	
	// Create Header
	var trName =  document.createElement('tr'); 
	var th0 = document.createElement('th');
	th0.colSpan = 2;
	th0.textContent = "Country: " + data[1][0].country.value;
	trName.append(th0); 
	table.appendChild(trName); 
	
	
	var tr = document.createElement('tr'); 
	var th1 = document.createElement('th');
	var th2 = document.createElement('th');
	th1.textContent = "Year"; 
	th2.textContent = "GDP (Current US$)"; 
	tr.appendChild(th1); 
	tr.appendChild(th2);
	table.appendChild(tr); 
	
	for (var i = 0; i <= totalYrs; i++){
		var TR = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		td1.textContent = data[1][i].date;
		td2.textContent = data[1][i].value;
		TR.appendChild(td1); 
		TR.appendChild(td2); 
		table.appendChild(TR);
	}
	
	document.getElementById("output").appendChild(table);
}



