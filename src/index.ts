
const addButton = document.getElementById('addButton') as HTMLInputElement;
const itemToAdd = document.getElementById('itemToAdd') as HTMLInputElement;
const countElem = document.getElementById('count') as HTMLSpanElement;
const list = document.getElementById('list') as HTMLUListElement;
let items: ShoppingItem[] = [];

const storedItems = localStorage.getItem('shopping-list');
if (storedItems) {
    items = JSON.parse(storedItems);
    items.forEach(createItemInDom);
    countElem.innerText = items.length.toString();
}


addButton.addEventListener('click', addTheItem);

// better way to do this is with a form, but this works
itemToAdd.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
        addTheItem();
    }
});

interface ShoppingItem {
    description: string;
}

function addTheItem() {
    const item = itemToAdd.value;
    const thingtoAdd: ShoppingItem = { description: item };
    items = [...items, thingtoAdd];
    createItemInDom(thingtoAdd);
    itemToAdd.value = ''; //  clear input
    itemToAdd.focus(); // put cursor there ready for next item
    countElem.innerText = items.length.toString();
    saveIt();
}

function createItemInDom(item: ShoppingItem) {
    const li = document.createElement('li') as HTMLLIElement;
    li.classList.add('list-group-item');
    const text = document.createTextNode(item.description);
    li.appendChild(text);
    list.insertBefore(li, list.firstChild);
}

function saveIt() {
    localStorage.setItem('shopping-list', JSON.stringify(items));
}
