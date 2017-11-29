const body = document.body;

const input = document.querySelector("input[type=text]");
const overlay = document.querySelector('.overlay');

const bookmarkForm = document.querySelector('.bookmark-form');
const bookmarkInput = bookmarkForm.querySelector("input[type=text]");
const bookmarkList = document.querySelector('.bookmarks-list');
const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

const apiUrl        = 'https://opengraph.io/api/1.0/site';
const appId         = '';                                       // Add your own api key here. 

fillBookmarkList(bookmarks);

function showFloater(){
    body.classList.add('show-floater');
}

function hideFloater(){
    if(body.classList.contains('show-floater'))
        body.classList.remove('show-floater');
}

function addBookmark(event){
    event.preventDefault();

    if(!bookmarkInput.value) return;

    const url = encodeURIComponent(bookmarkInput.value);

    fetch(`${apiUrl}/${url}?app_id=${appId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const bookmark = {
                title: data.hybridGraph.title,
                image: data.hybridGraph.image,
                link: data.hybridGraph.url
            };
        
            bookmarks.push(bookmark);
            fillBookmarkList(bookmarks);
            storeBookmark(bookmarks);
            bookmarkForm.reset();
        })
        .catch(error => {
            console.log("Problem in fetching url data");
        });

    // const title = bookmarkInput.value;
    // const bookmark = document.createElement('a');
    // bookmark.href = "#";
    // bookmark.target = "_blank";
    // bookmark.innerText = title;
    // bookmark.className = "bookmark";

    // bookmarkList.appendChild(bookmark);
}

function fillBookmarkList(bookmarks = []){

    const bookmarksHtml = bookmarks.map((bookmark,i) => {
        return `<a href="${bookmark.link}" class="bookmark" data-id="${i}" target="_blank">
            <div class="img" style="background-image:url('${bookmark.image}')"></div>
            <div class="title">${bookmark.title}</div>
            <span class="glyphicon glyphicon-remove"></span>
        </a>
        `;
    }).join('');
    
    bookmarkList.innerHTML = bookmarksHtml;
}

function storeBookmark(bookmarks){
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function deleteBookmark(e){

    if(!e.target.matches('.glyphicon-remove')) return;

    const index = e.target.parentNode.dataset.id;
    bookmarks.splice(index, 1);
    fillBookmarkList(bookmarks);
    storeBookmark(bookmarks);
}

input.addEventListener('focus', showFloater);
overlay.addEventListener('click', hideFloater);
bookmarkForm.addEventListener('submit', addBookmark);
bookmarkList.addEventListener('click', deleteBookmark);