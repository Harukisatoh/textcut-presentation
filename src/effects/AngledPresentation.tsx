import {AbsoluteFill, Video} from 'remotion';
import MacOSWindowBar from '../components/MacOSWindowBar';
import {Text} from '../components/Text';

interface Props {
	video: string;
	text: React.ReactNode;
	startFrom: number;
}

const AngledPresentation = ({video, text, startFrom}: Props) => {
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
					transform: `translateY(-60px)`,
				}}
			>
				<MacOSWindowBar />
				<Video
					muted
					startFrom={startFrom}
					src={video}
					style={{width: '100%', marginBottom: '-10px', marginTop: '-1px'}}
				/>
			</div>

			<div className="translate-y-8">
				<Text className="text-7xl">{text}</Text>
			</div>
		</AbsoluteFill>
	);
};

export default AngledPresentation;
