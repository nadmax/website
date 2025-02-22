const cacheKey = "github_repos_cache";

async function fetchGitHubRepos() {
    let cachedData = localStorage.getItem(cacheKey);
    if (cachedData) cachedData = JSON.parse(cachedData);

    try {
        const response = await fetch("/github-repos");
        if (!response.ok) throw new Error(`Proxy server error: ${response.status}`);

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Unexpected API response format");

        localStorage.setItem(cacheKey, JSON.stringify(data));
        displayRepos(data);
    } catch (error) {
        if (cachedData) 
            displayRepos(cachedData);
        else
            console.error("Error fetching data:", error);
    }
}

function displayRepos(repoList) {
    const container = document.getElementById("github-projects");

    repoList.forEach(repo => {
        const repoElement = document.createElement("div");

        repoElement.classList.add("github-card");
        repoElement.innerHTML = `
        <img src="${repo.owner.avatar_url}" alt="owner">
            <div class="info">
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available"}</p>
                <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
                <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            </div>
        `
        container.appendChild(repoElement);
    });
}

fetchGitHubRepos();