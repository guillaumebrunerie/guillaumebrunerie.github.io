// Programmed in 1.5 hour, sorry for the mess

"use strict";

const state = {
	selected: {x: 0, y: 0},
	grid: [
		[{v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}],
		[{v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}],
		[{v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}],
		[{v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}],
		[{v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}],
		[{v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}],
		[{v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}],
		[{v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}],
		[{v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}, {v: []}],
	],
	past: [],
	locked: false,
};

const fullRender = () => {
	document.body.innerHTML = ""
	// Grid
	const grid = document.createElement("div");
	grid.id = "grid";
	document.body.appendChild(grid);
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			const cell = document.createElement("div");
			cell.className = "cell";
			cell.id = `cell-${x}-${y}`;
			if (x % 3 == 0) {
				cell.className += " left";
			}
			if (x % 3 == 2) {
				cell.className += " right";
			}
			if (y % 3 == 0) {
				cell.className += " top";
			}
			if (y % 3 == 2) {
				cell.className += " bottom";
			}
			cell.addEventListener("touchstart", () => select(x, y))
			grid.appendChild(cell);
		}
	}

	// Subgrid
	const subgrid = document.createElement("div");
	subgrid.id = "subgrid";
	document.body.appendChild(subgrid);
	for (let y = 0; y < 4; y++) {
		for (let x = 0; x < 3; x++) {
			const cell = document.createElement("div");
			const v = y * 3 + x + 1;
			if (y < 3 || x == 1) {
				cell.className = "cell";
				if (y < 3) {
					cell.innerText = v;
				} else {
					cell.innerText = "-";
				}
			}
			cell.addEventListener("touchstart", () => toggle(v))
			subgrid.appendChild(cell);
		}
	}

	// Button
	const button = document.createElement("div");
	button.id = "button";
	button.addEventListener("touchstart", () => clickButton())
	document.body.appendChild(button);

	render();
}

const render = () => {
	// Grid
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			const cell = document.getElementById(`cell-${x}-${y}`);
			const classes = cell.className.split(" ").filter(c => c !== "selected" && c !== "locked" && c !== "multiple");
			if (x == state.selected?.x && y == state.selected?.y) {
				classes.push("selected");
			}
			if (state.grid[y][x].isLocked) {
				classes.push("locked");
			}
			const vs = state.grid[y][x].v;
			if (vs.length == 0) {
				cell.innerText = "";
			} else if (vs.length == 1) {
				cell.innerText = vs[0];
			} else {
				classes.push("multiple");
				cell.innerHTML = "";
				for (let y = 0; y < 3; y++) {
					for (let x = 0; x < 3; x++) {
						const subcell = document.createElement("div");
						subcell.className = "subcell";
						const v = y * 3 + x + 1;
						if (vs.includes(v)) {
							subcell.innerText = v;
						}
						cell.appendChild(subcell);
					}
				}
			}
			cell.className = classes.join(" ");
		}
	}

	// Button
	const button = document.getElementById("button");
	button.innerText = state.locked ? "Undo" : "Lock";
}

const select = (x, y) => {
	if (state.grid[y][x].isLocked) {
		return;
	}
	state.selected = {x, y};
	render();
}

const toggle = (v) => {
	state.past.push(structuredClone({
		selected: state.selected,
		grid: state.grid,
	}));
	const {x, y} = state.selected;
	if (v == 11) {
		state.grid[y][x].v = [];
	} else if (state.grid[y][x].v.includes(v)) {
		state.grid[y][x].v = state.grid[y][x].v.filter(x => x !== v);
	} else {
		state.grid[y][x].v.push(v);
	}
	render();
}

const clickButton = () => {
	if (state.locked) {
		doUndo();
	} else {
		doLock();
	}
}

const doLock = () => {
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			if (state.grid[y][x].v.length > 0) {
				state.grid[y][x].isLocked = true;
			}
		}
	}
	state.selected = null;
	state.locked = true;
	state.past = [];
	render();
}

const doUndo = () => {
	if (state.past.length > 0) {
		const {grid, selected} = state.past.pop();
		state.grid = grid;
		state.selected = selected;
	}
	fullRender();
}

fullRender();
