function checkBox(d,g,m,j,n,l,c,f,k,b,h,o,a){var e=13;var i=true;if(arguments.length==e){this.id=d;this.parentNode=g;this.x=m;this.y=j;this.checkboxId=n;this.checkcrossId=l;this.checkedStatus=c;this.labelText=f;this.textStyles=k;if(!this.textStyles["font-size"]){this.textStyles["font-size"]=12}this.labelDistance=b;this.labelYOffset=h;this.radioButtonGroup=o;this.functionToCall=a;this.exists=true;this.label=undefined}else{i=false;alert("Error in checkbox ("+d+"): wrong nr of arguments! You have to pass over "+e+" parameters.")}if(i){this.timer=new Timer(this);if(this.radioButtonGroup){this.timerMs=0}else{this.timerMs=200}this.createCheckBox()}else{alert("Could not create checkbox with id '"+d+"' due to errors in the constructor parameters")}}checkBox.prototype.createCheckBox=function(){if(typeof(this.parentNode)=="string"){this.parentNode=document.getElementById(this.parentNode)}this.checkBox=document.createElementNS(svgNS,"use");this.checkBox.setAttributeNS(null,"x",this.x);this.checkBox.setAttributeNS(null,"y",this.y);this.checkBox.setAttributeNS(xlinkNS,"href","#"+this.checkboxId);this.checkBox.addEventListener("click",this,false);this.checkBox.setAttributeNS(null,"cursor","pointer");this.parentNode.appendChild(this.checkBox);this.checkCross=document.createElementNS(svgNS,"use");this.checkCross.setAttributeNS(null,"x",this.x);this.checkCross.setAttributeNS(null,"y",this.y);this.checkCross.setAttributeNS(xlinkNS,"href","#"+this.checkcrossId);this.parentNode.appendChild(this.checkCross);if(this.checkedStatus==false){this.checkCross.setAttributeNS(null,"display","none")}if(this.labelText){if(this.labelText.length>0){this.label=document.createElementNS(svgNS,"text");for(var b in this.textStyles){var a=this.textStyles[b];if(b=="font-size"){a+="px"}this.label.setAttributeNS(null,b,a)}this.label.setAttributeNS(null,"x",(this.x+this.labelDistance));this.label.setAttributeNS(null,"y",(this.y+this.labelYOffset));this.label.setAttributeNS(null,"cursor","pointer");var c=document.createTextNode(this.labelText);this.label.appendChild(c);this.label.setAttributeNS(null,"pointer-events","all");this.label.addEventListener("click",this,false);this.parentNode.appendChild(this.label)}}if(this.radioButtonGroup){this.radioButtonGroup.addCheckBox(this)}};checkBox.prototype.handleEvent=function(a){if(a.type=="click"){if(this.checkedStatus==true){this.checkCross.setAttributeNS(null,"display","none");this.checkedStatus=false}else{this.checkCross.setAttributeNS(null,"display","inline");this.checkedStatus=true}}this.timer.setTimeout("fireFunction",this.timerMs)};checkBox.prototype.fireFunction=function(){if(this.radioButtonGroup){this.radioButtonGroup.selectById(this.id,true)}else{if(typeof(this.functionToCall)=="function"){this.functionToCall(this.id,this.checkedStatus,this.labelText)}if(typeof(this.functionToCall)=="object"){this.functionToCall.checkBoxChanged(this.id,this.checkedStatus,this.labelText)}if(typeof(this.functionToCall)==undefined){return}}};checkBox.prototype.check=function(a){this.checkCross.setAttributeNS(null,"display","inherit");this.checkedStatus=true;if(a){this.timer.setTimeout("fireFunction",this.timerMs)}};checkBox.prototype.uncheck=function(a){this.checkCross.setAttributeNS(null,"display","none");this.checkedStatus=false;if(a){this.timer.setTimeout("fireFunction",this.timerMs)}};checkBox.prototype.moveTo=function(b,a){this.x=b;this.y=a;this.checkBox.setAttributeNS(null,"x",this.x);this.checkBox.setAttributeNS(null,"y",this.y);this.checkCross.setAttributeNS(null,"x",this.x);this.checkCross.setAttributeNS(null,"y",this.y);if(this.labelText){this.label.setAttributeNS(null,"x",(this.x+this.labelDistance));this.label.setAttributeNS(null,"y",(this.y+this.labelYOffset))}};checkBox.prototype.remove=function(a){this.checkBox.removeEventListener("click",this,false);this.parentNode.removeChild(this.checkBox);this.parentNode.removeChild(this.checkCross);if(this.label){this.parentNode.removeChild(this.label)}this.exists=false};checkBox.prototype.setLabelText=function(a){this.labelText=a;if(this.label){this.label.firstChild.nodeValue=a}else{if(this.labelText.length>0){this.label=document.createElementNS(svgNS,"text");for(var b in this.textStyles){value=this.textStyles[b];if(b=="font-size"){value+="px"}this.label.setAttributeNS(null,b,value)}this.label.setAttributeNS(null,"x",(this.x+this.labelDistance));this.label.setAttributeNS(null,"y",(this.y+this.textStyles["font-size"]*0.3));var c=document.createTextNode(this.labelText);this.label.appendChild(c);this.parentNode.appendChild(this.label)}}};function radioButtonGroup(c,a){var b=2;if(arguments.length==b){this.id=c;if(typeof(a)=="function"||typeof(a)=="object"||typeof(a)==undefined){this.functionToCall=a}else{alert("Error in radiobutton with ("+c+"): argument functionToCall is not of type 'function', 'object' or undefined!")}this.checkBoxes=new Array();this.selectedId=undefined;this.selectedIndex=undefined;this.timer=new Timer(this);this.timerMs=200}else{alert("Error in radiobutton with ("+c+"): wrong nr of arguments! You have to pass over "+b+" parameters.")}}radioButtonGroup.prototype.addCheckBox=function(a){this.checkBoxes.push(a);if(a.checkedStatus){this.selectedId=a.id;this.selectedIndex=this.checkBoxes.length-1}};radioButtonGroup.prototype.selectById=function(c,a){var d=false;for(var b=0;b<this.checkBoxes.length;b++){if(this.checkBoxes[b].id==c){this.selectedId=c;this.selectedIndex=b;if(this.checkBoxes[b].checkedStatus==false){this.checkBoxes[b].check(false)}d=true}else{this.checkBoxes[b].uncheck(false)}}if(d){if(a){this.timer.setTimeout("fireFunction",this.timerMs)}}else{alert("Error in radiobutton with ("+this.id+"): could not find checkbox with id '"+c+"'")}};radioButtonGroup.prototype.selectByLabelname=function(a,b){var d=-1;for(var c=0;c<this.checkBoxes.length;c++){if(this.checkBoxes[c].labelText==a){d=this.checkBoxes[c].id}}if(d==-1){alert("Error in radiobutton with ("+this.id+"): could not find checkbox with label '"+a+"'")}else{this.selectById(d,b)}};radioButtonGroup.prototype.fireFunction=function(){if(typeof(this.functionToCall)=="function"){this.functionToCall(this.id,this.selectedId,this.checkBoxes[this.selectedIndex].labelText)}if(typeof(this.functionToCall)=="object"){this.functionToCall.radioButtonChanged(this.id,this.selectedId,this.checkBoxes[this.selectedIndex].labelText)}if(typeof(this.functionToCall)==undefined){return}};