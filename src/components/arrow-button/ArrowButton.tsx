import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useState } from 'react';


/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	open: boolean
	onClick: OnClick
}

export const ArrowButton = (props: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
	
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container + (props.open ? " " + styles.container_open : '')}
			onClick={props.onClick}>
			<img src={arrow} alt='иконка стрелочки' className={styles.arrow + (props.open ? " " + styles.arrow_open : '')}/>
		</div>
	);
};
