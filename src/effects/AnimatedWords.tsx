import {Sequence} from 'remotion';

import {Text} from '../components/Text';

import {FadeEnd} from './FadeEnd';
import {FadeStart} from './FadeStart';
import {MoveEnd} from './MoveEnd';
import {MoveStart} from './MoveStart';

interface Props {
	// How long does it take to each word to start transition
	entranceIntervalInFrames: number;
	// How long all the words will be shown together
	visibleDurationInFrames: number;
	className?: string;
	children: string;
}

interface CalculateDurationParams {
	visibleDurationInFrames: number;
	entranceIntervalInFrames: number;
	sentence: string;
}

export function AnimatedWords({
	entranceIntervalInFrames,
	visibleDurationInFrames,
	className,
	children,
}: Props) {
	const words = children.split(' ');
	const durationInFrames = calculateAnimatedWordsDuration({
		visibleDurationInFrames,
		entranceIntervalInFrames,
		sentence: children,
	});

	const isWord = (text: string) => !text.match(/^[.,:!?]/);

	return (
		<Sequence
			layout="none"
			name="Animated sentence"
			durationInFrames={durationInFrames}
		>
			<MoveEnd className={className} y={{start: 0, end: 50}} duration={10}>
				<FadeEnd
					className="flex h-full w-full flex-wrap justify-center content-center"
					startValue={1}
					endValue={0}
					duration={10}
				>
					{words.map((word, index) => (
						<>
							<Sequence
								layout="none"
								name="Animated word"
								durationInFrames={
									visibleDurationInFrames +
									entranceIntervalInFrames * (words.length - index)
								}
								from={index * entranceIntervalInFrames}
							>
								<MoveStart y={{start: -50, end: 0}} duration={10}>
									<FadeStart
										className="inline-block h-fit"
										startValue={0}
										endValue={1}
										duration={10}
									>
										<Text>{word}</Text>
									</FadeStart>
								</MoveStart>
							</Sequence>

							{isWord(words[index + 1] || '') && <div className="w-4" />}
						</>
					))}
				</FadeEnd>
			</MoveEnd>
		</Sequence>
	);
}

export function calculateAnimatedWordsDuration({
	visibleDurationInFrames,
	entranceIntervalInFrames,
	sentence,
}: CalculateDurationParams) {
	const words = sentence.split(' ');
	return visibleDurationInFrames + entranceIntervalInFrames * words.length;
}
