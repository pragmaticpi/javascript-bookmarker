const body = document.body;

const input = document.querySelector("input[type=text]");
const overlay = document.querySelector('.overlay');

const bookmarkForm = document.querySelector('.bookmark-form');
const bookmarkInput = bookmarkForm.querySelector("input[type=text]");
const bookmarkList = document.querySelector('.bookmarks-list');

const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

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

    const title = bookmarkInput.value;

    const bookmark = {
        title: title
    };

    bookmarks.push(bookmark);
    fillBookmarkList(bookmarks);
    storeBookmark(bookmarks);
    bookmarkForm.reset();
    
    // const title = bookmarkInput.value;
    // const bookmark = document.createElement('a');
    // bookmark.href = "#";
    // bookmark.target = "_blank";
    // bookmark.innerText = title;
    // bookmark.className = "bookmark";

    // bookmarkList.appendChild(bookmark);
}

function fillBookmarkList(bookmarks = []){

    const bookmarksHtml = bookmarks.map((bookmark) => {
        return `<a href="#" class="bookmark">
            ${bookmark.title}
        </a>
        `;
    }).join('');
    
    bookmarkList.innerHTML = bookmarksHtml;
}

function storeBookmark(bookmarks){
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

input.addEventListener('focus', showFloater);
overlay.addEventListener('click', hideFloater);
bookmarkForm.addEventListener('submit', addBookmark);