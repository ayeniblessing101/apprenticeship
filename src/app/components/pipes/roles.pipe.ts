import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roleFilter',
    pure: false,
})
export class RolePipe implements PipeTransform {
    transform(requests: any[], selectedRole: any[], term: any): any {
        if (!requests || requests === undefined) {
            return [];
        } else if (!term || term === undefined) {
            return requests;
        } else if(!selectedRole){
            return requests;
        } else {
            return requests.filter((request) => {
                if (selectedRole.includes('mentee') && selectedRole.includes('mentor')) {
                    return requests;
                } else if (selectedRole.includes('mentee')) {
                    return (request.mentee_email).includes(term);
                } else if (selectedRole.includes('mentor')) {
                    return (request.mentor_email).includes(term);
                }
                return requests;
            });
        }
    }
}
