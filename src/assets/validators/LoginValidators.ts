import { AbstractControl } from "@angular/forms";

export class LoginValidators{

    static confirmPassword(passwordControl: AbstractControl): any {
        return (confirmPasswordControl: AbstractControl)=>{
            if(passwordControl.value != confirmPasswordControl.value)
                return {'confirmPassword': true}
            return null;
        };
    }
}