(function () {
	const apiHost = "https://api.silas229.name";
	const cdnHost = "https://cdn.silas229.name";

	i18next
		.use(i18nextXHRBackend)
		.use(i18nextBrowserLanguageDetector)
		.init({
			fallbackLng: {
				'de': ['de', 'en'],
				'default': ['en', 'de']
			},
			debug: false,
			backend: {
				loadPath: apiHost + '/v2/translations/portfolio/{{lng}}',
				crossDomain: true
			}
		}, function(err, t) {
			
			localize = new locI18next.init(i18next);

			if (i18next.language.match(/de-/g)) i18next.changeLanguage('de');
			if (i18next.language.match(/en-/g)) i18next.changeLanguage('en');

			updateContent();
			
			i18next.on('languageChanged', () => {
				updateContent();
			});
			
		});
	
	function updateContent() {
		localize("body");
		updateCopyright();
		updateSwitch();
		updateProjects();
	}
	
	function updateCopyright() {
		document.getElementById("copyright").innerHTML = i18next.t('footer.copyright', {
			year: new Date().getFullYear()
		})
	}

	function updateSwitch() {
		const container = document.getElementsByClassName("languages")[0];
		container.innerHTML = '';
		i18next.languages.forEach(function(lng) {
			container.innerHTML += `<span class="language${ ((lng === i18next.language) ? ' active' : '') }" onclick="i18next.changeLanguage('${ lng }')" title="${ lng }">${ lng }</span>`;
		});
	}
	
	function updateProjects() {
		const wrapper = document.getElementsByClassName("projects")[0];
		document.getElementsByClassName("loading")[0].style.display = "block";
		wrapper.innerHTML = '<p class="loading" data-i18n="projects.loading">Loading...</p>';
		localize(".loading");
		
		const request = new XMLHttpRequest();
		request.open('GET', apiHost + "/v2/projects/" + i18next.language, true);
		
		request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
				const projects = JSON.parse(request.responseText);
				projects.forEach(function(project) {
					wrapper.innerHTML += `
          <a href="${ project.url }" class="project" ${ project.newtab ? `target="_blank"` : `` } title="${ project.name }" aria-label="${ project.name }">
          <img src="${ cdnHost }/projects/${ project.icon }.png" alt="" class="icon">
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
		i.addEventListener("click", function() {
			closeModal(this.dataset.target);
		});
	});
	
	window.onclick = function(event) {
		if (event.target === document.getElementById("privacyModal")) closeModal("privacyModal");
	};
	
	if (window.location.search.match( /privacy/gi )) openModal("privacyModal");
})();
