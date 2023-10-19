const container = document.querySelector('.container');
const newBookButton = document.querySelector("[data-open-modal]");
const modal = document.querySelector("[data-modal]");
const submitForm = document.querySelector(".submit");
const closeForm = document.querySelector(".close");


const myLibrary = [];

function Book(author, title, numPages, isRead=false){
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.isRead = isRead;
}

Book.prototype.toggleisRead = function(){
    this.isRead = !this.isRead;
};

function displayBooks(){
    container.innerHTML = '';
    myLibrary.forEach((element, index) => {

        const card = document.createElement('div');
        card.classList.add('card');

        const author = document.createElement('div');
        author.classList.add('author');
        author.textContent = "Author: " + element.author;

        const title = document.createElement('div');
        title.classList.add('bookName');
        title.textContent = "Title: " + element.title;

        const pages = document.createElement('div');
        pages.classList.add('numPages');
        pages.textContent = "Number of Pages: " + element.numPages;
        
        const toggleSwitch = document.createElement('input');
        toggleSwitch.type = 'checkbox';
        toggleSwitch.id = 'toggle-' + index;
        toggleSwitch.checked = element.isRead;
        toggleSwitch.classList.add('toggle-switch');

        const isRead = document.createElement('div');
        isRead.textContent = "Finished: ";
        isRead.appendChild(document.createTextNode(element.isRead ? 'YES' : 'NO'));
        isRead.appendChild(toggleSwitch);

        const removeButton = document.createElement('button');
        removeButton.id = 'remove-button-' + index;
        removeButton.classList.add('remove');
        removeButton.textContent = 'delete';

        card.appendChild(author);
        card.appendChild(title);
        card.appendChild(pages);
        card.appendChild(isRead);
        card.appendChild(removeButton);
        container.appendChild(card);
    });
}

newBookButton.addEventListener("click", () => {
    modal.showModal();
});

submitForm.addEventListener('click',(e)=> {
    e.preventDefault();
    const author = document.querySelector('#author');
    const title = document.querySelector('#title');
    const numPages = document.querySelector('#numPages');
    const isRead = document.querySelector('#isRead');
    myLibrary.push(new Book(author.value, title.value, numPages.value, isRead.checked));
    author.value = '';
    title.value = '';
    numPages.value = '';
    isRead.checked = false;
    displayBooks();
    modal.close();
})

closeForm.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#author').value = '';
    document.querySelector('#title').value = '';
    document.querySelector('#numPages').value = '';
    document.querySelector('#isRead').checked= false;
    modal.close();
})

container.addEventListener('click', (e) => {
    if(e.target && e.target.textContent && e.target.textContent=='remove'){
        const index = parseInt(e.target.id.split('-')[2]);
        myLibrary.splice(index,1);
        displayBooks();
    }
});

container.addEventListener('change', (e) => {
    const index = parseInt(e.target.id.split('-')[1]);
    myLibrary[index].toggleisRead();
    displayBooks();
})
displayBooks();