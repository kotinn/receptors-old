	var krok=0,docready=0;
	var obrazek;      //default img
	var obrazeknasiatcelew, obrazeknasiatcepraw, siatkowkalew, siatkowkapraw;
	var wysotasiatki=670, szerokoscsiatki=670, srodekodstep=170;                              //rozmiary sitkowki	
	var canvasid, test, data, color;	
	var xz=0,yz=0; //x,y for zoom need to be 0 0 ;
	var srodek1krest =[255,0,255,0,255,255,0,255,0,255];
	var srodek1data, srodek2data;
    var srodek2krest =[255,0,255,0,255,255,0,255,0,255];
	var can1data, imagecan1data, can2data, imagecan2data, imagedata1, imagedata2;
	
//************************************************************************wybor obrazka new
	function okokrok(imag,idcan,idcan2){     
		obrazek=imag;
	var example = document.getElementById(idcan),
        ctx       = example.getContext('2d'), 						// Контекст
        pic       = new Image();            						 // "Создаём" изображение
        pic.src    = imag;  										// Источник изображения, позаимствовано на хабре
        pic.onload = function() {   								 // Событие onLoad, ждём момента пока загрузится изображение
        ctx.drawImage(pic, 0, 0); 									 // Рисуем изображение от точки с координатами 0, 0
	  }
		//test=imag;
		
		
	var example2 = document.getElementById(idcan2),
        ctx2       = example2.getContext('2d'), 						// Контекст
        pic2       = new Image();            						 // "Создаём" изображение
        pic2.src    = imag;  										// Источник изображения, позаимствовано на хабре
        pic2.onload = function() {   								 // Событие onLoad, ждём момента пока загрузится изображение
        ctx2.drawImage(pic2, -170, 0); 									 // Рисуем изображение от точки с координатами 0, 0
		
      }
	}	

	//************************************************************************sprawdzanie wyboru obrazka + renderowanie na canvasy robocze !
	function krokproverka(){     
	if(obrazek){
		document.getElementById("krok0-tab").className = "tab";
		document.getElementById("krok1-tab").className = "tab tab-active";
		document.getElementById("krok0-content").className = "infotab";
		document.getElementById("krok1-content").className = "infotab infotab clear-min active infotab-active";
		
		
		var canvasleft = document.getElementById("canvaslewy"),
        ctx       = canvasleft.getContext('2d'), 						// Контекст
        pic       = new Image();            						 // "Создаём" изображение
        pic.src    = obrazek;  										// Источник изображения, позаимствовано на хабре
        pic.onload = function() {   								 // Событие onLoad, ждём момента пока загрузится изображение
        ctx.drawImage(pic, 0, 0); 									 // Рисуем изображение от точки с координатами 0, 0
		imagedata1=ctx.getImageData(0,0,canvasleft.width,canvasleft.height);
      }
		//test=imag;
		
		
	var canvasright = document.getElementById("canvasprawy"),
        ctx2       = canvasright.getContext('2d'), 						// Контекст
        pic2       = new Image();            						 // "Создаём" изображение
        pic2.src    = obrazek;  										// Источник изображения, позаимствовано на хабре
        pic2.onload = function() {   								 // Событие onLoad, ждём момента пока загрузится изображение
        ctx2.drawImage(pic2, -170, 0); 									 // Рисуем изображение от точки с координатами 0, 0
		imagedata2=ctx2.getImageData(0,0,canvasright.width,canvasright.height);
      }
	  
		
		
	}else
	{alert("ahtung! wybierz obrazek Do badan");}
	
	
	}	
	
	//******************************************************************************************************************* distance update volume 
	function outputUpdate(vol) {
	  document.querySelector('#volume').value = vol;
	  srodekodstep=vol;
		var odstep = - srodekodstep;
		canvase();
	}
