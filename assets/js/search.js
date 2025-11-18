(function () {
    // Configuration
    const ENDPOINT = '/content.json';
    const CACHE_KEY_DATA = 'search_data_content';
    const CACHE_KEY_META = 'search_data_etag';
    const MAX_RESULTS_LENGTH = 15;
    const MIN_CHARS = 3;

    // DOM Elements
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const statusIndicator = document.getElementById('search-status');

    // Fuzzy search stuff
    let fuseInstance = null;
    let categoryLookup = {};
    let isLoading = false;

    // Fetch and cache site contents
    async function loadData() {
        statusIndicator.textContent = 'Loading...';
        isLoading = true;

        try {
            const headResponse = await fetch(ENDPOINT, { method: 'HEAD' });
            const remoteEtag = headResponse.headers.get('ETag');
            const cachedEtag = localStorage.getItem(CACHE_KEY_META);
            const cachedData = localStorage.getItem(CACHE_KEY_DATA);

            if (remoteEtag && cachedEtag === remoteEtag && cachedData) {
                initFuse(JSON.parse(cachedData));
            } else {
                const response = await fetch(ENDPOINT);
                const data = await response.json();

                try {
                    localStorage.setItem(CACHE_KEY_DATA, JSON.stringify(data));
                    if (remoteEtag) localStorage.setItem(CACHE_KEY_META, remoteEtag);
                } catch (e) {
                    console.warn('LocalStorage issue', e);
                }

                initFuse(data);
            }
        } catch (error) {
            console.error('Error:', error);
            statusIndicator.textContent = 'Error loading data.';
        } finally {
            isLoading = false;
            statusIndicator.textContent = '';
        }
    }

    // Fuzzy search init
    function initFuse(data) {
        if (data.categories && Array.isArray(data.categories)) {
            data.categories.forEach(cat => {
                categoryLookup[cat.id] = { name: cat.name, url: cat.url };
            });
        }

        const options = {
            ignoreLocation: true,
            threshold: 0.3,
            keys: [
                { name: 'title', weight: 0.7 },
                { name: 'content', weight: 0.6 },
                { name: 'categories', weight: 0.2 }
            ]
        };

        fuseInstance = new Fuse(data.meetups || [], options);

        // Check input value again in case user typed while loading
        if (input.value.trim().length >= MIN_CHARS) {
            performSearch(input.value);
        }
    }

    // Updates the browser URL without reloading the page
    function updateURL(query) {
        const url = new URL(window.location);
        if (query) {
            url.searchParams.set('q', query);
        } else {
            url.searchParams.delete('q');
        }
        window.history.replaceState({}, '', url);
    }

    // Performs the fuzzy search
    function performSearch(query) {
        // Check char constraint
        if (query.length < MIN_CHARS) {
            resultsContainer.innerHTML = '';
            updateURL('');
            return;
        }

        updateURL(query);
        if (!fuseInstance) return;

        const results = fuseInstance.search(query);
        renderResults(results);
    }

    function renderResults(results) {
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No results found.</div>';
            resultsContainer.classList.remove('expanded');
            return;
        }

        const html = results.map(result => {
            const doc = result.item;
            const dateStr = doc.date ? new Date(doc.date).toLocaleDateString() : '';

            let tagsHtml = '';
            if (doc.categories && doc.categories.length > 0) {
                const tags = doc.categories.map(catId => {
                    const catInfo = categoryLookup[catId];
                    return catInfo ? `<a href="${catInfo.url}" class="category-tag">${catInfo.name}</a>` : '';
                }).join('');
                if (tags) tagsHtml = `<div class="tags">${tags}</div>`;
            }

            const excerpt = doc.content
                ? doc.content.substring(0, 150) + (doc.content.length > 150 ? '...' : '')
                : '';

            return `
        <div class="result-item">
          <h3><a href="${doc.url}">${doc.title}</a></h3>
          <span class="meta">${dateStr}</span>
          <p class="excerpt">${excerpt}</p>
          ${tagsHtml}
        </div>
      `;
        }).join('');

        resultsContainer.innerHTML = html;
        resultsContainer.classList.remove('expanded');

        if (results.length > MAX_RESULTS_LENGTH) {
            const remaining = results.length - MAX_RESULTS_LENGTH;
            const button = document.createElement('button');
            button.className = 'show-more-btn';
            button.textContent = `Show ${remaining} more results...`;
            button.onclick = function () {
                resultsContainer.classList.add('expanded');
                button.remove();
            };
            resultsContainer.appendChild(button);
        }
    }

    // EVENTS
    let debounceTimer;
    function handleInput(e) {
        const query = e.target.value.trim();

        // Rule: Do nothing (clear results) if less than 3 chars
        if (query.length < MIN_CHARS) {
            resultsContainer.innerHTML = '';
            updateURL('');
            return;
        }

        // Load data on first valid interaction if not loaded
        if (!fuseInstance && !isLoading) {
            loadData().then(() => performSearch(query));
        } else {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => performSearch(query), 300);
        }
    }

    input.addEventListener('input', handleInput);

    // On Load: Check URL Param
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get('q');

    // Only trigger load if param exists AND is >= 3 chars
    if (queryParam && queryParam.length >= MIN_CHARS) {
        input.value = queryParam;
        loadData();
    } else if (queryParam) {
        // Optional: If URL has ?q=ab (too short), populate input but don't run search
        input.value = queryParam;
    }
})();
