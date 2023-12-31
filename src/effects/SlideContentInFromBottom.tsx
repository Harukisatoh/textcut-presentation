import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {HTMLAttributes, ReactNode} from 'react';
import {cn} from '../utils/cn';

export default function SlideContentInFromBottom({
	children,
	...props
}: HTMLAttributes<HTMLDivElement> & {children?: ReactNode}) {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const childrenSizeSpring = spring({
		frame: frame + 10,
		fps,
		config: {damping: 40, mass: 10},
	});
	const childrenSize = interpolate(childrenSizeSpring, [0, 1], [0.7, 1]);

	return (
		<AbsoluteFill
			{...props}
			className={cn('items-center justify-center', props.className)}
		>
			<div style={{transform: `scale(${childrenSize})`}}>{children}</div>
		</AbsoluteFill>
	);
}