//****************************************************************** wypelni canvase  imagem prawy	
	function canvase (){  
		var odstep = - srodekodstep;
		var canvasright = document.getElementById("canvasprawy"),
        ctx2       = canvasright.getContext('2d'), 						// Контекст
        pic2       = new Image();            						 // "Создаём" изображение
        pic2.src    = obrazek;  										// Источник изображения, позаимствовано на хабре
        pic2.onload = function() {   								 // Событие onLoad, ждём момента пока загрузится изображение
        ctx2.drawImage(pic2, odstep, 0);											 // Рисуем изображение от точки с координатами 0, 0
		imagedata2=ctx2.getImageData(0,0,canvasright.width,canvasright.height);			//copy data image
      }
	  
	}
	//*********************************************************************   kolor tla siatkowki kazdej
	function kolortla (kolortl, idsiatka){  
		switch(kolortl){
		case "black":
			$("#"+idsiatka).css("background-color",kolortl);; 
		break
		case "white":
			$("#"+idsiatka).css("background-color",kolortl); 
		break		
		case "grey":
			$("#"+idsiatka).css("background-color",kolortl); 
		break
	}
	}
//*****************************************************************   srodek canvas by the id 1 or 2
	function drawsrodek(komand,idsiatka)
	{
		if(komand=="srodek2")
		{srodekodstep=-parseInt(srodekodstep);}
		else{srodekodstep=Math.abs(parseInt(srodekodstep));}
		var canvas = document.getElementById(idsiatka);
		var context = canvas.getContext("2d");                                                 // read the width and height of the canvas
		szerokoscsiatki= canvas.width; wysotasiatki = canvas.height;
		imageData = context.createImageData(szerokoscsiatki, wysotasiatki);
		if(idsiatka=="canvaslewy"){
		imageData=imagedata1;
		} 
		if(idsiatka=="canvasprawy"){
		imageData=imagedata2;
		} 
		context.putImageData(imageData, 0, 0);
		srodek1data=context.getImageData(0,0,szerokoscsiatki,wysotasiatki);
		//setPixel(imageData, 0, 0, 255, 255, 255, 255); 
		//setPixel(imageData, 0, 1, 255, 255, 255, 255);
		for(i=0;i<7;i++){																	
			for(ii=0;ii<7;ii++){
			setPixel(imageData, (szerokoscsiatki/2)-3+i, (wysotasiatki/2)-3+ii, 255, 255, 255, 255);				//srodek 1
			setPixel(imageData, (szerokoscsiatki/2)-3+i+parseInt(srodekodstep), (wysotasiatki/2)-3+ii, 255, 255, 255, 255);	//srodek 2
			}
		}
		for(i=0;i<5;i++){
			for(ii=0;ii<5;ii++){
			setPixel(imageData, (szerokoscsiatki/2)-2+i, (wysotasiatki/2)-2+ii, 0, 0, 0, 255);						//srodek 1
			setPixel(imageData, (szerokoscsiatki/2)-2+i+parseInt(srodekodstep), (wysotasiatki/2)-2+ii, 0, 0, 0, 255);			//srodek 2
			}
		}
		
		context.putImageData(imageData, 0, 0); 
		
		function setPixel(imageData, x, y, r, g, b, a) {        			   //********put 1 dot in imagedata
			index = (x + y * imageData.width) * 4;
			imageData.data[index+0] = r;
			imageData.data[index+1] = g;
			imageData.data[index+2] = b;
			imageData.data[index+3] = a;
		}
	}
	
	
	
	//*****************************************************************   random dots on canvas
	function drawsiat(idsiatki)                                        
	{
		var canvas = document.getElementById(idsiatki); 	
		//var canvas = canvas1;
		var context = canvas.getContext("2d");                                                 // read the width and height of the canvas
		szerokoscsiatki= canvas.width; wysotasiatki = canvas.height;
	if(idsiatki=="cansiatka1"){																															//lewa siatka
		var radiusred = parseInt(document.getElementById("radiusred").value),                    //radius red green blue
	    radiusgreen = parseInt(document.getElementById("radiusgreen").value), radiusblue = parseInt(document.getElementById("radiusblue").value);
		var procentred = parseInt(document.getElementById("procentred").value),                 //radius red green blue
	    procentgreen = parseInt(document.getElementById("procentgreen").value), procentblue = parseInt(document.getElementById("procentblue").value);
	    var szerokradred = parseInt(document.getElementById("szerokradiusred").value),szerokradgreen = parseInt(document.getElementById("szerokradiusgreen").value),
	    szerokradblue = parseInt(document.getElementById("szerokradiusblue").value);
	}
	else{																																				//prawa siatka
		var radiusred = parseInt(document.getElementById("radiusred2").value),                    //radius red green blue
	    radiusgreen = parseInt(document.getElementById("radiusgreen2").value), radiusblue = parseInt(document.getElementById("radiusblue2").value);
		var procentred = parseInt(document.getElementById("procentred2").value),                 //radius red green blue
	    procentgreen = parseInt(document.getElementById("procentgreen2").value), procentblue = parseInt(document.getElementById("procentblue2").value);
	    var szerokradred = parseInt(document.getElementById("szerokradiusred2").value),szerokradgreen = parseInt(document.getElementById("szerokradiusgreen2").value),
	    szerokradblue = parseInt(document.getElementById("szerokradiusblue2").value);
	}
		siatkowkalew = new Array ();                                                             // create a new pixel array
		imageData = context.createImageData(szerokoscsiatki, wysotasiatki);
	
		/*
	 if (Math.max(radiusred+szerokradred, radiusgreen+szerokradgreen,radiusblue+szerokradblue)<wysotasiatki/2 && Math.min(radiusred-szerokradred, radiusgreen-szerokradgreen,radiusblue-szerokradblue)>wysotasiatki*0.05 && szerokradgreen > 10 && szerokradred > 10 && szerokradblue >10 ){
		alldrawdots(255,0,0);  alldrawdots(0,255,0);  alldrawdots(0,0,255); 				 // draw random dots 
	    drawcyrcle(255,0,0,radiusred,szerokradred,((wysotasiatki*szerokoscsiatki)/100)*procentred*0.2);                  //cyrcle 1
		drawcyrcle(0,255,0,radiusgreen,szerokradgreen,((wysotasiatki*szerokoscsiatki)/100)*procentgreen*0.2); 
		drawcyrcle(0,0,255,radiusblue,szerokradblue,((wysotasiatki*szerokoscsiatki)/100)*procentblue*0.2);
	    drawcyrcle(255,0,0,radiusred,szerokradred/2,((wysotasiatki*szerokoscsiatki)/100)*procentred*0.2);                //cyrcle 2
		drawcyrcle(0,255,0,radiusgreen,szerokradgreen/2,((wysotasiatki*szerokoscsiatki)/100)*procentgreen*0.2); 
		drawcyrcle(0,0,255,radiusblue,szerokradblue/2,((wysotasiatki*szerokoscsiatki)/100)*procentblue*0.2);
		drawcyrcle(255,0,0,radiusred,szerokradred/4,((wysotasiatki*szerokoscsiatki)/100)*procentred*0.1);                //cyrcle 3 pik !
		drawcyrcle(0,255,0,radiusgreen,szerokradgreen/4,((wysotasiatki*szerokoscsiatki)/100)*procentgreen*0.1); 
		drawcyrcle(0,0,255,radiusblue,szerokradblue/4,((wysotasiatki*szerokoscsiatki)/100)*procentblue*0.1);		
		context.putImageData(imageData, 0, 0);                                 // at coords 0,0// copy the image data back onto the canvas
	 }
		else alert("Radius kola ma byc do 50% wysokosci siatkowki (do "+wysotasiatki/2+"px) oraz wiekszy od 10% siatkowki (od "+wysotasiatki*0.1+"px ) Szerokosc kola > 10px ");
		*/
		alldrawdots(255,0,0);  alldrawdots(0,255,0);  alldrawdots(0,0,255); 
		drawcyrcle(255,0,0,radiusred,szerokradred,((wysotasiatki*szerokoscsiatki)/100)*procentred*0.2);                  //cyrcle 1
		drawcyrcle(0,255,0,radiusgreen,szerokradgreen,((wysotasiatki*szerokoscsiatki)/100)*procentgreen*0.2); 
		drawcyrcle(0,0,255,radiusblue,szerokradblue,((wysotasiatki*szerokoscsiatki)/100)*procentblue*0.2);
	    drawcyrcle(255,0,0,radiusred,szerokradred/2,((wysotasiatki*szerokoscsiatki)/100)*procentred*0.2);                //cyrcle 2
		drawcyrcle(0,255,0,radiusgreen,szerokradgreen/2,((wysotasiatki*szerokoscsiatki)/100)*procentgreen*0.2); 
		drawcyrcle(0,0,255,radiusblue,szerokradblue/2,((wysotasiatki*szerokoscsiatki)/100)*procentblue*0.2);
		drawcyrcle(255,0,0,radiusred,szerokradred/4,((wysotasiatki*szerokoscsiatki)/100)*procentred*0.1);                //cyrcle 3 pik !
		drawcyrcle(0,255,0,radiusgreen,szerokradgreen/4,((wysotasiatki*szerokoscsiatki)/100)*procentgreen*0.1); 
		drawcyrcle(0,0,255,radiusblue,szerokradblue/4,((wysotasiatki*szerokoscsiatki)/100)*procentblue*0.1);	
		
		context.putImageData(imageData, 0, 0); 								//put data in context
		if(idsiatki=="cansiatka1"){
			can1data=imageData; 																							 //zapis siatkowke 1 do global 
			imagecan1data = new Image();														//convert data to Image for esey zoom metod
			imagecan1data.src = canvas.toDataURL("image/png");
		}
		else{   //(idsiatki=="cansiatka2"){
			can2data=imageData; 																							 //zapis siatkowke 2 do global 
			imagecan2data = new Image();														//convert data to Image
			imagecan2data.src = canvas.toDataURL("image/png");
			
		}
		//***********************************************************************************************************************************dodaj warunek IF przed rysowaniem !!!!!!!
	
		function alldrawdots(r,g,b){                   												 //func red blue green
		if(r==255){var iloscrecept=((wysotasiatki*szerokoscsiatki)/100)*procentred/2; };
		if(g==255){var iloscrecept=((wysotasiatki*szerokoscsiatki)/100)*procentgreen/2;};
		if(b==255){var iloscrecept=((wysotasiatki*szerokoscsiatki)/100)*procentblue/2;};
			for (i = 0; i < iloscrecept; i++) {
				x = Math.floor((Math.random() * szerokoscsiatki) + 0);           // |0 to truncate to Int32
				y = Math.floor((Math.random() * wysotasiatki) + 0); 
				setPixel(imageData, x, y, r, g, b, 255);                     	// 255 opaque set pixel on canvas
			}
		}
		
		function drawcyrcle(r,g,b,radiuskola,szerokrad,iloscrecept){              //********************************radius dla green!  +- szerokosc obodka
		var centrx=szerokoscsiatki/2, centry=wysotasiatki/2;

		    var minwartoscx = (szerokoscsiatki/2)-radiuskola-szerokrad;
			var maxwartoscx = (szerokoscsiatki/2)+radiuskola+szerokrad;
			var minwartoscy = (wysotasiatki/2)-radiuskola-szerokrad;
			var maxwartoscy = (wysotasiatki/2)+radiuskola+szerokrad;
		    i=0;
			while ( i < iloscrecept) {
				x=Math.floor((Math.random() * (maxwartoscx-minwartoscx+1))+minwartoscx);
				y=Math.floor((Math.random() * (maxwartoscy-minwartoscy+1))+minwartoscy);
				odlegloscxy=Math.sqrt((x-centrx)*(x-centrx)+(y-centry)*(y-centry));
			   if(odlegloscxy<(radiuskola+szerokrad) && odlegloscxy>(radiuskola-szerokrad)){
			    setPixel(imageData, x, y, r, g, b, 255); 
				i++;
			   }
			}
		}
		function setPixel(imageData, x, y, r, g, b, a) {        			   //********put 1 dot in imagedata
			index = (x + y * imageData.width) * 4;
			imageData.data[index+0] = r;
			imageData.data[index+1] = g;
			imageData.data[index+2] = b;
			imageData.data[index+3] = a;
		}
	}
	
