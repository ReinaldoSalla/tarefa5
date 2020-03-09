/*
day/month/year
1-must have two '/'
2-day cannot pass 31
2-month cannot pass 12
3-year cannot be less than 1995 or pass 2020
*/

import { BadRequestException } from "@nestjs/common"

export function validateDate(date): void {
	let slashCounter: number = 0;
	date.split('').forEach(char => {
		if(char === "/") slashCounter++; 
	});
	let [day, month, year] = date.split("/");
	day = parseInt(day);
	month = parseInt(month);
	year = parseInt(year);
	let msg: string = "";
	let error: boolean = false;
	if(slashCounter !== 2) {
		msg += `Date ${date} is invalid. Must be in dd/mm/yyyy format. `;
		error = true;
	}
	if(day <= 0 || day > 31) {
		msg += `Day  must be between 1-31. `;
		error = true;
	}
	if(month <= 0 || month > 12) {
		msg += `Month must be between 1-12. `;
		error = true;
	}
	if(year <= 0 || year > 2020) {
		msg += `Year must be between 0-2020. `;
		error = true;
	}
	if(error) throw new BadRequestException(msg);
}