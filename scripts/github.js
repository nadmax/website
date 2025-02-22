const cacheKey = "github_repos_cache";

async function fetchGitHubRepos() {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        console.log("Loaded from cache");
        displayRepos(JSON.parse(cachedData));

        return;
    }

    try {
        const response = await fetch("/github-repos");
        if (!response.ok) throw new Error("Proxy server error");

        const data = await response.json();
        localStorage.setItem(cacheKey, JSON.stringify(data));
        displayRepos(data);
    } catch (error) {
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