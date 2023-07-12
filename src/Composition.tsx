import {AbsoluteFill, staticFile} from 'remotion';
import {Logo} from './components/Logo';

import AngledPresentation from './effects/AngledPresentation';
import AngledPresentationFromRight from './effects/AngledPresentationFromRight';

export const ScreenshotOne = () => {
	return (
		<AbsoluteFill className="bg-white flex justify-center items-center">
			<Logo />
		</AbsoluteFill>
	);
};

export const ScreenshotTwo = () => {
	return (
		<AbsoluteFill className="bg-gradient-radial from-white to-gray-300">
			<AngledPresentation
				video={staticFile('issue-without-textcut.webm')}
				startFrom={3}
				text="Forget wasting time scrolling through long threads"
			/>
		</AbsoluteFill>
	);
};

export const ScreenshotThree = () => {
	return (
		<AbsoluteFill className="bg-gradient-radial from-white to-gray-300">
			<AngledPresentationFromRight
				video={staticFile('issue-with-textcut.webm')}
				text={
					<span>
						Jump right to the summary, and{' '}
						<span className="text-[#4f46e5]">save time</span>!
					</span>
				}
			/>
		</AbsoluteFill>
	);
};

export const ScreenshotFour = () => {
	return (
		<AbsoluteFill className="bg-gradient-radial from-white to-gray-300">
			<AngledPresentation
				video={staticFile('issue-with-textcut.webm')}
				startFrom={7}
				text={
					<span>
						Boost your productivity with{' '}
						<span className="text-[#4f46e5]">Textcut</span>!
					</span>
				}
			/>
		</AbsoluteFill>
	);
};
