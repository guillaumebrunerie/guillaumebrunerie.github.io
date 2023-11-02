"use strict";

const state = {
	selected: null,
	grid: [
		[{v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}],
		[{v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}],
		[{v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}],
		[{v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}],
		[{v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}],
		[{v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}],
		[{v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}],
		[{v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}],
		[{v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}, {v: null}],
	],
	locked: false,
};

const render = () => {
	document.body.innerHTML = ""
	// Grid
	const grid = document.createElement("div");
	grid.id = "grid";
	document.body.appendChild(grid);
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			const cell = document.createElement("div");
			cell.className = "cell";
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
			if (x == state.selected?.x && y == state.selected?.y) {
				cell.className += " selected";
			}
			if (state.grid[y][x].isLocked) {
				cell.className += " locked";
			}
			const v = state.grid[y][x].v || "";
			cell.innerText = v;
			cell.addEventListener("click", () => select(x, y))
			grid.appendChild(cell);
		}
	}

	// Subgrid
	const subgrid = document.createElement("div");
	subgrid.id = "subgrid";
	document.body.appendChild(subgrid);
	for (let y = 0; y < 3; y++) {
		for (let x = 0; x < 3; x++) {
			const cell = document.createElement("div");
			cell.className = "cell";
			const v = y * 3 + x + 1;
			cell.innerText = v;
			cell.addEventListener("click", () => toggle(v))
			subgrid.appendChild(cell);
		}
	}

	// Lock
	const lock = document.createElement("div");
	lock.id = "lock";
	if (!state.locked) {
		lock.innerText = "Lock";
	}
	lock.addEventListener("click", () => doLock())
	document.body.appendChild(lock);
}

const select = (x, y) => {
	if (state.grid[y][x].isLocked) {
		return;
	}
	state.selected = {x, y};
	render();
}

const toggle = (v) => {
	const {x, y} = state.selected;
	if (state.grid[y][x].v == v) {
		state.grid[y][x].v = null;
	} else {
		state.grid[y][x].v = v;
	}
	render();
}

const doLock = () => {
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			if (state.grid[y][x].v) {
				state.grid[y][x].isLocked = true;
			}
		}
	}
	state.selected = null;
	state.locked = true;
	render();
}

render();
