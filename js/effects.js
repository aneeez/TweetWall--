// Global Variable Declarations

var err=false;
var searchterm;
var searchnum;
var lastid = "";
var checkto;
var defbckclr = "#222222", defbckimg = "./images/wood.jpg", deftxtclr = "#cccccc", defntsz = "18px", delay;
var carryon = false;


// Calculate and Set the Height & Width for Tweet Highlight

function sethlheight(){
	$('#highlightzone').css({
		'max-height' : '100%',
		'max-width' : '100%',
		'height' : '100%',
		'width' : '100%',
		'min-width' : '1000px',
		'min-height' : '500px',
	});
	var x = $('#highlightzone').height();
	x = (x - $('#hlmsg').height())/2;
	x += "px";
	$('#hlmsg').css('top',x);
	
	var x = $('#highlightzone').width();
	x = (x - $('#hlmsg').width())/2;
	x += "px";
	$('#hlmsg').css('left',x);
}


// Function to Show Alert Messages in the Status Bar

function alertmsg(str){
	$('#statusbar').hide();
	$('#statusbar').html(str);
	$('#statusbar').slideDown(500, function(){
			setTimeout("$('#statusbar').slideUp(1000);", 3000);
	});
}


// Set the Custom CSS Properties

function setcssvalues(){
	$('#tweetlist').css('color',deftxtclr);
	$('#main-wrap table.tbone .tdtweet').css('color',deftxtclr);
	$('body').css('background-color',defbckclr);
	tmp = "url('" + defbckimg + "')";
	$('body').css('background-image',tmp);
	$('#tweetlist').css('font-size',defntsz);
}


// Main Call Handler

