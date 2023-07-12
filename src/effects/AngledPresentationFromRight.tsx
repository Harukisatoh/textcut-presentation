import {AbsoluteFill, Video} from 'remotion';
import MacOSWindowBar from '../components/MacOSWindowBar';
import {Text} from '../components/Text';

interface Props {
	video: string;
	text: React.ReactNode;
}

const AngledPresentationFromRight = ({video, text}: Props) => {
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
					transform: `translateX(-1800px) translateY(-900px) translateZ(50px) rotateY(20deg) rotateX(10deg) scale(2.5)`,
				}}
			>
				<MacOSWindowBar />
				<Video
					muted
					src={video}
					startFrom={4}
					style={{width: '100%', marginBottom: '-10px', marginTop: '-1px'}}
				/>
			</div>

			<div className="relative">
				<Text className="absolute text-7xl -top-[820px] left-[780px]">
					{text}
				</Text>
			</div>
		</AbsoluteFill>
	);
};

export default AngledPresentationFromRight;
