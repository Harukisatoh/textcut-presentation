import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Text} from '../components/Text';

interface Props {
	className: string;
	children: string;
}

const cursor: React.CSSProperties = {
	height: 120,
	width: 4,
	display: 'inline-block',
	backgroundColor: 'white',
	marginLeft: 8,
	marginTop: -8,
};

export const Typewrite = ({className, children}: Props) => {
	const frame = useCurrentFrame();
	const text = children;
	// A new character every 3 frames
	const charsShown = Math.floor(frame / 3);
	const textToShow = text.slice(0, charsShown);
	// Show the cursor while the text is typing, then start blinking
	const cursorShown =
		textToShow.length === text.length ? Math.floor(frame / 10) % 2 === 1 : true;

	return (
		<Text className={className}>
			{textToShow}
			<span
				style={{
					...cursor,
					verticalAlign: 'middle',
					opacity: Number(cursorShown),
				}}
			/>
		</Text>
	);
};
