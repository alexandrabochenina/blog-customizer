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
	const [state, setState] = useState(defaultState())
	const containerRef = useRef<HTMLDivElement | null>(null) 

	const toggleOpen = () => {
		const newState = {...state}
		newState.open = !newState.open
		setState(newState)
	}

	useEffect (() => {
		const handleDocumentClick = (event: MouseEvent) => {
			if (state.open && containerRef.current && !containerRef.current.contains(event.target as Node)) {
				toggleOpen()
			}
		}

		document.addEventListener('mousedown', handleDocumentClick)
		
		return () => {
			document.removeEventListener('mousedown', handleDocumentClick)
		}
	}, [containerRef.current])
	

	const changeFont = (newFont: OptionType) => {
		const newState = {...state}
		newState.selectedFontFamily = newFont
		setState(newState)
	}

	const changeFontSize = (newFontSize: OptionType) => {
		const newState = {...state}
		newState.selectedFontSize = newFontSize
		setState(newState)
	}

	const changeFontColor = (newFontColor: OptionType) => {
		const newState = {...state}
		newState.selectedFontColor = newFontColor
		setState(newState)
	}

	const changeBackgroundColor = (newBackgroundColor: OptionType) => {
		const newState = {...state}
		newState.selectedBackgroundColor = newBackgroundColor
		setState(newState)
	}

	const changeContentWidth = (newContentWidth: OptionType) => {
		const newState = {...state}
		newState.selectedContentWidth = newContentWidth
		setState(newState)
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

		handleChange(state)
		toggleOpen()
	}

	const handleReset = () => {
		const newState = defaultState()
		newState.open = false
		setState(newState)

		handleChange(newState)
	}

	return (
		<Fragment>
			<div ref={containerRef}>
				<ArrowButton onClick={toggleOpen} open={state.open}/>
				<aside className={styles.container + (state.open ? ' ' + styles.container_open : '')}>
					<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
						<Select  options={fontFamilyOptions} placeholder='' selected={state.selectedFontFamily} onChange={changeFont} onClose={undefined} title='Шрифт'/>
						<RadioGroup name='Sasha' options={fontSizeOptions} selected={state.selectedFontSize} onChange={changeFontSize} title='Размер шрифта'/>
						<Select  options={fontColors} placeholder='' selected={state.selectedFontColor} onChange={changeFontColor} onClose={undefined} title='Цвет шрифта'/>
						<Separator />
						<Select  options={backgroundColors} placeholder='' selected={state.selectedBackgroundColor} onChange={changeBackgroundColor} onClose={undefined} title='Цвет фона'/>
						<Select  options={contentWidthArr} placeholder='' selected={state.selectedContentWidth} onChange={changeContentWidth} onClose={undefined} title='Ширина контента'/>
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