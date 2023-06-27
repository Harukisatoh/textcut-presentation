import {cn} from '../utils/cn';

interface Props {
	className?: string;
	children: React.ReactNode;
}

export function Text({children, className = ''}: Props) {
	return (
		<span
			className={cn(
				'font-bold leading-tight tracking-tight text-gray-700 text-9xl',
				className
			)}
		>
			{children}
		</span>
	);
}
