const express = require("express");
const path = require("path");
const app = express(); // Создаем экземпляр приложения
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const port = 3000;

// Импортируем роуты из отдельных файлов

const indexRoute = require('./routes/index.routes');

app.use(cookieParser()); // чтение кук
app.use(morgan("dev")); // Логирование запросов на сервере
app.use(express.urlencoded({ extended: true })); // для чтения из POST запросов
app.use(express.json()); // для чтения json из body
app.use(express.static(path.join(__dirname, "public"))); // статика

app.use("/api", indexRoute);

app.listen(port, () => {
  console.log(`listen port ${port}`);
});
