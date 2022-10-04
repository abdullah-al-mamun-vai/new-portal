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
        <a onclick="clickCategory(${element.category_id})">${element.category_name ? element.category_name : 'Not Found'}</a>
        `
        getCategory.appendChild(li)
    });
}
const clickCategory = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => loadNews(data.data))
        .catch(error => console.log(error))
}
const loadNews = (newses) => {
    const getNews = document.getElementById('news-container');
    getNews.innerHTML = ''
    newses.forEach(news => {
        const { author, thumbnail_url, title, details, total_view } = news;
        const div = document.createElement('div');
        div.classList.add('card', 'card-side', 'bg-base-100', 'shadow-xl');
        div.innerHTML = `
        <figure><img class="h-64 w-52" src="${thumbnail_url}" alt="Movie" /></figure>
        <div class="card-body">
            <h2 class="card-title">${title}</h2>
            <p>${details?.slice(0, 100)}</p>

            <div class="card-actions justify-between">
                <div>
                    <img src="" alt="">
                    <div>
                        <p>${author.name ? author.name : "Not Found"}</p>
                        <p>${author.published_date ? author.published_date : "not found"} </p>
                    </div>
                </div>
                <div>
                    <p>${total_view}</p>
                </div>
                <label for="my-modal-4" class="btn ">Watch</button>
            </div>

            <!-- The button to open modal -->

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Congratulations random Internet user!</h3>
    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
  </label>
</label>
        `
        getNews.appendChild(div);
        console.log(news);
    })

}
clickhere()