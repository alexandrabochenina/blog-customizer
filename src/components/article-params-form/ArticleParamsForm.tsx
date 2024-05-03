import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group/RadioGroup'
import styles from './ArticleParamsForm.module.scss';
import { Fragment, FormEvent, useState,useEffect, useRef } from 'react';
import {fontFamilyOptions, OptionType} from '../../constants/articleProps'
import {Select} from '../select/Select'
import {fontSizeOptions} from '../../constants/articleProps'
import {fontColors} from  '../../constants/articleProps'
import {backgroundColors} from  '../../constants/articleProps'
import {contentWidthArr} from  '../../constants/articleProps'
import { defaultArticleState } from '../../constants/articleProps';
import { Separator } from '../separator';
import { Text } from 'components/text';
import { clsx } from 'clsx';

type ArticleParamsState = {
	open: boolean
	selectedFontFamily: OptionType
	selectedFontSize: OptionType
	selectedFontColor: OptionType
	selectedBackgroundColor: OptionType
	selectedContentWidth: OptionType
}

export type OnChangeParams = {
	fontFamily: string,
	fontSize: string,
	fontColor: string,
	backgroundColor: string,
	contentWidth: string
}

export type ArticleParamsFormProps = {
	onChange: (params: OnChangeParams) => void
}

const defaultState: () => ArticleParamsState = () => {
	return { 
		open: false,
		selectedFontFamily: defaultArticleState.fontFamilyOption,
		selectedFontSize: defaultArticleState.fontSizeOption,
		selectedFontColor: defaultArticleState.fontColor,
		selectedBackgroundColor: defaultArticleState.backgroundColor,
		selectedContentWidth: defaultArticleState.contentWidth
	 }
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [menuState, setMenuState] = useState(defaultState())
	const containerRef = useRef<HTMLDivElement | null>(null) 

	const toggleOpen = () => {
		const newState = {...menuState}
		newState.open = !newState.open
		setMenuState(newState)
	}

	useEffect (() => {
		const handleDocumentClick = (event: MouseEvent) => {
			if (!menuState.open) return;
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				toggleOpen()
			}
		}

		document.addEventListener('mousedown', handleDocumentClick)
		
		return () => {
			document.removeEventListener('mousedown', handleDocumentClick)
		}
	}, [containerRef.current, menuState.open])
	

	const changeFont = (newFont: OptionType) => {
		const newState = {...menuState}
		newState.selectedFontFamily = newFont
		setMenuState(newState)
	}

	const changeFontSize = (newFontSize: OptionType) => {
		const newState = {...menuState}
		newState.selectedFontSize = newFontSize
		setMenuState(newState)
	}

	const changeFontColor = (newFontColor: OptionType) => {
		const newState = {...menuState}
		newState.selectedFontColor = newFontColor
		setMenuState(newState)
	}

	const changeBackgroundColor = (newBackgroundColor: OptionType) => {
		const newState = {...menuState}
		newState.selectedBackgroundColor = newBackgroundColor
		setMenuState(newState)
	}

	const changeContentWidth = (newContentWidth: OptionType) => {
		const newState = {...menuState}
		newState.selectedContentWidth = newContentWidth
		setMenuState(newState)
	}

	const handleChange = (fromState: ArticleParamsState) => {
		const params = {
			fontFamily: fromState.selectedFontFamily.value,
			fontSize: fromState.selectedFontSize.value,
			fontColor: fromState.selectedFontColor.value,
			backgroundColor: fromState.selectedBackgroundColor.value,
			contentWidth: fromState.selectedContentWidth.value
		}

		props.onChange(params)
	}

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		handleChange(menuState)
		toggleOpen()
	}

	const handleReset = () => {
		const newState = defaultState()
		newState.open = false
		setMenuState(newState)

		handleChange(newState)
	}

	return (
		<Fragment>
			<div ref={containerRef}>
				<ArrowButton onClick={toggleOpen} open={menuState.open}/>
				<aside className={clsx(styles.container, { [styles.container_open]: menuState.open})}>
					<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
						<Text as='h1' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select  options={fontFamilyOptions} placeholder='' selected={menuState.selectedFontFamily} onChange={changeFont} onClose={undefined} title='Шрифт'/>
						<RadioGroup name='Sasha' options={fontSizeOptions} selected={menuState.selectedFontSize} onChange={changeFontSize} title='Размер шрифта'/>
						<Select  options={fontColors} placeholder='' selected={menuState.selectedFontColor} onChange={changeFontColor} onClose={undefined} title='Цвет шрифта'/>
						<Separator />
						<Select  options={backgroundColors} placeholder='' selected={menuState.selectedBackgroundColor} onChange={changeBackgroundColor} onClose={undefined} title='Цвет фона'/>
						<Select  options={contentWidthArr} placeholder='' selected={menuState.selectedContentWidth} onChange={changeContentWidth} onClose={undefined} title='Ширина контента'/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' />
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</Fragment>
	);
};

export default ArticleParamsForm