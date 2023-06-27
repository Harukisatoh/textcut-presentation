import {interpolate, Sequence, useCurrentFrame} from 'remotion';

export interface MoveStartProps {
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

export function MoveStart({
	children,
	x,
	y,
	className,
	duration,
}: MoveStartProps) {
	const frame = useCurrentFrame();

	const horizontalPosition = x
		? interpolate(frame, [0, duration], [x.start, x.end], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
		  })
		: 0;

	const verticalPosition = y
		? interpolate(frame, [0, duration], [y.start, y.end], {
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
		  })
		: 0;

	return (
		<Sequence layout="none" name="Move Start">
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
