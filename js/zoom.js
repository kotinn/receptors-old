var canvas1 = document.getElementById('cansiatka2');
	canvas1.width = 670; canvas1.height = 670;
	var ctx;
	
var canvas2 = document.getElementById('cansiatka4');
	canvas2.width = 670; canvas2.height = 670;
	var ctx2;
	//var gkhead = new Image;
	//var ball   = new Image;
	window.onload = function(){		
		ctx = canvas1.getContext('2d');
		trackTransforms(ctx);
		function redraw(){
			// Clear the entire canvas
			var p1 = ctx.transformedPoint(0,0);
			var p2 = ctx.transformedPoint(canvas1.width,canvas1.height);
			ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
			//ctx.drawImage(gkhead,200,50);

		if(imagecan1data){
		ctx.drawImage(imagecan1data,0,0,670,670);
			}
			ctx.save();
		
		//ctx.drawImage(ball,4,9,640,640);
	
		}
		redraw();
		
		var lastX=canvas1.width/2, lastY=canvas1.height/2;
		var dragStart,dragged;
		canvas1.addEventListener('mousedown',function(evt){
			document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
			lastX = evt.offsetX || (evt.pageX - canvas1.offsetLeft);
			lastY = evt.offsetY || (evt.pageY - canvas1.offsetTop);
			dragStart = ctx.transformedPoint(lastX,lastY);
			dragged = false;
		},false);
		canvas1.addEventListener('mousemove',function(evt){
			lastX = evt.offsetX || (evt.pageX - canvas1.offsetLeft);
			lastY = evt.offsetY || (evt.pageY - canvas1.offsetTop);
			dragged = true;
			if (dragStart){
				var pt = ctx.transformedPoint(lastX,lastY);
				ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
				redraw();
			}
		},false);
		canvas1.addEventListener('mouseup',function(evt){
			dragStart = null;
			if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
		},false);

		var scaleFactor = 1.1;
		var zoom = function(clicks){
			var pt = ctx.transformedPoint(lastX,lastY);
			ctx.translate(pt.x,pt.y);
			var factor = Math.pow(scaleFactor,clicks);
			ctx.scale(factor,factor);
			ctx.translate(-pt.x,-pt.y);
			redraw();
		}

		var handleScroll = function(evt){
			var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
			if (delta) zoom(delta);
			return evt.preventDefault() && false;
		};
		canvas1.addEventListener('DOMMouseScroll',handleScroll,false);
		canvas1.addEventListener('mousewheel',handleScroll,false);
		
		// **************************************  zoom 2
		
		ctx2 = canvas2.getContext('2d');
		trackTransforms2(ctx2);
		function redraw2(){
			// Clear the entire canvas
			var p1 = ctx2.transformedPoint2(0,0);
			var p2 = ctx2.transformedPoint2(canvas2.width,canvas2.height);
			ctx2.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
			//ctx2.drawImage(gkhead,200,50);

		if(imagecan2data){
			ctx2.drawImage(imagecan2data,0,0,670,670);
			}
			ctx2.save();
		
		//ctx2.drawImage(ball,4,9,640,640);
	
		}
		redraw2();
		
		var lastX2=canvas2.width/2, lastY2=canvas2.height/2;
		var dragStart2,dragged2;
		canvas2.addEventListener('mousedown',function(evt){
			document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
			lastX2 = evt.offsetX || (evt.pageX - canvas2.offsetLeft);
			lastY2 = evt.offsetY || (evt.pageY - canvas2.offsetTop);
			dragStart2 = ctx2.transformedPoint2(lastX2,lastY2);
			dragged2 = false;
		},false);
		canvas2.addEventListener('mousemove',function(evt){
			lastX2 = evt.offsetX || (evt.pageX - canvas2.offsetLeft);
			lastY2 = evt.offsetY || (evt.pageY - canvas2.offsetTop);
			dragged2 = true;
			if (dragStart2){
				var pt = ctx2.transformedPoint2(lastX2,lastY2);
				ctx2.translate(pt.x-dragStart2.x,pt.y-dragStart2.y);
				redraw2();
			}
		},false);
		canvas2.addEventListener('mouseup',function(evt){
			dragStart2 = null;
			if (!dragged2) zoom2(evt.shiftKey ? -1 : 1 );
		},false);

		var scaleFactor2 = 1.1;
		var zoom2 = function(clicks){
			var pt = ctx2.transformedPoint2(lastX2,lastY2);
			ctx2.translate(pt.x,pt.y);
			var factor = Math.pow(scaleFactor2,clicks);
			ctx2.scale(factor,factor);
			ctx2.translate(-pt.x,-pt.y);
			redraw2();
		}

		var handleScroll = function(evt){
			var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
			if (delta) zoom2(delta);
			return evt.preventDefault() && false;
		};
		canvas2.addEventListener('DOMMouseScroll',handleScroll,false);
		canvas2.addEventListener('mousewheel',handleScroll,false);
	};
	//gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';
	//ball.src   = 'http://phrogz.net/tmp/alphaball.png';
	
	// Adds ctx.getTransform() - returns an SVGMatrix
	// Adds ctx.transformedPoint2(x,y) - returns an SVGPoint
	function trackTransforms(ctx){
		var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		var xform = svg.createSVGMatrix();
		ctx.getTransform = function(){ return xform; };
		
		var savedTransforms = [];
		var save = ctx.save;
		ctx.save = function(){
			savedTransforms.push(xform.translate(0,0));
			return save.call(ctx);
		};
		var restore = ctx.restore;
		ctx.restore = function(){
			xform = savedTransforms.pop();
			return restore.call(ctx);
		};

		var scale = ctx.scale;
		ctx.scale = function(sx,sy){
			xform = xform.scaleNonUniform(sx,sy);
			return scale.call(ctx,sx,sy);
		};
		var rotate = ctx.rotate;
		ctx.rotate = function(radians){
			xform = xform.rotate(radians*180/Math.PI);
			return rotate.call(ctx,radians);
		};
		var translate = ctx.translate;
		ctx.translate = function(dx,dy){
			xform = xform.translate(dx,dy);
			return translate.call(ctx,dx,dy);
		};
		var transform = ctx.transform;
		ctx.transform = function(a,b,c,d,e,f){
			var m2 = svg.createSVGMatrix();
			m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
			xform = xform.multiply(m2);
			return transform.call(ctx,a,b,c,d,e,f);
		};
		var setTransform = ctx.setTransform;
		ctx.setTransform = function(a,b,c,d,e,f){
			xform.a = a;
			xform.b = b;
			xform.c = c;
			xform.d = d;
			xform.e = e;
			xform.f = f;
			return setTransform.call(ctx,a,b,c,d,e,f);
		};
		var pt  = svg.createSVGPoint();
		ctx.transformedPoint = function(x,y){
			pt.x=x; pt.y=y;
			return pt.matrixTransform(xform.inverse());
		}
	}
	
	
	//***************************************************************************** CAN 2
	

	//var gkhead = new Image;
	//var ball   = new Image;
	//gkhead.src = 'http://phrogz.net/tmp/gkhead.jpg';
	//ball.src   = 'http://phrogz.net/tmp/alphaball.png';
	
	// Adds ctx2.getTransform() - returns an SVGMatrix
	// Adds ctx2.transformedPoint2(x,y) - returns an SVGPoint
	function trackTransforms2(ctx2){
		var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
		var xform = svg.createSVGMatrix();
		ctx2.getTransform = function(){ return xform; };
		
		var savedTransforms = [];
		var save = ctx2.save;
		ctx2.save = function(){
			savedTransforms.push(xform.translate(0,0));
			return save.call(ctx2);
		};
		var restore = ctx2.restore;
		ctx2.restore = function(){
			xform = savedTransforms.pop();
			return restore.call(ctx2);
		};

		var scale = ctx2.scale;
		ctx2.scale = function(sx,sy){
			xform = xform.scaleNonUniform(sx,sy);
			return scale.call(ctx2,sx,sy);
		};
		var rotate = ctx2.rotate;
		ctx2.rotate = function(radians){
			xform = xform.rotate(radians*180/Math.PI);
			return rotate.call(ctx2,radians);
		};
		var translate = ctx2.translate;
		ctx2.translate = function(dx,dy){
			xform = xform.translate(dx,dy);
			return translate.call(ctx2,dx,dy);
		};
		var transform = ctx2.transform;
		ctx2.transform = function(a,b,c,d,e,f){
			var m2 = svg.createSVGMatrix();
			m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
			xform = xform.multiply(m2);
			return transform.call(ctx2,a,b,c,d,e,f);
		};
		var setTransform = ctx2.setTransform;
		ctx2.setTransform = function(a,b,c,d,e,f){
			xform.a = a;
			xform.b = b;
			xform.c = c;
			xform.d = d;
			xform.e = e;
			xform.f = f;
			return setTransform.call(ctx2,a,b,c,d,e,f);
		};
		var pt  = svg.createSVGPoint();
		ctx2.transformedPoint2 = function(x,y){
			pt.x=x; pt.y=y;
			return pt.matrixTransform(xform.inverse());
		}
	}