function kroknext(next)
{
	loadnext(next);                                         //load krok1 html
}

function drawImage(imageObj){                            //wyswietla obrazki na siatce
	var canvas = document.getElementById(canvasid); 		//, zapisuje dane na siatce
	var context = canvas.getContext("2d");
	var imageWidth = imageObj.width;
	szerokoscsiatki = imageObj.width;
	var imageHeight = imageObj.height;
	wysotasiatki =imageObj.height;
	context.drawImage(imageObj,0,0,  imageWidth, imageHeight);
	var imageData = context.getImageData(0, 0, imageWidth, imageHeight);	
	if (canvasid=="canvaslewe")
	{
		obrazeknasiatcelew =imageData.data;
		//console.log(imageData);
		//console.log(imageWidth);
		//console.log(imageHeight);
	}
	else 
	{
		obrazeknasiatcepraw =imageData.data;
		//console.log(obrazeknasiatcepraw);
	}
}

function loadnext(next)                                  //strona krok1
{
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// код для IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// код для IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			document.getElementById("midcont").innerHTML=xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET","krok"+next+".html",true);
	xmlhttp.send();
}


