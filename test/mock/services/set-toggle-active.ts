module labsFrontendApp
{
    export class SetToggleActiveSpy implements SetToggleActive
    {
        private toggleId: number;
        private activeStatus: boolean;

        execute( toggleId:number, active: boolean )
        {
            this.toggleId = toggleId;
            this.activeStatus = active;
        }

        getToggleId(): number
        {
            return this.toggleId;
        }

        geLastActiveStatus(): boolean
        {
            return this.activeStatus;
        }

    }
}