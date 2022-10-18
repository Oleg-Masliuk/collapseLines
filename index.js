function draw() {
 
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");
      
    let x =null;
    let y =null;
    let x1 =null;
    let y1 =null; 
    let a =null;
    let c =null;
    const lines = [];
    const colo =[];
    let centres =[];
    let test = true; 
    let i =0;

    ctx.beginPath();
    ctx.strokeStyle = '#ff0000'
    ctx.lineWidth = 2;
    ctx.moveTo(0,500);
    ctx.lineTo(900,500);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(50,520);
    ctx.lineTo(150,520);
    ctx.lineTo(150,550);
    ctx.lineTo(50,550);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.font = "12px serif";
    ctx.fillText("collapse lines", 60, 537);

    const Cords = (e) => {if (e.clientY<500){
        i=0;
    if (test) {x = e.clientX, y = e.clientY;
        test=false;
        ctx.strokeStyle = 'black'
        canvas.onmousemove=function( e )
        {
            if (!test&&(e.clientY<500)){
                ctx.clearRect(0, 0, 900, 500);
                ctx.moveTo(x, y);
                x1=e.clientX, y1=e.clientY;
                ctx.lineTo(x1,y1);
                ctx.stroke();

            for (const col of colo) {ctx.beginPath();
                ctx.fillStyle = 'red'
                ctx.arc(col.a, col.c,5,0,Math.PI*2,true)
                ctx.fill()
                ctx.stroke();}
                centres = []
            for (const lin of lines) {
                ctx.beginPath();
                ctx.moveTo(lin.x, lin.y);
                ctx.lineTo(lin.x1, lin.y1);
                ctx.stroke();
                let k = (lin.y1 - lin.y)/(lin.x1 - lin.x);
                let b = ((lin.y*(lin.x1 - lin.x) - lin.x*(lin.y1-lin.y)))/(lin.x1 - lin.x)
                let k1 = (y1 - y)/(x1 - x)
                let b1 = (y*(x1 - x) - x*(y1 - y))/(x1 - x)
                a = (b1 - b)/(k - k1)
                c = k*a+b
                if (((lin.x1>a&&a>lin.x)||(lin.x1<a&&a<lin.x))&&((y1>c&&c>y)||(y1<c&&c<y))&&((x1>a&&a>x)||(x1<a&&a<x))&&((y1>c&&c>y)||(y1<c&&c<y)))
                    {centres.push({a, c})
                    ctx.beginPath();
                    ctx.fillStyle = 'red'
                    ctx.arc(a,c,5,0,Math.PI*2,true)
                    ctx.fill()
                    ctx.stroke(); 
        }}
            ctx.beginPath();       
        }}
            test=false}
   else {
        lines.push({x, y, x1, y1});
        Array.prototype.push.apply(colo, centres);
        test=true
    }
    }
    
    if ((50<e.clientX)&&(e.clientX<150)&&((520<e.clientY)&&(e.clientY<550))) { raf = setInterval (anim, 3);}

    function anim() { 
    i++;
    if (i>=100) {clearInterval(raf), Cords}
    ctx.clearRect(0, 0, 900, 500);
    
    lines.map((num)=>{if (num.x<450) {num.x=num.x+((450 - num.x))/20} else {num.x=num.x-(num.x - 450)/20}})
    lines.map((num)=>{if (num.x1<450) {num.x1=num.x1+(450 - num.x1)/20} else {num.x1=num.x1-(num.x1 - 450)/20}})
    lines.map((num)=>{if (num.y<250) {num.y=num.x+(250 - num.y)/20} else {num.y=num.y-(num.y - 250)/20}})
    lines.map((num)=>{if (num.y1<250) {num.y1=num.y1+(250 - num.y1)/20} else {num.y1=num.y1-(num.y1 - 250)/20}})
    colo.map((num)=>{if (num.a<450) {num.a=num.a+(450 - num.a)/20} else {num.a=num.a-(num.a - 450)/20}})
    colo.map((num)=>{if (num.c<250) {num.c=num.c+(250 - num.c)/20} else {num.c=num.c-(num.c - 250)/20}})

    for (const col of colo) {ctx.beginPath();
        ctx.fillStyle = 'red'
        ctx.arc(col.a, col.c,5,0,Math.PI*2,true)
        ctx.fill()
        ctx.stroke();}
    for (const lin of lines) {
        ctx.beginPath();
        ctx.moveTo(lin.x, lin.y);
        ctx.lineTo(lin.x1, lin.y1);
        ctx.stroke();}  
    }
    }      
    canvas.addEventListener('click', Cords)
    canvas.oncontextmenu = function () { 
        test=true; 
        Cords;
        return false;
     };   
};
}
    
 
