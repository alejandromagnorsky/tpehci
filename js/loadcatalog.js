window.onload = getXMLHttpRequest();

function getXMLHttpRequest(){
	var request = new XMLHttpRequest();
	if(request) {
		request.open('GET', 'http://eiffel.itba.edu.ar/hci/service/Catalog.groovy?method=GetCategoryList&language_id=1', true);
		request.onreadystatechange = function(){
			if (request.readyState == 4) {
				if (request.status == 200) {
					alert("1");
					var response = request.responseText/*XML*/; alert("2");
					/*var paramList= response.getElementsByTagName('response');  alert("3");
					var out = '<ul>';		
					for(var i=0, il=paramList.length; i < il;)
						out+= '<li>' + paramList[i++].firstChild.nodeValue+'</li>';
						out+= '</ul>';*/
					document.getElementById('catalog').innerHTML = response;
				}
				else {
					alert('Error:\n');
					//alert(request.statusText);
				}
				request = null;
			}
		};
		request.send();
	}
}