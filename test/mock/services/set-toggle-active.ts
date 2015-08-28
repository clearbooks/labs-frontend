module labsFrontendApp
{
    export class SetToggleActiveSpy implements SetToggleActive
    {
        private toggleId: number;

        execute( toggleId:number )
        {
            this.toggleId = toggleId;
        }

        getToggleId(): number
        {
            return this.toggleId;
        }

    }
}