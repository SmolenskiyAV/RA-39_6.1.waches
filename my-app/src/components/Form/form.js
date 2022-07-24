/* eslint-disable no-mixed-operators */
import React from "react";
import { useState } from "react";
import "./form.css";
import arrCombiner from "./arr_combiner";
import WatchCollection from "../WachCollection/WatchCollection";
// import PropTypes from "prop-types";
// import UserModel from "../models/UserModel";

let utcNameValue = '';            // начальное значение имени UTC-зоны
let utcValue = '';                // начальное значение параметра UTC-зоны

export default function Form() {  // КОМПОНЕНТ Формы
  
  const [form, setForm] = useState({ // перечисляем все изменяемые параметры внутри формы
    utcName_input: '',
    utc_input: '',
  });

  const [itemsObj, setItemsObj] = useState([]); // массив объектов, передаваемыех в компонент <WatchCollection />

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('input').focus();
  });
  
  const handleUTCNameChange = evt => { // функция обработки набора символов внутри input-а "Имя UTC-зоны"
    
    setForm(prevForm => ({...prevForm, utcName_input: evt.target.value}));
    utcNameValue = evt.target.value;

    if (evt.target.value.length > 16) { // если длина вставленной в поле строки более 16 символов
        setForm(prevForm => ({...prevForm, utcName_input: ''})) // очищаем поле
        utcNameValue = '';
    };
    
  };

  const handleUTCchange = evt => { // функция обработки набора символов внутри input-а "UTC-зона"

    setForm(prevForm => ({...prevForm, utc_input: evt.target.value}));

    if ((/^[+|-]{1}([0-9]|1[0-2])$/gi.test(evt.target.value)) || // если в поле "UTC-зона" набрано корректное значение "знак"+"двузначное целое число 0-12"
      (evt.target.value === '0')) {                                // или в поле введён 0 (ноль)
      setForm(prevForm => ({...prevForm, utc_input: evt.target.value}));
      utcValue = evt.target.value;
          
    } else {
      if ((evt.target.value.length > 3) || 
        ((evt.target.value.length === 3)) && (!(/^[+|-]{1}([0-9]|1[0-2])$/gi.test(evt.target.value)))) {  // если набрано символов три, но значение не корректно
          setForm(prevForm => ({...prevForm, utc_input: ''})) // очищаем поле
          utcValue = '';
        };
    }
  };
  
  const handleSubmit = evt => { // обработка нажатия "Enter"
    evt.preventDefault();
    if ((utcNameValue !== '') && (utcValue !== '')) { // если все поля "input" корректно заполнены
      
      let tempArr = arrCombiner(utcNameValue, utcValue);
      setItemsObj(prevItemsObj => tempArr);
      
      utcNameValue = '';
      utcValue = '';
      setForm(prevForm => ({...prevForm, utc_input: '', utcName_input: ''}));
      document.querySelector('input').focus();
    };
  };

  const handleClick = evt => { // ОБРАБОТКА НАЖАТИЯ КНОПКИ "добавить"
    
    if ((utcNameValue !== '') && (utcValue !== '')) { // если все поля "input" корректно заполнены
      
      let tempArr = arrCombiner(utcNameValue, utcValue);
      setItemsObj(prevItemsObj => tempArr);
      
      utcNameValue = '';
      utcValue = '';
      setForm(prevForm => ({...prevForm, utc_input: '', utcName_input: ''}));
      document.querySelector('input').focus();
    };
  };

  const handleRemove = evt => {  // ОБРАБОТКА НАЖАТИЯ КРЕСТИКА "удалить", передаваемая в компонент <List /> 
    const { target } = evt;
    const id = target.parentElement.id;
    console.log('removed ID = ', id);   // КОНТРОЛЬНАЯ ТОЧКА
    setItemsObj(itemsObj.filter(o => o.id !== id));
    arrCombiner(utcNameValue, utcValue, id); // удаление виджета из массива виджетов listArray
  };

  return (
    <main className="content">
        <div className="card">
          <div className="tasks" id="tasks">
            <form className="tasks__control" onSubmit={handleSubmit} id="tasks__form">
              <label htmlFor="utcName_input">Имя UTC-зоны (город)
                <input 
                  type="text" 
                  className="tasks__input" 
                  name="utcName_input" 
                  id="utcName_input" 
                  placeholder="Например, Moscow"
                  value={form.utcName_input}
                  onChange={handleUTCNameChange} />
              </label>
              <label htmlFor="utc_input">UTC-зона
                <input type="text" 
                  className="tasks__input" 
                  name="utc_input" 
                  id="utc_input" 
                  placeholder="Например, +3"
                  value={form.utc_input}
                  onChange={handleUTCchange} />
              </label>
              <button className="tasks__add" onClick={handleClick} id="tasks__add">Добавить</button>
            </form>
            <WatchCollection itemsObj={itemsObj} onRemove={handleRemove}/>
          </div>
        </div>
    </main>
  );
};

WatchCollection.defaultProps = {
  dataArr: []
  };

/*
ShopItemFunc.propTypes = {
  itemArray: PropTypes.arrayOf(UserModel).isRequired
}
*/