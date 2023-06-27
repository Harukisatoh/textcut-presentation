import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';

export interface MoveEndProps {
	x?: {
		start: number;
		end: number;
	};
	y?: {
		start: number;
		end: number;
	};
	duration: number;
	className?: string;
	children: React.ReactNode;
}

export function MoveEnd({children, x, y, className, duration}: MoveEndProps) {
	const {durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();

	const horizontalPosition = x
		? interpolate(
				frame,
				[durationInFrames - duration, durationInFrames],
				[x.start, x.end],
				{
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				}
		  )
		: 0;

	const verticalPosition = y
		? interpolate(
				frame,
				[durationInFrames - duration, durationInFrames],
				[y.start, y.end],
				{
					extrapolateLeft: 'clamp',
					extrapolateRight: 'clamp',
				}
		  )
		: 0;

	return (
		<Sequence layout="none" name="Move End">
			<div
				className={className}
				style={{
					translate: `${horizontalPosition}px ${verticalPosition}px`,
				}}
			>
				{children}
			</div>
		</Sequence>
	);
}
