import {interpolate, Sequence, useCurrentFrame} from 'remotion';

export interface FadeStartProps {
	startValue: number;
	endValue: number;
	duration: number;
	className?: string;
	children: React.ReactNode;
}

export function FadeStart({
	children,
	startValue,
	endValue,
	className,
	duration,
}: FadeStartProps) {
	const frame = useCurrentFrame();

	const opacity = interpolate(frame, [0, duration], [startValue, endValue], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<Sequence layout="none" name="Fade Start">
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
