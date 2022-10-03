const clickhere = () => {
    fetch(`https://openapi.programming-hero.com/api/news/categories`)
        .then(res => res.json())
        .then(data => NewsCategories(data.data.news_category))
        .catch(error => console.log(error))
}
const NewsCategories = (categories) => {
    const getCategory = document.getElementById('categories');
    categories.forEach(element => {
        const li = document.createElement('li')
        li.innerHTML = `
        <a>${element.category_name}</a>
        `
        getCategory.appendChild(li)
    });
}
clickhere()