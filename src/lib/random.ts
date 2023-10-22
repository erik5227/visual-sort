export default class RandomUtils {
	static range(min: number, max: number): number {
		return min + Math.floor(Math.random() * (max - min));
	}
}
