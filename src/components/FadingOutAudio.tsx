import {Audio, interpolate, useVideoConfig} from 'remotion';

export default function FadingOutAudio() {
	const {fps, durationInFrames} = useVideoConfig();

	return (
		<Audio
			src="https://audiocdn.epidemicsound.com/ES_ITUNES/Zy0ALC_Ganja/ES_Ganja.mp3"
			startFrom={18 * fps}
			volume={(frame) =>
				// Slowly fade out
				frame > durationInFrames - fps * 5
					? 1 -
					  interpolate(
							frame,
							[durationInFrames - fps * 5, durationInFrames],
							[0, 1]
					  ) **
							1.5
					: 1
			}
		/>
	);
}
