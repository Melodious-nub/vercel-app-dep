import { AbstractControl } from "@angular/forms";

export function valueMatch(pass: string, confirm: string) {
    return (control: AbstractControl) => {
        const value1 = control.get(pass)?.value;
        const value2 = control.get(confirm)?.value;

        if (value1 === value2) {
            return null
        }

        return { valueNotMatched: true }
    }
}