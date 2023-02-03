var chars = "", useLowerCase, useUpperCase, useNumbers, useSpecial, useRare, excludeSimilar, autoCopy, nothing, password = document.getElementById("password"), run = document.getElementById('run'), copied = true;
onload = setup();
function setup() {
	setChars();
	generatepass();
};
function setChars() {
	chars = "";
	useLowerCase = document.getElementById('useLowerCase').checked;
	useUpperCase = document.getElementById('useUpperCase').checked;
	useNumbers = document.getElementById('useNumbers').checked;
	useSpecial = document.getElementById('useSpecial').checked;
	useRare = document.getElementById('useRare').checked;
	excludeSimilar = document.getElementById('excludeSimilar').checked;
	autoCopy = document.getElementById('autoCopy').checked;
	nothing = !(useLowerCase) && !(useUpperCase) && !(useNumbers) && !(useSpecial) && !(useRare);
	if (useLowerCase) { chars += "abcdefghiklmnopqrstuvwxyz"; }
	if (useUpperCase) { chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; }
	if (useNumbers) { chars += "0123456789"; }
	if (excludeSimilar) { chars = chars.replace(/[iIl1oO0]/g,""); }
	if (useSpecial) { chars += "@#$%"; }
	if (useRare) { chars += "{}[]()/\~,;:.<>"; }
	if (nothing) { chars = "Nothing!? 🤔"; }
	document.getElementById('preview').innerHTML = chars;
}
document.getElementById('options').addEventListener('click', function() {
	setChars();
	if (nothing) { chars = ""; }
});
function autoCopyPass() {
	password.select();
	password.setSelectionRange(0, 99999);
	document.execCommand("copy");
	password.blur();
	run.classList.remove('copied');
	run.classList.add('copied');
	if (copied) {
		copied = false;
		setTimeout( function() {
			run.classList.remove('copied');
			copied = true;
		}, 1500);
	}
}
function generatepass() {
	var length = document.getElementById('length').value;
	var pass = '';
	for (var i = 0; i < length; i++) {
		var n = Math.floor(Math.random() * chars.length);
		pass += chars.substring(n,n+1);
	}
	password.value = pass;
	if (autoCopy) {
		autoCopyPass();
	}
};
document.getElementById('advanced').addEventListener('click', function() {
	document.getElementById('advanced').classList.toggle('active');
	document.getElementById('advancedOptions').classList.toggle('active');
});
document.getElementById('menutoggle').addEventListener('click', function() {
	document.getElementById('menu').classList.toggle('active');
	document.getElementById('menutoggle').classList.toggle('active');
	document.getElementById('menutoggleBack').classList.toggle('active');
	document.getElementById('content').classList.toggle('disabled');
});
document.getElementById('menutoggleBack').addEventListener('click', function() {
	document.getElementById('menutoggle').click();
});
document.getElementById('plus').addEventListener('click', function() {
	document.getElementById('length').value++;
});
document.getElementById('minus').addEventListener('click', function() {
  if (document.getElementById('length').value > 0) {
    document.getElementById('length').value--;
  }
});
document.body.addEventListener('keypress', function(e) {
	if (document.getElementById('menu').classList.contains('active')) {
		e.preventDefault();
		if(e.key == "Escape") {
			document.getElementById('menutoggle').click();
		}
	}
});
document.body.onkeypress = function(e){
	if (document.getElementById('menu').classList.contains('active')) {
		e.preventDefault();
		if(e.keyCode == 27){
			document.getElementById('menutoggle').click();
		}
	}
	if(e.keyCode == 32){
		generatepass();
		password.blur();
	}
}