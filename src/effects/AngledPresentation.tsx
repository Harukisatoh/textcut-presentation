import {useMemo} from 'react';
import {
	AbsoluteFill,
	Video,
	useCurrentFrame,
	interpolate,
	Easing,
} from 'remotion';
// Import {
// 	wrapperStyles,
// 	bgVideoStyles,
// 	deviceStyles,
// 	deviceVideoStyles,
// } from './index.style';
import MacOSWindowBar from '../components/MacOSWindowBar';
import {Text} from '../components/Text';

interface Keyframes {
	[key: number]: StylePropsWithEasing;
}

interface StyleProps {
	x: number;
	y: number;
	z: number;
	rotateX: number;
	rotateY: number;
	rotate: number;
	scale: number;
	textOpacity: number;
}

interface StylePropsWithEasing extends StyleProps {
	easing: (t: number) => number;
}

interface Props {
	video: string;
	text: string;
}

const keyframes: Keyframes = {
	0: {
		x: 0,
		y: -100,
		z: 330,
		rotateY: -20,
		rotateX: 15,
		rotate: -7,
		scale: 0,
		textOpacity: 0,
		easing: Easing.elastic(0.8),
	},
	60: {
		x: 0,
		y: -100,
		z: 0,
		rotateY: 0,
		rotateX: 0,
		rotate: 0,
		scale: 0.83,
		textOpacity: 0,
		easing: Easing.elastic(0.8),
	},
	90: {
		x: 0,
		y: -100,
		z: 10,
		rotateY: 1,
		rotateX: 1,
		rotate: 0,
		scale: 0.83,
		textOpacity: 1,
		easing: Easing.elastic(0.8),
	},
	160: {
		x: 0,
		y: -100,
		z: 50,
		rotateY: 5,
		rotateX: 5,
		rotate: 0,
		scale: 0.83,
		textOpacity: 1,
		easing: Easing.elastic(0.8),
	},
	300: {
		x: 0,
		y: -100,
		z: 50,
		rotateY: -5,
		rotateX: -2,
		rotate: 0,
		scale: 0.83,
		textOpacity: 1,
		easing: Easing.elastic(0.8),
	},
	460: {
		x: 0,
		y: -100,
		z: 50,
		rotateY: 5,
		rotateX: 5,
		rotate: 0,
		scale: 0.83,
		textOpacity: 1,
		easing: Easing.elastic(1.3),
	},
	600: {
		x: -2400,
		y: -100,
		z: 50,
		rotateY: -5,
		rotateX: -2,
		rotate: 0,
		scale: 0,
		textOpacity: 0,
		easing: Easing.elastic(1.3),
	},
};

const AngledPresentation = ({video, text}: Props) => {
	const frame = useCurrentFrame();

	const currentFromKeyframe = useMemo(() => {
		const keyframeValues = Object.values(keyframes);
		const keyframeFrames = Object.keys(keyframes).map((v) => Number(v));

		const [currentBaseFrameIndex, currentBaseFrame] = keyframeFrames.reduce(
			([lastIndex, makeshiftCurrentFrame], toBeCheckedFrame, index) =>
				toBeCheckedFrame <= frame % 600
					? [index, toBeCheckedFrame]
					: [lastIndex, makeshiftCurrentFrame],
			[0, 0]
		);

		if (!keyframeValues[currentBaseFrameIndex + 1]) return null;

		const stylePropList = Object.keys(
			keyframeValues[currentBaseFrameIndex]
		) as (keyof StylePropsWithEasing)[];
		const stylePropListWithoutEasing = stylePropList.filter(
			(key) => key !== 'easing'
		) as (keyof StyleProps)[];

		const val = stylePropListWithoutEasing
			.map((key) => ({
				[key]: interpolate(
					frame % 600,
					[currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]],
					[
						keyframeValues[currentBaseFrameIndex][key],
						keyframeValues[currentBaseFrameIndex + 1][key],
					],
					{
						easing:
							keyframeValues[currentBaseFrameIndex]?.easing ?? Easing.linear,
					}
				),
			}))
			.reduce((prev, curr) => ({...prev, ...curr}), {} as StyleProps);

		return val;
	}, [frame]);

	return (
		<AbsoluteFill
			style={{
				alignItems: 'center',
				perspective: 1200,
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					width: '80%',
					margin: '0 auto',
					borderRadius: '30px',
					overflow: 'hidden',
					transform: `translateX(${currentFromKeyframe?.x}px) translateY(${currentFromKeyframe?.y}px) translateZ(${currentFromKeyframe?.z}px) rotateY(${currentFromKeyframe?.rotateY}deg) rotateX(${currentFromKeyframe?.rotateX}deg) rotate(${currentFromKeyframe?.rotate}deg) scale(${currentFromKeyframe?.scale})`,
				}}
			>
				<MacOSWindowBar />
				<Video
					muted
					startFrom={200}
					src={video}
					style={{width: '100%', marginBottom: '-10px', marginTop: '-1px'}}
				/>
			</div>

			<div
				className="-translate-y-8"
				style={{opacity: currentFromKeyframe?.textOpacity}}
			>
				<Text className="text-7xl">{text}</Text>
			</div>
		</AbsoluteFill>
	);
};

export default AngledPresentation;
