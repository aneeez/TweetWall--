<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title>TweetWall++ | A Customizable Wall of Tweets</title>
	<meta name="description" content="TweetWall++ | A Customizable Wall of Tweets" />
	<meta name="keywords" content="TweetWall++, hash tags, twitter,  hash wall, tweet wall, tweet, tweets, nakul, ezhuthupally" />
	<meta name="author" content="Nakul Ezhuthupally"
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
	<script type="text/javascript" src="./js/jquery.js"></script>
	<script type="text/javascript" src="./js/effects.js"></script>
	<link rel="stylesheet" href="./css/fonts.css" />
	<link rel="stylesheet" href="./css/styles.css" />
	<link rel="icon" type="image/png" href="./images/favicon.png" />
</head>

<body>

	<div id="absummon"></div>
	<div id="adminbar">
		<ul>
			<li id="refresh" style="padding-top:8px;">Refresh Now</li>
			<li id="stop" style="padding-top:8px;">Stop Auto Updating</li>
			<li id="restart" style="padding-top:8px;">Restart Auto Updating</li>
			<li>
				<form method="post" name="adminform" onSubmit="return getweets(this.aditem.value,this.adnooftweets.value,this.addelay.value,this.adbckclr.value,this.adbckimg.value,this.adtxtclr.value,this.adfntsz.value);">
					<table style="display:inline;">
<td><input style="width:90px;" name="aditem" type="text"/></td>
<td><input style="width:25px;" name="adnooftweets" type="text"/></td>
<td><input style="width:25px;" name="addelay" type="text"/></td>
<td><input style="width:35px;" name="adfntsz" type="text"/></td>
<td><input style="width:55px;" name="adbckclr" type="text"/></td>
<td><input style="width:140px;" name="adbckimg" type="text"/></td>
<td><input style="width:55px;" name="adtxtclr" type="text"/></td>
<td><input style="width:35px;" value=">>" type="submit" name="submit"/></td>
					</table>
				</form>
			</li>
			<div style="clear:both;"></div></div>
		</ul>
	<div style="clear:both;"></div></div>

	<div id="outer-wrap">
		
		<noscript>
			
<div class="header">
	<table><tr>
		<td class="logo"><img width="70" height="70" src="./images/logo.png"/></td>
		<td class="title">TweetWall++</td>
	</tr></table>
</div>

This App uses Javascript... So, please turn Javascript on and Come Back

<div class="info">
	<ul>
		<li>**&nbsp; Developed by <a target="_blank" href="http://nakule.in">Nakul Ezhuthupally</a> &nbsp;**</li>
		<li>**&nbsp; Blog : <a target="_blank" href="http://nakule.in">nakule.in</a> Twitter : <a target="_blank" href="http://twitter.com/NakulE">@NakulE</a>
			   Portfolio : <a target="_blank" href="http://me.nakule.in">me.nakule.in</a> &nbsp;**</li>
	</ul>
</div>
		
		</noscript>

		<div id="subform">
			<div class="header">
				<table><tr>
					<td class="logo"><img width="70" height="70" src="./images/logo.png"/></td>
					<td class="title">TweetWall++</td>
				</tr></table>
			</div>
			<form method="post" name="mainform" onSubmit="return getweets(this.item.value,this.nooftweets.value,this.delay.value,this.bckclr.value,this.bckimg.value,this.txtclr.value,this.fntsz.value);">
				<table id="mainptform"><tr>
					<td><input name="item" value="#twitter" type="text"/></td>
					<td><input id="sub" value=">>" type="submit" name="submit"/></td>
				</tr></table>
				<div id="moreoplink">Options >></div>
				<table id="moreop">
					<tr>
	<td><label>No. of Tweets to Display : </label></td>
	<td><input name="nooftweets" value="5" type="text"/></td>
					</tr>
					<tr>
	<td><label>Delay b/w Auto Refresh (in seconds) : </label></td>
	<td><input name="delay" value="15s" type="text"/></td>
					</tr>
					<tr>
	<td><label>Font Size (in px) : </label></td>
	<td><input name="fntsz" value="18px" type="text"/></td>
					</tr>
					<tr>
	<td><label>Background Color : </label></td>
	<td><input name="bckclr" value="#222222" type="text"/></td>
					</tr>
					<tr>
	<td><label>Background Image URL : </label></td>
	<td><input name="bckimg" value="Default Image" type="text"/></td>
					</tr>
					<tr>
	<td><label>Text Color : </label></td>
	<td><input name="txtclr" value="#cccccc" type="text"/></td>
					</tr>
				</table>
			</form>
		</div>
		
		<div id="info">
			<ul>
				<li>**&nbsp; In the TweetWall page, hover to the top for a QuickMenu &nbsp;**</li>
				<li>**&nbsp; Click on a Tweet to Highlight it &nbsp;**</li>
				<li>**&nbsp; Double Click on a Tweet to Delete it &nbsp;**</li>
				<li>**&nbsp; Developed by <a target="_blank" href="http://nakule.in">Nakul Ezhuthupally</a> &nbsp;**</li>
				<li>**&nbsp; Blog : <a target="_blank" href="http://nakule.in">nakule.in</a> Twitter : <a target="_blank" href="http://twitter.com/NakulE">@NakulE</a>
					   Portfolio : <a target="_blank" href="http://me.nakule.in">me.nakule.in</a> &nbsp;**</li>
			</ul>
		</div>

	</div>
	
	<div id="main-wrap"></div>
	
	<div id="statusbar">Here is a Message</div>
	
	<div id="highlightzone">
		<div id="hlmsg"></div>
	</div>

</body>

</html>
