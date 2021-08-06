import React from 'react';
import '../style/Pad.sass';
import PadProps from '../types/PadProps';
import PadState from '../types/PadState';
import PadButton from './PadButton';

class Pad extends React.Component<PadProps, PadState> {
	constructor(props: PadProps) {
		super(props);
		this.state = { pressed: [] };
		window.addEventListener('keydown', (e: KeyboardEvent) => this.addPressed(e.code));
		window.addEventListener('keyup', (e: KeyboardEvent) => this.removePressed(e.code));
	}

	/**
	 * Adds a key to the list of pressed keys in the Pad's state.
	 */
	addPressed(key: string): void {
		this.setState({ pressed: [...this.state.pressed, key] });
	}

	/**
	 * Removes a key from the list of pressed keys in the Pad's state.
	 */
	removePressed(key: string): void {
		this.setState({ pressed: this.state.pressed.filter(k => k !== key) });
	}

	render(): React.ReactNode {
		const rows = [];
		for (let i = 0; i < this.props.rows; i++) {
			const cells = [];
			for (let j = 0; j < this.props.columns; j++) {
				const k = defaultKeyCodes[i][j];
				cells.push(
					<PadButton
						active={this.state.pressed.includes(k)}
						alt={this.state.pressed.includes('AltRight')}
						code={k}
						key={k}
						onMouseDown={k => this.addPressed(k)}
						onMouseUp={k => this.removePressed(k)}
					/>
				);
			}
			rows.push(<div className='pad-button-row'>{cells}</div>);
		}
		return (
			<div className='pad'>
				{rows}
			</div>
		);
	}

	static defaultProps = {
		columns: 4,
		rows: 4
	};
}

export default Pad;

/**
 * Default key codes for PadButtons in a 4x4 Pad.
 */
const defaultKeyCodes = [
	['Digit1', 'Digit2', 'Digit3', 'Digit4'],
	['KeyQ', 'KeyW', 'KeyE', 'KeyR'],
	['KeyA', 'KeyS', 'KeyD', 'KeyF'],
	['KeyZ', 'KeyX', 'KeyC', 'KeyV'],
];
// Temporary