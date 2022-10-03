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
        <a onclick="clickCategory(${element.category_id})">${element.category_name}</a>
        `
        getCategory.appendChild(li)
    });
}
const clickCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
}

clickhere()