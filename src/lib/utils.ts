import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export type ChallengeDayType = {
	day: number,
	title: string,
	description: string,
	category: string,
	fact?: {
		text: string,
		source: string
	},
	link: string,
	detailedDescription: string,
	tips: string[],
	resources: string[]
}

export const motivationalQuotes = [
	"Every small step counts on your wellness journey.",
	"You are stronger than you think, braver than you feel.",
	"Healing is not linear, and that's perfectly okay.",
	"Your mental health matters, and so do you.",
	"Progress, not perfection, is the goal.",
]