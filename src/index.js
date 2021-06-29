async function fetchUserRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        return await response.json()
    } catch (error) {
        console.warn(error);
        throw error;
    }
}

async function injectUserRepos(userRepos) {
    const element = document.querySelector('#userRepositoryList');
    element.innerHTML = '';
    userRepos.forEach(repository => {
        const template = `
          <div class="repository">
            <div class="wrapper">
              <span class="full_name">${repository.full_name}</span>
              <span class="description">${repository.description}</span>
            </div>
            <span class="created_at">${repository.created_at}</span>
          </div>
        `
        element.insertAdjacentHTML('beforeend', template);
    })
}

const submitButton = document.querySelector('#submitButton');
submitButton.addEventListener('click', () => {
    const username = document.querySelector('#usernameInput').value;
    fetchUserRepos(username)
        .then(injectUserRepos);
})




