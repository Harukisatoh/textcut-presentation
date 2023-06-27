import {Sequence} from 'remotion';
import {AbsoluteFill, Series, staticFile, useVideoConfig} from 'remotion';
import FadingOutAudio from './components/FadingOutAudio';
import {Logo} from './components/Logo';
import {Text} from './components/Text';
import AngledPresentation from './effects/AngledPresentation';
import AngledPresentationFromRight from './effects/AngledPresentationFromRight';

import {
	AnimatedWords,
	calculateAnimatedWordsDuration,
} from './effects/AnimatedWords';
import {FadeEnd} from './effects/FadeEnd';
import {FadeStart} from './effects/FadeStart';
import SlideContentInFromBottom from './effects/SlideContentInFromBottom';
import SlidingDoors from './effects/SlidingDoors';
import {Typewrite} from './effects/Typewrite';

export const MyComposition = () => {
	const {fps} = useVideoConfig();

	const sentences = [
		'In a world filled with endless issue threads',
		'keeping track of important information can be overwhelming .',
		'To solve that, we introduce ...',
	];

	const wordsVisibleDuration = 100;
	const entranceIntervalInFrames = 10;

	return (
		<AbsoluteFill className="bg-gradient-radial from-white to-gray-300">
			<FadingOutAudio />

			<Series>
				{sentences.map((sentence) => (
					<Series.Sequence
						durationInFrames={calculateAnimatedWordsDuration({
							visibleDurationInFrames: wordsVisibleDuration,
							entranceIntervalInFrames,
							sentence,
						})}
					>
						<AnimatedWords
							className="w-full h-full p-16"
							entranceIntervalInFrames={entranceIntervalInFrames}
							visibleDurationInFrames={wordsVisibleDuration}
						>
							{sentence}
						</AnimatedWords>
					</Series.Sequence>
				))}

				<Series.Sequence durationInFrames={fps * 3}>
					<FadeEnd duration={10} startValue={1} endValue={0}>
						<FadeStart startValue={0} endValue={1} duration={fps / 2}>
							<AbsoluteFill className="bg-white">
								<SlideContentInFromBottom>
									<Logo />
								</SlideContentInFromBottom>
							</AbsoluteFill>
						</FadeStart>
					</FadeEnd>
				</Series.Sequence>

				<Series.Sequence durationInFrames={fps * 3}>
					<FadeEnd startValue={1} endValue={0} duration={fps / 2}>
						<FadeStart startValue={0} endValue={1} duration={fps / 2}>
							<AbsoluteFill className="bg-white flex justify-center items-center text-center p-16">
								<Text>
									The ultimate solution to{' '}
									<span className="text-[#4f46e5]">summarize</span> issue
									threads with ease.
								</Text>
							</AbsoluteFill>
						</FadeStart>
					</FadeEnd>
				</Series.Sequence>

				<Series.Sequence durationInFrames={fps * 10}>
					<AngledPresentation
						video={staticFile('issue-without-textcut.webm')}
						text="Forget wasting time scrolling through long threads"
					/>
				</Series.Sequence>

				<Series.Sequence durationInFrames={fps * 12} offset={-80}>
					<AngledPresentationFromRight
						video={staticFile('issue-with-textcut.webm')}
						text={
							<span>
								Jump right to the summary, and{' '}
								<span className="text-[#4f46e5]">save time</span>!
							</span>
						}
					/>
				</Series.Sequence>

				<Series.Sequence durationInFrames={fps * 3} offset={-10}>
					<SlidingDoors>
						<AbsoluteFill className="bg-gradient-radial from-[#fb806f] to-[#f7a499] flex justify-center items-center">
							<FadeEnd startValue={1} endValue={0} duration={10}>
								<Text className="text-white">Awesome, right?</Text>
							</FadeEnd>
						</AbsoluteFill>
					</SlidingDoors>
				</Series.Sequence>

				<Series.Sequence durationInFrames={fps * 5}>
					<AbsoluteFill className="bg-gradient-radial from-[#fb806f] to-[#f7a499] flex justify-center items-center">
						<div className="relative w-full h-full">
							<Sequence layout="none" from={10}>
								<FadeStart
									className="h-full"
									startValue={0}
									endValue={1}
									duration={10}
								>
									<Text className="absolute text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-[130px]">
										Join the waitlist at:
									</Text>
								</FadeStart>
								<Sequence layout="none" from={15}>
									<Typewrite className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[30px] text-white font-thin">
										https://textcut.dev
									</Typewrite>
								</Sequence>
							</Sequence>
						</div>
					</AbsoluteFill>
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
