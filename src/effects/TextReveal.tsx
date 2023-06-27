import {useMemo} from 'react';
import {
	AbsoluteFill,
	Video,
	useCurrentFrame,
	interpolate,
	Easing,
	Audio,
} from 'remotion';
import MacOSWindowBar from '../components/MacOSWindowBar';
import {Text} from '../components/Text';

interface Keyframes {
	[key: number]: StylePropsWithEasing;
}

interface StyleProps {
	rotateX: number;
	rotateY: number;
	rotate: number;
	scale: number;
	translateX: number;
	translateY: number;
	translateZ: number;
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
		rotateX: 0,
		rotateY: 0,
		rotate: 0,
		scale: 1.4,
		translateX: -80,
		translateY: 0,
		translateZ: 0,
		easing: Easing.elastic(0.9),
		textOpacity: 0,
	},
	60: {
		rotateX: 0,
		rotateY: 0,
		rotate: 0,
		scale: 0.65,
		translateX: -80,
		translateY: 0,
		translateZ: 0,
		easing: Easing.elastic(0.9),
		textOpacity: 0,
	},
	90: {
		rotateX: 0,
		rotateY: 0,
		rotate: 0,
		scale: 0.65,
		translateX: -80,
		translateY: -90,
		translateZ: 0,
		easing: Easing.elastic(0.9),
		textOpacity: 0,
	},
	120: {
		rotateX: 0,
		rotateY: 0,
		rotate: 0,
		scale: 0.65,
		translateX: -80,
		translateY: -90,
		translateZ: 0,
		easing: Easing.elastic(0.9),
		textOpacity: 1,
	},
	180: {
		rotateX: 0,
		rotateY: 0,
		rotate: 0,
		scale: 0.65,
		translateX: -80,
		translateY: -90,
		translateZ: 0,
		easing: Easing.elastic(0.9),
		textOpacity: 1,
	},
};

const TextReveal = ({video, text}: Props) => {
	const frame = useCurrentFrame();

	const currentFromKeyframe = useMemo(() => {
		const keyframeValues = Object.values(keyframes) as StylePropsWithEasing[];
		const keyframeFrames = Object.keys(keyframes).map((v) =>
			Number(v)
		) as number[];

		const [currentBaseFrameIndex, currentBaseFrame] = keyframeFrames.reduce(
			([lastIndex, makeshiftCurrentFrame], toBeCheckedFrame, index) =>
				toBeCheckedFrame <= frame
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
			.map((key) => {
				return {
					[key]: interpolate(
						frame,
						[currentBaseFrame, keyframeFrames[currentBaseFrameIndex + 1]],
						[
							keyframeValues[currentBaseFrameIndex][key],
							keyframeValues[currentBaseFrameIndex + 1][key],
						],
						{
							easing: keyframeValues[currentBaseFrameIndex].easing,
						}
					),
				};
			})
			.reduce((prev, curr) => ({...prev, ...curr}), {} as StyleProps);

		return val;
	}, [frame]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
				perspective: '1200px',
			}}
		>
			<AbsoluteFill
				style={{
					top: '625px',
					right: '500px',
					width: '100%',
					height: 'max-content',
					textAlign: 'center',
					opacity: currentFromKeyframe?.textOpacity,
				}}
			>
				<Text className="text-5xl">{text}</Text>
			</AbsoluteFill>

			{/* Screen Video */}
			<AbsoluteFill
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					boxShadow: '2px 2px 20px 5px rgba(0, 0, 0, .2)',
					transform: `
          scale(${currentFromKeyframe?.scale ?? 0.65})
          translateX(${currentFromKeyframe?.translateX ?? -80}px)
          translateY(${currentFromKeyframe?.translateY ?? -90}px)
          translateZ(${currentFromKeyframe?.translateZ ?? 0}px)
          rotateX(${currentFromKeyframe?.rotateX ?? 0}deg)
          rotateY(${currentFromKeyframe?.rotateY ?? 0}deg)
          rotate(${currentFromKeyframe?.rotate ?? 0}deg)
          `,
					width: 'max-content',
					height: 'max-content',
					margin: 'auto',
					maxWidth: '1400px',
					borderRadius: '30px',
					overflow: 'hidden',
				}}
			>
				<MacOSWindowBar />
				<Video
					muted
					src={video}
					style={{
						width: '100%',
						height: '100%',
						minWidth: '1400px',
						marginTop: '-1px',
					}}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};

export default TextReveal;
