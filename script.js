const languageSelect = document.getElementById('language-dropdown');
const refreshButton = document.getElementById('refresh');
const retryButton = document.getElementById('retry');
const repositoryDisplay = document.getElementById('display-repository');
const emptyState = document.getElementById('empty-state');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');

const programmingLanguages = [
    "JavaScript", "Python", "Java", "C#", "C++", "Ruby", "Go", "Swift", "PHP", "TypeScript",
    "HTML", "CSS", "Rust", "Kotlin", "Scala", "Perl", "Haskell", "R", "Dart"
];

function selectLanguages() {
    if (!languageSelect) {
        console.error("Error: language-dropdown element not found in HTML!");
        return;
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select a language:';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    languageSelect.appendChild(defaultOption);

    programmingLanguages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.toLowerCase();
        option.textContent = lang;
        languageSelect.appendChild(option);
    });

    showState('empty');
}

function showState(state) {
    if (emptyState) emptyState.style.display = 'none';
    if (loadingState) loadingState.style.display = 'none';
    if (errorState) errorState.style.display = 'none';
    if (refreshButton) refreshButton.style.display = 'none';
    if (retryButton) retryButton.style.display = 'none';

    if (state === 'empty') {
        if (emptyState) emptyState.style.display = 'block';
        if (languageSelect) languageSelect.value = '';
    } else if (state === 'loading') {
        if (loadingState) loadingState.style.display = 'block';
        if (repositoryDisplay) repositoryDisplay.innerHTML = '';
    } else if (state === 'error') {
        if (errorState) errorState.style.display = 'flex';
        if (retryButton) retryButton.style.display = 'block';
    } else if (state === 'success') {
        if (refreshButton) refreshButton.style.display = 'block';
        if (repositoryDisplay) repositoryDisplay.style.display = 'block';
    }
}

async function fetchRandomRepository(language) {
    if (!language) {
        showState('empty');
        return;
    }

    showState('loading');

    const url = `https://api.github.com/search/repositories?q=language:${encodeURIComponent(language)}&sort=stars&order=desc`;

    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.message || 'Server responded with an error.'}`);
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const randomIndex = Math.floor(Math.random() * data.items.length);
            const repo = data.items[randomIndex];
            updateRepositoryDisplay(repo);
            showState('success');
        } else {
            if (errorState && errorState.childNodes[0]) {
                errorState.childNodes[0].nodeValue = `No repositories found for "${language}". Try another language or retry.`;
            } else {
                errorState.innerHTML = `No repositories found for "${language}". Try another language or retry. <button id="retry" style="display:none;">Click to retry</button>`;
                const newRetryButton = errorState.querySelector('#retry');
                if (newRetryButton) {
                    newRetryButton.style.display = 'block';
                    newRetryButton.onclick = () => fetchRandomRepository(language);
                }
            }
            showState('error');
        }
    } catch (error) {
        console.error("Error fetching repository:", error);
        if (errorState && errorState.childNodes[0]) {
            errorState.childNodes[0].nodeValue = `Failed to fetch repository. Error: ${error.message}. Please try again.`;
        } else {
            errorState.innerHTML = `Failed to fetch repository. Error: ${error.message}. Please try again. <button id="retry" style="display:none;">Click to retry</button>`;
            const newRetryButton = errorState.querySelector('#retry');
            if (newRetryButton) {
                newRetryButton.style.display = 'block';
                newRetryButton.onclick = () => fetchRandomRepository(language);
            }
        }
        showState('error');
    }
}

function updateRepositoryDisplay(repo) {
    if (!repositoryDisplay) {
        console.error("Error: display-repository element not found!");
        return;
    }

    repositoryDisplay.innerHTML = `
        <div class="repo-card">
            <h2><a href="${repo.html_url}" target="_blank">${repo.name}</a></h2>
            <p>${repo.description || 'No description available.'}</p>

            <div class="repo-stats">
                <span>${repo.stargazers_count} Stars</span>
                <span>${repo.forks_count} Forks</span>
                <span>${repo.open_issues_count} Open Issues</span>
            </div>

            <p><strong>Language:</strong> <span class="language-dot" data-language="${repo.language ? repo.language.toLowerCase() : 'n/a'}"></span> ${repo.language || 'N/A'}</p>
        </div>
    `;
}

languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    if (selectedLanguage) {
        fetchRandomRepository(selectedLanguage);
    } else {
        showState('empty');
    }
});

refreshButton.addEventListener('click', () => {
    const currentLanguage = languageSelect.value;

    if (currentLanguage) {
        fetchRandomRepository(currentLanguage);
    } else {
        showState('empty');
    }
});

retryButton.addEventListener('click', () => {
    const currentLanguage = languageSelect.value;

    if (currentLanguage) {
        fetchRandomRepository(currentLanguage);
    } else {
        showState('empty');
    }
});

selectLanguages();