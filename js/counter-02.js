//! Добавляем прослушку на всем окне
window.addEventListener("click", function (event) {
  // event.target-это тот элемент по которой мы кликнули
  // dataset-это мы работаем с его дата атрибутами
  // action-получаем значение атрибута data action

  // Обьявляем переменную для счетчика
  let counter;

  //! Проверяем клик строго по кнопкам + либо -
  if (
    event.target.dataset.action === "plus" ||
    event.target.dataset.action === "minus"
  ) {
    //! Находим обертку счетчика
    const counterWrapper = event.target.closest(".counter-wrapper");
    //! Находим div с числом счетчика
    counter = counterWrapper.querySelector("[data-counter]");
  }

  //! Проверяем является ли элемент по которому был совершен клик кнопкой плюс
  if (event.target.dataset.action === "plus") {
    counter.innerText = ++counter.innerText;
  }

  //? Свойство event.target содержит элемент, на котором сработало событие.
  if (event.target.dataset.action === "minus") {
    //! Проверяем чтобы счетчик был больше 1
    if (parseInt(counter.innerText) > 1) {
      //! Изменяем текст в счетчике уменьшая его на 1
      counter.innerText = --counter.innerText;
    } else if (
      // вызываем метод closest() который должен найти родителя,родителя мы ищем по классу cart-wrapper
      // тоесть поднимаемся сразу до обертки
      // Проверка на товар который находится в корзине
      event.target.closest(".cart-wrapper") &&
      parseInt(counter.innerText) === 1
    ) {
      console.log("In cart");
      //! Удаляем товар их козрины
      event.target.closest(".cart-item").remove();

      //! Отображение статуса корзины Пустая / Полная
      toggleCartStatus();

      //! Пересчет общей стоимости товаров в корзине
      calcCartPriceAndDelivery();
    }
  }

  //! Проверяем клик на + или - внутри корзины
  if (
    event.target.hasAttribute("data-action") &&
    event.target.closest(".cart-wrapper")
  ) {
    //! Пересчет общей стоимости товаров в корзине
    calcCartPriceAndDelivery();
  }
});
