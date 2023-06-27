import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';

export interface FadeEndProps {
	startValue: number;
	endValue: number;
	duration: number;
	className?: string;
	children: React.ReactNode;
}

export function FadeEnd({
	children,
	startValue,
	endValue,
	duration,
	className,
}: FadeEndProps) {
	const {durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();

	const opacity = interpolate(
		frame,
		[durationInFrames - duration, durationInFrames],
		[startValue, endValue],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<Sequence layout="none" name="Fade End">
			<div
				className={className}
				style={{
					opacity,
				}}
			>
				{children}
			</div>
		</Sequence>
	);
}
