import {Still} from 'remotion';
import {
	ScreenshotFour,
	ScreenshotOne,
	ScreenshotThree,
	ScreenshotTwo,
} from './Composition';
import './style.css';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Still
				id="Screenshot1"
				component={ScreenshotOne}
				width={2560}
				height={1600}
			/>
			<Still
				id="Screenshot2"
				component={ScreenshotTwo}
				width={2560}
				height={1600}
			/>
			<Still
				id="Screenshot3"
				component={ScreenshotThree}
				width={2560}
				height={1600}
			/>
			<Still
				id="Screenshot4"
				component={ScreenshotFour}
				width={2560}
				height={1600}
			/>
		</>
	);
};
