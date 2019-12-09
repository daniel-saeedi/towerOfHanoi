/*
** Danial Saeedi
** 2019
** Hanoi Problem
** email  : saeedi.danial@gmail.com
** site   : danialsaeedi.com
** Github : 
*/

//In here I am creating a class
var HanoiTower = function()
{
	this.disks;

	//1: slow
	//2: fast
	this.speed;

	this.moves = [];
}

HanoiTower.prototype.initialize = function()
{
	var $this = this;

	$(".submit").click(function(){
	    if($("#disks").val() != null && $("#speed").val() != 0 && $("#disks").val() <= 12){
			$this.speed = $("#speed").val();
			$this.disks = $("#disks").val();

			$(".form").hide();

			$this.createDisk();

			$this.solver($this.disks,"a","c","b");

			$this.animation();
	    }
	    else if($("#disks").val() > 12){
	        alert('number of disks should be less than 12');
	    }
        else{
			alert("Please fill the inputs correctly!");
		}
	});
}

HanoiTower.prototype.solver = async function(n,start,end,auxiliary)
{
    console.log('test');
	var $this = this;
	//Base Case
	if(n == 1)
	{
		console.log("Move disk 1 from "+ start + " to " + end);
		this.moves.push([1,start,end]);
		return;
	}

	else
	{
		//Recursive Case

		$this.solver(parseInt(n-1),start,auxiliary,end);

		console.log("Move disk "+n+" from "+ start + " to " + end);

		this.moves.push([parseInt(n),start,end]);
		$this.solver(parseInt(n-1),auxiliary,end,start);
		
		
	}
}

/*
This function creates disks.
*/
HanoiTower.prototype.createDisk = function()
{
	var diskWidth = 300;
	for(var i = this.disks; i > 0;i--){
		$("#a").prepend('<div class="disk" id="disk'+i+'"" style="background-color:'+random_rgba()+';width:'+diskWidth+'px;"></div>');
		diskWidth -= 20;
	}
}

/*
Args
diskNo
start : it indicates where our disk is placed right now
dest  : Destination of disk

This function moves a disk
*/
HanoiTower.prototype.moveDisk = async function(diskNo,start,dest)
{
		console.log("#disk"+diskNo);
		console.log("#"+start);
		console.log("#"+dest);
		console.log('next move');

		$("#"+dest).prepend($("#disk"+diskNo).clone());

		$("#"+start+ " #disk"+diskNo).remove();
}

HanoiTower.prototype.animation = async function()
{
    if(this.speed == 1){
        this.time = 1000;
    }else{
        this.time = 200;
    }
	await sleep(this.time);
	for(var j = 0;j < this.moves.length;j++){
		this.moveDisk(this.moves[j][0],this.moves[j][1],this.moves[j][2]);
		await sleep(this.time);
	}

	alert('the end');
}


var Hanoi =  new HanoiTower();

//When the page is ready, call initialize
$(function() {
	Hanoi.initialize();
});


/* Functions */
function random(min,max){
	return Math.floor(Math.random() * max) + min;
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}