import type { Quadrille } from '@/types'

export const getCellTransition = (alive: boolean, neighbourCount: number) => alive
	? neighbourCount === 2 || neighbourCount === 3
	: neighbourCount === 3

export const getCellFate = (
	quadrille: Quadrille,
	row: number, column: number,
	dimensions: number[]
) =>
{
	console.log({ row, column })
	const [nRows, nColumns] = dimensions
	const previousState = quadrille[row][column]

	let
		neighbourCount = 0,
		a = row - 2, b = row + 2

	while (++a < b)
	{
		if (a < 0 || a === nRows) continue
		let c = column - 2, d = column + 2
		while (++c < d)
		{
			if (
				(c < 0 || c === nColumns)
				|| (a === row && c === column)
			) continue

			const n = +quadrille[a][c]
			console.log({ a, c, n })
			neighbourCount += n
		}
	}

	console.log({ row, column, neighbourCount })

	return getCellTransition(previousState, neighbourCount)
}

const tick = (quadrille: Quadrille) =>
{
	const
		nRows = quadrille.length,
		nColumns = quadrille[0].length

	const dimensions = [nRows, nColumns]
	const next = quadrille.map(row => [...row]) as Quadrille

	console.log({ nRows, nColumns })

	let r = -1

	while (++r < nRows)
	{
		let c = -1
		while (++c < nColumns)
		{
			next[r][c] = getCellFate(
				quadrille,
				r, c,
				dimensions,
			)
		}
	}
	return next
}

const log = (a: Quadrille) => console.log('%s', a.map(a => a.map(b => +b).join(' ')).join('\n'))

let seed = [[false, true, false], [false, true, false], [false, true, false]]
log(seed)
seed = tick(seed)
log(seed)

// const getCoordinates = (
// 	row, column,
// 	nRows, nColumns,
// ) =>
// {
// 	let
// 		coords = [],
// 		a = row - 2, b = row + 2

// 	while (++a < b)
// 	{
// 		if (a < 0 || a === nRows) continue
// 		let c = column - 2, d = column + 2
// 		while (++c < d)
// 		{
// 			if (
// 				(c < 0 || c === nColumns)
// 				|| (a === row && c === column)
// 			) continue

// 			coords.push([a, c])
// 		}
// 	}

// 	return coords
// }
// setTimeout(() => { throw new Error() }, 1000)
// console.log(
// 	getCoordinates(
// 		0, 0,
// 		3, 3
// 	)
// )