export class GlobalConstant {
//     VALIDATOR: string = "VALIDATOR";
//     ADMINISTRATOR: string = "ADMINISTRATOR";
//     SUPER_ADMINISTRATOR: string = "SUPER_ADMINISTRATOR";

//     ACTIVE_STATUS: string = "ACTIVE";
//     INACTIVE_STATUS: string = "INACTIVE";
}

export const role = {
    VALIDATOR : {
        value: 'VALIDATOR',
        name: 'Validateur' 
    },
    ADMINISTRATOR : {
        value: 'ADMINISTRATOR',
        name: 'Administrateur'
    },
    SUPER_ADMINISTRATOR : {
        value: 'SUPER_ADMINISTRATOR',
        name: 'Super Administrateur'
    }
}

export const userStatus = {
    ACTIVE : {
        value: 'Actif',
        name: 'ACTIVE'
    },

    INACTIVE : {
        value: 'Inactif',
        name: 'INACTIVE'
    }
}

export const buttonType = {
    UPDATE: "UPDATE",
    SAVE: "SAVE"
};