
var spline_cp=[];



function spline()
{
  var canvas = document.getElementById('canvasSignature');
  var ctx = canvas.getContext('2d');
  var drag_idx=-1;
  var drag_x,drag_y;
  var drag_rect_x,drag_rect_y;
//  var image = ctx.createImageData(100,100);
  
  function mouseDown(e) 
  {
    var click_x = e.pageX - this.offsetLeft;
    var click_y = e.pageY - this.offsetTop;

    for (var i=0; i<spline_cp.length;i++)
    {
      if ( (click_x>=(spline_cp[i].x-spline_cp[i].w)) && (click_y>=(spline_cp[i].y-spline_cp[i].h)) && 
           (click_x<(spline_cp[i].x+spline_cp[i].w)) && (click_y<(spline_cp[i].y+spline_cp[i].h)) )
      {
        drag_rect_x = spline_cp[i].x;
        drag_rect_y = spline_cp[i].y;
        drag_x=click_x;
        drag_y=click_y;
        drag_idx=i
        draw();
        break;
      }
    } 
  }

  function mouseUp() 
  {
    drag_idx=-1;
    draw();
  }

  function mouseMove(e) 
  {
    if (drag_idx>=0) 
    {
      var x = (e.pageX - this.offsetLeft);
      var y = (e.pageY - this.offsetTop);
      var offset_x = x-drag_x;
      var offset_y = y-drag_y;

      spline_cp[drag_idx].x = drag_rect_x+offset_x;
      spline_cp[drag_idx].y = drag_rect_y+offset_y;

      ctx.clearRect(0,0,canvas.width,canvas.height);
      draw();
    }
  }

  function draw() 
  {
    //draw the lines between the contol points
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.moveTo(spline_cp[0].x,spline_cp[0].y);
    for (var i=1; i<spline_cp.length;i++)
    {
        ctx.lineTo(spline_cp[i].x,spline_cp[i].y);
    }
    ctx.stroke();
    
    //draw the actual control points
    for (var i=0; i<spline_cp.length;i++)
    {
      if (i==drag_idx)
        ctx.fillStyle = "red";
      else
        ctx.fillStyle = spline_cp[i].color;

      ctx.fillRect(spline_cp[i].x-spline_cp[i].w, spline_cp[i].y-spline_cp[i].h, spline_cp[i].w*2, spline_cp[i].h*2);

      //ctx.fillStyle = "black";
      //ctx.fillText(i+" : "+node.sensors[i].type,node.sensors[i].x,node.sensors[i].y);
      //ctx.fillText(i,node.sensors[i].x,node.sensors[i].y);
    }
    
//      ctx.putImageData(image,0,0);
  }

  //fill in some default node configuration
  for (var x=0;x<4;x++)
  {
      var control = {};
      control.type = "M";
      control.color = "#00ff00";
      control.x = 100+(x*30);
      control.y = 100;
      control.w = 4;
      control.h = 4;
      spline_cp.push(control);
  }

/*  for (var x=0;x<100*100;x++)
  {
      image.data[x*4+0]=0x40
      image.data[x*4+1]=0x40
      image.data[x*4+2]=0x40
      image.data[x*4+3]=0xff
  }*/

  draw();

  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mousemove', mouseMove, false); 
}

//auto run magic so the script starts when the page loads
if (window.addEventListener) window.addEventListener("load", spline, false);
else if (window.attachEvent) window.attachEvent("onload", spline);
else window.onload = spline;
