import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm, OnChangeParams } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appState,setAppState] = useState({
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		containerWidth: defaultArticleState.contentWidth.value,
		bgColor: defaultArticleState.backgroundColor.value,
	})
	const onChange = (params: OnChangeParams) => {
		const newState = {
			fontFamily: params.fontFamily,
			fontSize: params.fontSize,
			fontColor: params.fontColor,
			containerWidth: params.contentWidth,
			bgColor: params.backgroundColor,
		}
		
		setAppState(newState)
	}

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appState.fontFamily,
					'--font-size': appState.fontSize,
					'--font-color': appState.fontColor,
					'--container-width': appState.containerWidth,
					'--bg-color': appState.bgColor,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={onChange}/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
