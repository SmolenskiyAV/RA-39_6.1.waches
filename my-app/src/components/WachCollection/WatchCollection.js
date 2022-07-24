/* eslint-disable jsx-a11y/anchor-is-valid */

import "./watchCollection.css";
import displayCanvas from "./clockscript";
// import PropTypes from "prop-types";
// import UserModel from "../models/UserModel";


export default function WatchCollection(props) {	// КОМПОНЕНТ всей коллекции виджетов "Часы"
  
	const { onRemove: handleRemove, itemsObj } = props;
	
	let intervalTemporalValue = {};
	
		function ListItem(itemOfList) { // функция отрисовки отдельного элемента коллекции (виджет "Часы")

			const { id } = itemOfList;
			const { utc_name } = itemOfList;	   // название временной зоны
			const { utc } = itemOfList; 		   // utc-смещение

			const styles = {
				fontSize: '10px',	// размер сабВиджета "цифровая UTC-дата"
			};

			intervalTemporalValue[id] = window.setInterval(
				function(){
					if ((document.getElementById(id)) === null) {		 // если виджет с текущим id удалён пользователем
						window.clearInterval(intervalTemporalValue[id]); // останавливаем автообновление
						return;
					}
					let d = new Date();
					document.getElementById(id).querySelector('div').innerHTML =  d.toUTCString();
					displayCanvas(utc, id);
				}, 1000);

			return (
				<div key={id} className="task" id={id}>
					<h3>{utc_name}</h3>
  					<div style={styles} className='clock'></div>
					<canvas height='200' width='200'></canvas>
					<div className="task__remove" onClick={handleRemove}>&times;</div>
				</div>
			)
		}   

return (
	<div className="tasks__list" id="tasks__list">
            {itemsObj.map((itemOfList) => ListItem(itemOfList))}
    </div>
)
}
