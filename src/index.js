async function fetchUserRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        // console.log(response.json());
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
          <a href="${repository.html_url}" class="repository list-group-item">
            <div class="wrapper">
              <span class="full_name">${repository.full_name}</span>
              <span class="description">${repository.description}</span>
            </div>
            <span class="created_at">${repository.created_at}</span>
          </a>
        `
        element.insertAdjacentHTML('beforeend', template);
    })
}

const submitButton = document.querySelector('#submitButton');
submitButton.addEventListener('click', () => {
    const username = document.querySelector('#usernameInput').value;
    fetchUserRepos(username)
        .then(injectUserRepos)
        .then(() => {
            const listItems = document.getElementsByClassName('repository');
            for (let listItem of listItems) {
                listItem.addEventListener('mouseenter', (event) => {
                    event.target.classList.add("active");
                });
                listItem.addEventListener('mouseleave', (event) => {
                    event.target.classList.remove("active");
                });
            }
        });
})




