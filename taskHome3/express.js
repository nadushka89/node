const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const pathJSON = path.join(__dirname, 'countPage.json');

function readData(callback) {
  fs.readFile(pathJSON, 'utf-8', (error, data) => {
    if (error) return console.log(error);

    let dataPage;
    try {
      dataPage = JSON.parse(data);
    } catch (e) {
      dataPage = [
        { page: '/', count: 0 },
        { page: '/about', count: 0 },
      ];
    }

    callback(dataPage);
  });
}

function writeData(dataPage, callback) {
  fs.writeFile(pathJSON, JSON.stringify(dataPage, null, 2), (error) => {
    if (error) return console.log(error);

    callback();
  });
}

app.get('/', (req, res) => {
  readData((dataPage) => {
    dataPage[0].count += 1;

    writeData(dataPage, () => {
      res.send(`
        <h1>Главная страница</h1>
        <p>Просмотров ${dataPage[0].count}</p>
        <a href="/about">About</a>
      `);
    });
  });
});

app.get('/about', (req, res) => {
  readData((dataPage) => {
    dataPage[1].count += 1;

    writeData(dataPage, () => {
      res.send(`
        <h1>Страница About</h1>
        <p>Просмотров ${dataPage[1].count}</p>
        <a href="/">Главная страница</a>
      `);
    });
  });
});

app.listen(3000, () => console.log('Сервер запущен'));
