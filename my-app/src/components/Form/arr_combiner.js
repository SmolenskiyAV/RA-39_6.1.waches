import { nanoid } from 'nanoid'

let listArray = []; // дефолтное значение списка виджетов

export default function arrCombiner(utcNameValue, utcValue, idRemoved) { // функция-сборщик целевого массива (для передачи в компонент <WachCollection>)

    if (idRemoved) {
        const deletedItemArray = listArray.find(item => item.id === idRemoved); // поиск удаляемого элемента
        const delatingIndex = listArray.indexOf(deletedItemArray, 0);     // индекс элемента, который нужно удалить из массива
        console.dir('deleted Item is ', deletedItemArray); // КОНТРОЛЬНАЯ ТОЧКА
        console.log('*************************************')
        listArray.splice(delatingIndex, 1);                               // удаление элемента из массива виджетов
        
        return;
    } else {
    const updatedItemArray = {id: nanoid(), utc_name: utcNameValue, utc: utcValue }; // формируем из входящего параметра новый/обновлённый элемент списка
        
    console.log('updated Element is:');
    console.dir(updatedItemArray);  // КОНТРОЛЬНАЯ ТОЧКА
    console.log('=====================================');
    
    listArray.push(updatedItemArray);    // добавляем новый элемент в конец списока
   
    return listArray;
    };
};