i18next
	.use(i18nextXHRBackend)
	.use(i18nextBrowserLanguageDetector)
	.init({
		fallbackLng: ["en", "de"],
		debug: false,
		backend: {
			loadPath: 'https://api.silas229.de/v2/translations/portfolio/{{lng}}',
			crossDomain: true
		}
	}, function(err, t) {
		
		localize = locI18next.init(i18next);
		updateContent();
		
		i18next.on('languageChanged', () => {
			updateContent();
		});
		
	});

function updateContent() {
	// localize = locI18next.init(i18next);
	localize("body");
	localize("#copyright", { date: new Date().getFullYear() });
	updateSwitch();
	updateProjects();
}

function updateSwitch() {
	var container = document.getElementsByClassName("languages")[0];
	container.innerHTML = '';
	i18next.languages.forEach(function(lng, i) {
		container.innerHTML += `<span class="language${ ((lng == i18next.language) ? ' active' : '') }" onclick="i18next.changeLanguage('${ lng }')" title="${ lng }">${ lng }</span>`;
	});
}

function updateProjects() {
	var wrapper = document.getElementsByClassName("projects")[0];
	document.getElementsByClassName("loading")[0].style.display = "block";
	wrapper.innerHTML = '<p class="loading" data-i18n="projects.loading">Loading...</p>';
	localize(".loading");
	
	var request = new XMLHttpRequest();
	request.open('GET', "https://api.silas229.de/v2/projects/" + i18next.language, true);
	
	request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
			var projects = JSON.parse(request.responseText);
			projects.forEach(function(project, i) {
				wrapper.innerHTML += `
          <a href="${ project.url }" class="project" target="_blank" title="${ project.name }" aria-label="${ project.name }">
          <img src="https://cdn.silas229.de/projects/${ project.icon }.png" alt="" class="icon">
          <h1 class="title">${ project.name }</h1>
          <p class="description">${ project.description }</p>
          <div class="tax"><div class="category">${ project.tax }</div></div>
          </a>
        `;
			});
			document.getElementsByClassName("loading")[0].style.display = "none"
		} else {
			console.log("Error while loading projects");
		}
	};
	
	request.send();
}

function openModal(modal) {
	document.getElementById(modal).style.display = "block";
}

function closeModal(modal) {
	document.getElementById(modal).style.display = "none";
}

document.getElementById("privacy").addEventListener("click", function(e) {
	openModal(this.dataset.target);
	e.preventDefault();
});

[].forEach.call(document.getElementsByClassName("close"), function(i) {
	i.addEventListener("click", function(e) {
		closeModal(this.dataset.target);
	});
});

window.onclick = function(event) {
	if (event.target == document.getElementById("privacyModal")) closeModal("privacyModal");
}

if (window.location.search.match( /privacy/gi )) openModal("privacyModal");