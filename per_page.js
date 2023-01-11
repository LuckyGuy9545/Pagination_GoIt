const refs = {
    fetchPostsBtn: document.querySelector('.btn'),
    userList: document.querySelector('.posts')
};

refs.fetchPostsBtn.addEventListener('click', onFetchPostsClick);

function onFetchPostsClick() {
    fetchPosts()
        .then((posts) => renderPosts(posts))
        .catch((error) => console.log(error));

    function fetchPosts() {
        //== change _limit="number" to change quantity of posts
        return fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
            .then(
                (response) => {
                    if (!response.ok) {
                        throw new Error(response.status);
                    }
                    return response.json();
                }
            );
}
};

function renderPosts(posts) {
    const markup = posts
        .map(({ id, title, body, userId }) => {
            return `<li>
          <h2 class="post-title">${title.slice(0, 30)}</h2>
          <p><b>Post id</b>: ${id}</p>
          <p><b>Author id</b>: ${userId}</p>
          <p class="post-body">${body}</p>
        </li>`
        })
        .join('');
    refs.userList.innerHTML = markup;
}

