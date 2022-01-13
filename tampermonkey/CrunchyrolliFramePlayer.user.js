// ==UserScript==
// @name         Crunchyroll iFrame Player
// @namespace    http://tampermonkey.net/
// @version      1.0.3

// @homepageURL  https://github.com/DAMIOSKIDEV/CrunchyPassFR

// @supportURL   https://github.com/DAMIOSKIDEV/CrunchyPassFR/issues


// @description  Ce script permet de regarder toutes les vidéos sur Crunchyroll gratuitement que ce soit premium ou non, ce script ne marche que sur la version originale de Crunchyroll et non la Bêta.

// @author       JarEdMaster

// @match        http://www.crunchyroll.com/*
// @match        https://www.crunchyroll.com/*
// @grant        none
// @icon         https://www.crunchyroll.com/favicons/favicon-32x32.png
// ==/UserScript==

(function() {
    'use strict';

    var HTML = document.documentElement.innerHTML;
    let new_str;
    let ifrm;

function pegaString(str, first_character, last_character) {
	if(str.match(first_character + "(.*)" + last_character) == null){
		return null;
	}else{
	    new_str = str.match(first_character + "(.*)" + last_character)[1].trim()
	    return(new_str)
    }
}

function importPlayer(){
		console.log("[CR Premium] Suppression du player de Crunchyroll...");
		var elem = document.getElementById('showmedia_video_player');
    	elem.parentNode.removeChild(elem);

		console.log("[CR Premium] Aquisition des données du stream...");
		var video_config_media = JSON.parse(pegaString(HTML, "vilos.config.media = ", ";"));

    	console.log("[CR Premium] Adicionando o jwplayer...");
    	ifrm = document.createElement("iframe");
    	ifrm.setAttribute("id", "frame");
		ifrm.setAttribute("src", "https://damioskidev.github.io/CrunchyPassFR/");
		ifrm.setAttribute("width","100%");
		ifrm.setAttribute("height","100%");
		ifrm.setAttribute("frameborder","0");
		ifrm.setAttribute("scrolling","no");
		ifrm.setAttribute("allowfullscreen","allowfullscreen");
		ifrm.setAttribute("allow","autoplay; encrypted-media *");

		if(document.body.querySelector("#showmedia_video_box") != null){
			document.body.querySelector("#showmedia_video_box").appendChild(ifrm);
		}else{
			document.body.querySelector("#showmedia_video_box_wide").appendChild(ifrm);
		}

		
		if (document.body.querySelector(".freetrial-note") != null) {
			console.log("[CR Premium] Suppression de la note pour l'essai gratuit...");
			document.body.querySelector(".freetrial-note").style.display = "none";
		}

	
		if(document.body.querySelector(".showmedia-trailer-notice") != null){
			console.log("[CR Premium] Suppression de la vignette...");
			document.body.querySelector(".showmedia-trailer-notice").style.display = "none";
		}

		
		if(document.body.querySelector("#showmedia_free_trial_signup") != null){
			console.log("[CR Premium] Suppression de l'inscription à l'essai gratuit...");
			document.body.querySelector("#showmedia_free_trial_signup").style.display = "none";
		}


		ifrm.onload = function(){
			ifrm.contentWindow.postMessage({
           		'video_config_media': [JSON.stringify(video_config_media)],
           		'lang': [pegaString(HTML, 'LOCALE = "', '",')]
        	},"*");
	    };

		
}
function onloadfunction() {
	if(pegaString(HTML, "vilos.config.media = ", ";") != null){
		importPlayer();
	}
}
document.addEventListener("DOMContentLoaded", onloadfunction());
})();