//*****************************************************************zmiana typu oka radiobox
	function zmienvalue(nazwazestawu,oko){
	if(oko=="leweoko"){
	switch(nazwazestawu){
		case "czlowiek":
			zmienvalue('radiusgreen',70); zmienvalue('procentgreen',15); zmienvalue('szerokradiusgreen',40); 
			zmienvalue('radiusred',90);   zmienvalue('procentred',15);   zmienvalue('szerokradiusred',40); 
			zmienvalue('radiusblue',110); zmienvalue('procentblue',15);  zmienvalue('szerokradiusblue',40); 
		break
		case "kot":
			zmienvalue('radiusgreen',80); zmienvalue('procentgreen',15); zmienvalue('szerokradiusgreen',30); 
			zmienvalue('radiusred',90);   zmienvalue('procentred',15);   zmienvalue('szerokradiusred',30); 
			zmienvalue('radiusblue',100); zmienvalue('procentblue',15);  zmienvalue('szerokradiusblue',30); 
		break		
		case "ptak":
			zmienvalue('radiusgreen',75); zmienvalue('procentgreen',20); zmienvalue('szerokradiusgreen',35); 
			zmienvalue('radiusred',100);   zmienvalue('procentred',15);   zmienvalue('szerokradiusred',30); 
			zmienvalue('radiusblue',120); zmienvalue('procentblue',15);  zmienvalue('szerokradiusblue',35); 
		break
		case "test1":
			zmienvalue('radiusgreen',160); zmienvalue('procentgreen',15); zmienvalue('szerokradiusgreen',60); 
			zmienvalue('radiusred',140);   zmienvalue('procentred',20);   zmienvalue('szerokradiusred',60); 
			zmienvalue('radiusblue',120); zmienvalue('procentblue',15);  zmienvalue('szerokradiusblue',60); 
		break		
	}
	}
	else{
			switch(nazwazestawu){
		case "czlowiek":
			zmienvalue('radiusgreen2',70); zmienvalue('procentgreen2',15); zmienvalue('szerokradiusgreen2',40); 
			zmienvalue('radiusred2',90);   zmienvalue('procentred2',15);   zmienvalue('szerokradiusred2',40); 
			zmienvalue('radiusblue2',110); zmienvalue('procentblue2',15);  zmienvalue('szerokradiusblue2',40); 
		break
		case "kot":
			zmienvalue('radiusgreen2',80); zmienvalue('procentgreen2',15); zmienvalue('szerokradiusgreen2',30); 
			zmienvalue('radiusred2',90);   zmienvalue('procentred2',15);   zmienvalue('szerokradiusred2',30); 
			zmienvalue('radiusblue2',100); zmienvalue('procentblue2',15);  zmienvalue('szerokradiusblue2',30); 
		break		
		case "ptak":
			zmienvalue('radiusgreen2',75); zmienvalue('procentgreen2',20); zmienvalue('szerokradiusgreen2',35); 
			zmienvalue('radiusred2',100);   zmienvalue('procentred2',15);   zmienvalue('szerokradiusred2',30); 
			zmienvalue('radiusblue2',120); zmienvalue('procentblue2',15);  zmienvalue('szerokradiusblue2',35); 
		break
		case "test1":
			zmienvalue('radiusgreen2',160); zmienvalue('procentgreen2',15); zmienvalue('szerokradiusgreen2',60); 
			zmienvalue('radiusred2',140);   zmienvalue('procentred2',20);   zmienvalue('szerokradiusred2',60); 
			zmienvalue('radiusblue2',120); zmienvalue('procentblue2',15);  zmienvalue('szerokradiusblue2',60); 
		break		
	}
	}
	function zmienvalue(id, wartosc){document.getElementById(id).value=wartosc;}
	
	}
	
	