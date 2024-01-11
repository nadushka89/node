const http = require('http');

let homePageCount = 0;
let aboutPageCount = 0;

const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    if (req.url === '/') {
        homePageCount++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Добро пожаловать на мой сайт!</h1>
                <p>Количество просмотров главной страницы: ${homePageCount}</p>
                <a href="/about"> Перейти на страницу "Обо мне"</a>`);
    } else if (req.url === '/about') {
        aboutPageCount++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Обо мне</h1>
        <p>Количество просмотров страницы "Обо мне": ${aboutPageCount}</p>
        <a href="/"> Перейти на главную страницу </a>
        `);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end('<h1>Страница не найдена!</h1>');
    };

});
const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});