var getweets = function(searchitem,searchno,redelay,bckclr,bckimg,txtclr,fntsz){
	if(searchno.match(/^[0-9]+$/) == null){
		alertmsg("Invalid Number");
		return false;
	}
	if(txtclr.match(/^#?[0-9a-fA-F]{6}$/) == null){
		alertmsg("Invalid Text Color");
		return false;
	}
	if( (bckimg.match(/[.]{1}((jpeg)|(jpg)|(gif)|(png))$/i) == null) && (bckimg != "Default Image") ){
		alertmsg("Invalid Background Color");
		return false;
	}
	if(bckclr.match(/^#?[0-9a-fA-F]{6}$/) == null){
		alertmsg("Invalid Background Color");
		return false;
	}
	if(fntsz.match(/^([0-9])+(px)$/) == null){
		alertmsg("Invalid Font Size");
		return false;
	}
	if(redelay.match(/^[0-9]+(s)$/) == null){
		alertmsg("Invalid Delay");
		return false;
	}
	err = false;
	defbckclr = bckclr;
	if(bckimg != "Default Image")
		defbckimg = bckimg;
	deftxtclr = txtclr;
	defntsz = fntsz;
	delay = redelay.match(/^[0-9]+/)*1000;
	setcssvalues();
	document.adminform.aditem.value = searchitem;
	document.adminform.adnooftweets.value = searchno;
	document.adminform.addelay.value = (delay/1000) + "s";
	document.adminform.adbckclr.value = defbckclr;
	document.adminform.adbckimg.value =  bckimg;
	document.adminform.adtxtclr.value = deftxtclr;
	document.adminform.adfntsz.value = defntsz;
	$('#info').fadeOut(400);
	$('#outer-wrap').fadeOut(400);
	$('#subform').fadeOut(400, function(){
		$('#main-wrap').html('<img style="height:128px;width:128px;margin:100px 0 0 336px;" height="128" width="128" src="./images/loading.gif"/>');
	});
	searchterm = searchitem;
	searchnum = searchno;
	lastid = "";
	clearTimeout(checkto);
	go(searchitem,searchno);
	return false;
}


// AJAX function to asynchronously load Tweets

var go = function(searchitem, searchno){
	try{
	//console.log("going again");
	urltogo = "http://search.twitter.com/search.json?callback=?&q=" + searchitem + "&rpp=" + searchno + "&since_id=" + lastid + "&callback=?";
	//console.log(urltogo);
	$.ajax({
		url : 'http://search.twitter.com/search.json',
		data : {
			q : searchitem,
			rpp : searchno,
		//	since_id : lastid
		},
		type : 'GET',
		dataType : 'JSONP',
		success : parsetweets,
		error : errhandle,
		complete : goagain,
	});
	//console.log("End of go()");
	} catch(err){
	//	console.log("caught an error");
		errhandle("shit", "Error");
	}
}


// Function to parse the Tweets

var parsetweets = function(json){
	//console.log("Entered parsetweets()");
	tweets = json.results;
	if((tweets.length == 0) || (json.max_id_str == lastid)){
	//	console.log("No New Tweets");
		if(lastid == ""){
		//	console.log("Infact there are no Tweets at All");
			err = true;
			$('#absummon').hide();
			$('#outer-wrap').fadeIn(400);
			$('#info').fadeIn(400);
			$('#subform').fadeIn(400);
			alertmsg("No Tweets to Display !! Try Another Search");
			$('#main-wrap').html('');
		}
	}
	else{
		html4main = "";
		for (i=0;i<tweets.length;i++){
			if(tweets[i].id_str == lastid)
				break;
			time = tweets[i].created_at;
			user = tweets[i].from_user;
			tweet = tweets[i].text;
			
			var d = Date.parse(time);
			var d1 = new Date(d);
			
			var hr = d1.getHours();
			
			//console.log(hr);
			
			if(hr > 12)
				hr=hr-12;
			else if(hr == 0)
				hr=12;
				
			//console.log(hr);
						
			//time = d1.getHours();
		
			values = time.split(" ");
			time = values[0] + " " + values[1] + " " + values[2] + " " + values[3] + " at " + hr + ":";
			
			if(d1.getMinutes() < 10)
				time += "0" + d1.getMinutes();
			else
				time += d1.getMinutes();
			
			if(d1.getHours() >= 12)
				time+= " PM";
			else
				time+= " AM";
				
					  
			imghtml = "<img class='dp' height='48' width='48' src='" + tweets[i].profile_image_url + "'/>" ;
			
			html4main += "<div class='onetweet'><table class='tbone'><tr><td>" + imghtml + "</td><td class='tdtweet'>";
			html4main += tweet + "</td></tr></table><div class='meta'>" + user + "<span style='font-style:normal;'>&nbsp;&nbsp;on&nbsp;&nbsp;</span>" + time + "</div></div>";			
		}
		if(lastid != ""){
			$('#main-wrap #tweetlist').prepend(html4main);
			//console.log(html4main);
			selection = $('#main-wrap #tweetlist .onetweet');
			for(i=0;(i < tweets.length && tweets[i].id_str != lastid);i++)
				selection.eq(i).hide();
			//console.log(i + "no. of new tweets");
			for(i=0;(i < tweets.length && tweets[i].id_str != lastid);i++)
				setTimeout('selection.eq(' + i + ').slideDown(500);',1000);
			if(selection.length > searchnum)
				setTimeout('selection.eq(searchnum-1).nextAll().slideUp(500, function(){selection.eq(searchnum-1).nextAll().remove();});', 1000);
		}
		else{
			alertmsg("Displaying Search Results for '" + searchterm + "'");
			html4main = "<div id='tweetlist'>" + html4main;
			html4main += "</div>";
			$('#absummon').show();
			$('#main-wrap').html(html4main);
			selection = $('#main-wrap #tweetlist .onetweet');
			selection.hide();
			for(i=0;i<selection.length;i++)
					setTimeout('selection.eq(' + i + ').slideDown(700);',1000);
			if(selection.length > searchnum){
				selection.eq(searchnum).nextAll().slideUp(700, function(){
					selection.eq(searchnum).nextAll().remove();
				});
			}
		}
		lastid = json.max_id_str;
		onreadyload();
	}
}


// Function to handle error in obtaining the Tweets

var errhandle  = function(xhr,status){
	//console.log("Error function");
	err = true;
	clearTimeout(checkto);
	selection = $('#main-wrap #tweetlist .onetweet');
	if(selection.length == 0 && lastid == ""){
		$('#absummon').hide();
		$('#outer-wrap').fadeIn(400);
		$('#info').fadeIn(400);
		$('#subform').fadeIn(400);
	}
	alertmsg("There was an Error!! Try Again");
	$('#main-wrap').html('');
}


// Function to Periodically Check for New Tweets

var goagain = function(xhr, status){
	if(!err){
		clearTimeout(checkto);
		checkto = setTimeout('go(searchterm,searchnum);',delay);
	}
}

// Event Handling Functions

var onreadyload = function(){
	
	setcssvalues();
	
	$('#highlightzone').click(function(){
		$(this).fadeOut(1000);
	});
		
	$('#absummon').hover(function(){
		$('#adminbar').slideDown(200);
	}, function(){
		$('#adminbar').slideDown(600);	
	});
	
	$('#adminbar').hover(function(){
		;
	}, function(){
		$('#adminbar').slideUp(400);
	});
	
	var shit = false;
	
	$('#main-wrap #tweetlist .onetweet').click(function(){
		xy = $(this);
		carryon = true;
		setTimeout(function(){
			if(carryon){
				$('#highlightzone #hlmsg').html(xy.clone());
				$('#highlightzone').fadeIn(500);
				sethlheight();
			}
		},600);
	});
		
	$('#main-wrap #tweetlist .onetweet').dblclick(function(){
		carryon = false;
		$(this).hide(400);
		$(this).remove();
	});
	
	$('#adminbar ul li#refresh').click(function(){
		alertmsg("The Search will be Refreshed");
		clearTimeout(checkto);
		checkto = setTimeout('go(searchterm,searchnum)',1);
	});
	$('#adminbar ul li#restart').click(function(){
		alertmsg("Auto Updation has been Enabled");
		clearTimeout(checkto);
		checkto = setTimeout('go(searchterm,searchnum)',1);
	});
	$('#adminbar ul li#stop').click(function(){
		alertmsg("Auto Updation has been Disabled");
		clearTimeout(checkto,searchnum);
	});
	
	$('#moreoplink').click(function(){
		$('#moreop').fadeIn(2000);
	});
	
}

$(document).ready(function(){
	Image1= new Image(128,128);
	Image1.src = "./images/loading.gif";
	$('#subform').css('display','block');
	$('#info').css('display','block');;
	$('#moreop').hide();
	$('#adminbar').hide();
	$('#statusbar').hide();
	$('#absummon').hide();
	$('#highlightzone').hide();
	onreadyload();
});
